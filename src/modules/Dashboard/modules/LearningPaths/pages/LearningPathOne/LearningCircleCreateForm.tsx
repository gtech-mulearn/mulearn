import { useEffect, useState } from "react";
import styles from "./LearningCircleLanding.module.css";
import { createLearningCircle, scheduleMeetup } from "../../../LearningCircleV2/services/LearningCircleAPIs";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import { getInterests } from "../../../ManageUsers/apis";
import { useUserStore } from "/src/ZustandProvider";


const LearningCircleCreateForm = ({ setIsCreateModalOpen, onSuccess }: { setIsCreateModalOpen: (type: boolean) => void, onSuccess: () => void }) => {
    const [title, setTitle] = useState('');
    const [ig, setIg] = useState('');
    const [interestOptions, setInterestOptions] = useState<InterestOption[]>([]);
    const [description, setDescription] = useState('');
    const [meetingType, setMeetingType] = useState('online'); // default selection
    const [meetLink, setMeetLink] = useState('');
    const [location, setLocation] = useState('');
    const [time, setTime] = useState('');
    const org = useUserStore((state) => state.userProfile.college_id || "028b4fb3-6b24-46ac-b26a-092889c5c44f");


    const navigate = useNavigate();



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e && e.preventDefault();

        // var lcId: string | boolean = '';
        const data = {
            title,
            description,
            meetingType,
            meetLink,
            location,
            time,
            org,
            ig,
            is_recurring: false,
            recurrence_type: "weekly",
            recurrence: 1,
        }
        createLearningCircle(data).then(status => {
            // setIsLoading(false);
            if (status) {
                scheduleMeetup({ circle_id: status as string, title: data.title, description: data.description, meet_place: data.location || "Google Meet", meet_time: data.time, duration: 4, mode: data.location ? "offline" : "online", coord_x: 0, coord_y: 0, is_report_needed: false, report_description: '', meet_link: data.meetLink || "https://meet.google.com" }).then(status => {
                    // setIsLoading(false);
                    if (status) {
                        // onSuccess();
                        // navigate(
                        //     `/dashboard/learningcircle/dashboard/${params.circle_id}`
                        // );
                    }
                    onSuccess();
                });
            }
        });
        setIsCreateModalOpen(false);
    };

    type InterestOption = {
        label: string;
        value: string;
    };


    const getOptions = async () => {
        return await getInterests();
    };


    useEffect(() => {
        getOptions().then(setInterestOptions); // Fetch and set the options
    }, []);



    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {/* Title Field */}
            <div className={styles.formGroup}>
                <label htmlFor="title">Title of Learning Circle</label>
                <input
                    id="title"
                    type="text"
                    placeholder="What are you going to learn?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    required
                />
            </div>

            {/* Description Field */}
            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    placeholder="Enter details about your learning circle..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.textarea}
                    required
                />
            </div>

            {/* Interest Group Dropdown */}
            <div className={styles.formGroup}>
                <label htmlFor="interestGroup">Interest Group</label>
                <ReactSelect
                    options={interestOptions}
                    name="interestGroup"
                    placeholder="Select Interest Group"
                    onChange={(selectedOption) => setIg(selectedOption?.value || '')}
                />
            </div>

            {/* Online/Offline Selection */}
            <div className={styles.formGroup}>
                <label>Meeting Type</label>
                <div className={styles.radioGroup}>
                    <div
                        className={`${styles.radioCard} ${meetingType === 'online' ? styles.active : ''}`}
                        onClick={() => setMeetingType('online')}
                    >
                        Online
                    </div>
                    <div
                        className={`${styles.radioCard} ${meetingType === 'offline' ? styles.active : ''}`}
                        onClick={() => setMeetingType('offline')}
                    >
                        Offline
                    </div>
                </div>
            </div>

            {/* Conditional Field for Meeting Link or Location */}
            {meetingType === 'online' ? (
                <div className={styles.formGroup}>
                    <label htmlFor="meetLink">Online Meeting Link</label>
                    <input
                        id="meetLink"
                        type="url"
                        placeholder="Enter meeting link"
                        value={meetLink}
                        onChange={(e) => setMeetLink(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
            ) : (
                <div className={styles.formGroup}>
                    <label htmlFor="location">Location</label>
                    <input
                        id="location"
                        type="text"
                        placeholder="Enter location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
            )}

            {/* Time Field */}
            <div className={styles.formGroup}>
                <label htmlFor="time">Time</label>
                <input
                    id="time"
                    type="datetime-local"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className={styles.input}
                    required
                />
            </div>

            {/* Buttons */}
            <div>
                <button type="button" onClick={() => setIsCreateModalOpen(false)} className={styles.submitButton2} style={{ marginRight: "1rem" }}>Cancel</button>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </div>
        </form>

    )
}

export default LearningCircleCreateForm