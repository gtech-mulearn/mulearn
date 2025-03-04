import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import styles from "./LearningCircleLanding.module.css";
import { useEffect, useState } from "react";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { customReactSelectStyles } from "../../utils/buttonConfiguration/common";
import SelectTab from "react-select";
import { useNavigate } from "react-router-dom";
import {
    createLearningCircle,
    getMeetups,
    scheduleMeetup,
} from "../../services/LearningCircleAPIs";
import imageBottom from "../../assets/images/LC3.webp";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import { EventCard } from "../../../LearningPaths/pages/LearningPathOne/LearningCircleCard";
import LearningCircleCreateForm from "../../../LearningPaths/pages/LearningPathOne/LearningCircleCreateForm";
import { CircleMeetupInfo } from "../../services/LearningCircleInterface";
import EventDetailsModal from "../../components/EventDetailsModal/EventDetailsModal";

interface Option {
    value: string;
    label: string;
}

const INITIAL_INTERESTS = [
    { label: "All Categories", value: "all" },
    { label: "Coder", value: "coder" },
    { label: "Hardware", value: "hardware" },
    { label: "Manager", value: "manager" },
    { label: "Creative", value: "creative" }
];

const LearningCircleLanding = () => {
    const [isLoading, setisLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Option | null>(
        INITIAL_INTERESTS[0]
    );
    const [meetups, setMeetups] = useState<CircleMeetupInfo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMeetup, setSelectedMeetup] = useState<CircleMeetupInfo>();
    const navigate = useNavigate();

    const handleModalOpen = (event: CircleMeetupInfo) => {
        setSelectedMeetup(event)
        setIsModalOpen(true)
    }

    useEffect(() => {
        setisLoading(true);
        getMeetups(selectedCategory?.value).then(res => {
            setMeetups(res);
            setisLoading(false);
        });
    }, [selectedCategory]);


    const handleUpdateLC = () => {
        setisLoading(true);
        getMeetups(selectedCategory?.value).then(res => {
            setMeetups(res);
            setisLoading(false);
        });
    };

    const selectionChange = (selected: Option | null) => {
        setSelectedCategory(selected);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e && e.preventDefault();
        const data = e.currentTarget.value
        createLearningCircle(data).then(status => {
            // setIsLoading(false);
            if (status) {
                navigate("/dashboard/learningcircle/create-meetup/" + status);
            }
        });
        scheduleMeetup(data).then(status => {
            // setIsLoading(false);
            if (status) {
            }
        });
        setIsCreateModalOpen(false);
    };

    return (
        <>
            <EventDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                meetup={selectedMeetup}
            />
            <MuModal
                type="success"
                onClose={() => setIsCreateModalOpen(false)}
                title="Create Learning Circle"
                isOpen={isCreateModalOpen}
                showButton={false}
            >
                <LearningCircleCreateForm setIsCreateModalOpen={setIsCreateModalOpen} onSuccess={handleUpdateLC} />
            </MuModal>
            {isLoading ? (
                <div className={styles.loader_container}>
                    <MuLoader />
                </div>
            ) : (
                <div className={styles.learningCircleLandingPage}>
                    <div className={styles.middleContainer}>
                        <SelectTab
                            placeholder={"Select Role"}
                            options={INITIAL_INTERESTS}
                            styles={customReactSelectStyles}
                            value={selectedCategory}
                            onChange={selectionChange}
                        />
                        <div>
                            <PowerfulButton
                                children="Create"
                                style={{
                                    paddingLeft: "2rem",
                                    backgroundColor:
                                        "rgba(69, 111, 246, 1)",
                                    paddingRight: "2rem"
                                }}
                                onClick={() => setIsCreateModalOpen(true)}
                            />
                        </div>

                    </div>
                    {meetups.length === 0 ? (
                        <div
                            style={{
                                background: "#fff",
                                padding: 10,
                                borderRadius: 10
                            }}
                            className={styles.learningCircleLandingPageMiddle}
                        >
                            <img
                                src={imageBottom}
                                alt="No meetups"
                                loading="eager"
                                className={styles.desaturate}
                            />
                            <b>No Meetups!</b>
                            <p>No meetups are currently running now</p>
                        </div>
                    ) : (
                        <div className={styles.cardContainer}>
                            {meetups.map((event, index) => (
                                <EventCard
                                    id={event.id}
                                    title={event.title}
                                    institution={"abc"}
                                    setIsModalOpen={handleModalOpen}
                                    location={event.meet_place}
                                    date={event.meet_time}
                                    time={event.meet_time}
                                    venue={event.meet_place}
                                    joiningUrl={event.meet_link}
                                    karmaPoints={event.duration}
                                    joinedPeople={Number(event.attendee) || 10}
                                    imageUrl="https://img.freepik.com/free-vector/people-studying-learning-room_74855-6615.jpg?t=st=1738405617~exp=1738409217~hmac=7d528d88304c4f919c3c258289bbce219d623170f0c85eff4b9cf1f348a2c1c4&w=2000"
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default LearningCircleLanding;
