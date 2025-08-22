import { Form, Formik } from "formik";
import styles from "./CreateLCMeetup.module.css";
import { date } from "yup";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { Input, InputGroup, Switch, Tooltip } from "@chakra-ui/react";
import {
    BiInfoCircle,
    BiRightArrow,
    BiSearch
} from "react-icons/bi";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useEffect, useState } from "react";
import {
    scheduleMeetup,
    searchCoordinates
} from "../../services/LearningCircleAPIs";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { LCMeetCreate, MapResult } from "../../services/LearningCircleInterface";

export default function CreateLCMeetup() {
    const [isLoading, setIsLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [locationSearchResults, setLocationSearchResults] = useState<
        MapResult[]
    >([]);
    const [selectedLocation, setSelectedLocation] = useState<MapResult | null>(
        null
    );
    const [minDateTime, setMinDateTime] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const hours = String(today.getHours()).padStart(2, "0");
        const minutes = String(today.getMinutes()).padStart(2, "0");
        setMinDateTime(`${yyyy}-${mm}-${dd}T${hours}:${minutes}`);
    }, []);

    const initialValues = {
        title: "",
        is_proof_required: true,
        proof_description: "",
        location: "",
        meet_link: "",
        mode: "online", // 'online' or 'offline'
        date: date(),
        duration: 3
    };
    // const onSubmit = (values: any) => {
    //     if (!selectedLocation) {
    //         toast.error("Please select a location for the meetup");
    //         return;
    //     }
    //     setIsLoading(true);
    //     const date = new Date(values.date);
    //     const meetupData: LCMeetCreate = {
    //         circle_id: params.circle_id ?? "",
    //         title: values.title,
    //         is_report_needed: values.is_proof_required,
    //         report_description: values.proof_description,
    //         meet_place: selectedLocation.name,
    //         coord_x: selectedLocation.lat,
    //         coord_y: selectedLocation.lon,
    //         meet_time: date.toISOString(),
    //         duration: values.duration,
    //         description: values., 
    //         meet_link, 
    //         mode
    //     };

    //     scheduleMeetup(meetupData).then(status => {
    //         setIsLoading(false);
    //         if (status) {
    //             navigate(
    //                 `/dashboard/learningcircle/dashboard/${params.circle_id}`
    //             );
    //         }
    //     });
    // };
    const handleLocationSearch = (location: string) => {
        setLocationLoading(true);
        searchCoordinates(location).then(data => {
            setLocationLoading(false);
            setLocationSearchResults(data);
        });
    };

    return (
        <div className={styles.createLCMeetup}>
            <h1>Schedule your next meet</h1>
            {/* <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {formik => (
                    <Form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label style={{ fontWeight: 500, marginBottom: 8, display: 'block' }}>Meeting Type</label>
                            <div
                                style={{
                                    display: 'flex',
                                    background: '#f5f7fa',
                                    borderRadius: 10,
                                    border: '1.5px solid #e5e7eb',
                                    padding: 4,
                                    width: 'fit-content',
                                    gap: 0,
                                    marginBottom: 8
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={() => formik.setFieldValue('mode', 'offline')}
                                    style={{
                                        background: formik.values.mode === 'offline' ? '#3887fe' : 'transparent',
                                        color: formik.values.mode === 'offline' ? '#fff' : '#222',
                                        border: 'none',
                                        borderRadius: 8,
                                        padding: '10px 48px',
                                        fontWeight: 500,
                                        fontSize: 16,
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        boxShadow: formik.values.mode === 'offline' ? '0 2px 8px rgba(56,135,254,0.08)' : 'none',
                                        outline: formik.values.mode === 'offline' ? '2px solid #2563eb' : 'none',
                                    }}
                                    tabIndex={0}
                                    aria-pressed={formik.values.mode === 'offline'}
                                >
                                    Offline
                                </button>
                                <button
                                    type="button"
                                    onClick={() => formik.setFieldValue('mode', 'online')}
                                    style={{
                                        background: formik.values.mode === 'online' ? '#3887fe' : 'transparent',
                                        color: formik.values.mode === 'online' ? '#fff' : '#222',
                                        border: 'none',
                                        borderRadius: 8,
                                        padding: '10px 48px',
                                        fontWeight: 500,
                                        fontSize: 16,
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        boxShadow: formik.values.mode === 'online' ? '0 2px 8px rgba(56,135,254,0.08)' : 'none',
                                        outline: formik.values.mode === 'online' ? '2px solid #2563eb' : 'none',
                                    }}
                                    tabIndex={0}
                                    aria-pressed={formik.values.mode === 'online'}
                                >
                                    Online
                                </button>
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <SimpleInput
                                name="title"
                                required
                                placeholder="What you are planning to do?"
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div
                            className={
                                styles.formGroup + " " + styles.horizontal
                            }
                        >
                            <label htmlFor="is_proof_required">
                                Is Proof required
                                <Tooltip
                                    label="Would you like attendees to submit a proof of work after the meetup, which can then be evaluated for awarding karma points?"
                                    shouldWrapChildren
                                >
                                    <BiInfoCircle />
                                </Tooltip>
                            </label>
                            <Switch
                                id="is_proof_required"
                                defaultChecked={true}
                                onChange={e =>
                                    formik.setFieldValue(
                                        "is_proof_required",
                                        e.target.checked
                                    )
                                }
                            />
                        </div>
                        {formik.values.is_proof_required ? (
                            <div className={styles.formGroup}>
                                <textarea
                                    required={formik.values.is_proof_required}
                                    maxLength={1000}
                                    name="proof_description"
                                    id="proof_description"
                                    placeholder="Describe what type of proof of work you are expecting"
                                    onChange={formik.handleChange}
                                ></textarea>
                            </div>
                        ) : null}
                        {formik.values.mode === 'offline' && (
                            <div className={styles.formGroup}>
                                <label htmlFor="location">
                                    Location of the meetup
                                </label>
                                <div className={styles.search}>
                                    <InputGroup
                                        style={{ position: "relative" }}
                                        flex="1"
                                    >
                                        <BiSearch
                                            style={{
                                                position: "absolute",
                                                left: "10px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                zIndex: 10
                                            }}
                                        />
                                        <Input
                                            placeholder="Meetup Location"
                                            name="location"
                                            id="location"
                                            value={formik.values.location}
                                            onChange={e => {
                                                formik.handleChange(e);
                                                setSelectedLocation(null);
                                            }}
                                            style={{ paddingLeft: "30px" }}
                                        />
                                    </InputGroup>
                                    <PowerfulButton
                                        isLoading={locationLoading}
                                        style={{ padding: 10 }}
                                        onClick={e => {
                                            e.preventDefault();
                                            handleLocationSearch(
                                                formik.values.location
                                            );
                                        }}
                                    >
                                        <BiSearch />
                                    </PowerfulButton>
                                </div>
                            </div>
                        )}
                        {formik.values.mode === 'offline' && locationSearchResults.length > 0 && (
                            <div className={styles.searchResults}>
                                {locationSearchResults.map((result, index) => (
                                    <div
                                        key={index}
                                        className={styles.result}
                                        onClick={() => {
                                            formik.setFieldValue(
                                                "location",
                                                result.name
                                            );
                                            setSelectedLocation(result);
                                            setLocationSearchResults([]);
                                        }}
                                    >
                                        <span className={styles.name}>
                                            <span>{result.name}</span>
                                            <a
                                                href={`http://maps.google.com?q=${result.lat},${result.lon}`}
                                                target="_blank"
                                            >
                                                <BiRightArrow />
                                            </a>
                                        </span>
                                        <span className={styles.address}>
                                            {result.display_name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                        {formik.values.mode === 'online' && (
                            <div className={styles.formGroup}>
                                <label htmlFor="meet_link">Meet Link</label>
                                <Input
                                    placeholder="Online Meeting Link"
                                    name="meet_link"
                                    id="meet_link"
                                    value={formik.values.meet_link}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        )}
                        <div className={styles.formGroup}>
                            <label htmlFor="date">Date and Time</label>
                            <input
                                type="datetime-local"
                                onFocus={e => {
                                    e.target.showPicker();
                                }}
                                onChange={formik.handleChange}
                                name="date"
                                min={minDateTime}
                                id="date"
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="duration">Expected Duration</label>
                            <input
                                type="number"
                                placeholder="Duration in hours"
                                onChange={formik.handleChange}
                                name="duration"
                                id="duration"
                                required
                            />
                        </div>
                        <PowerfulButton
                            type="submit"
                            disabled={isLoading}
                            isLoading={isLoading}
                        >
                            Schedule Meetup
                        </PowerfulButton>
                    </Form>
                )}
            </Formik> */}
        </div>
    );
}
