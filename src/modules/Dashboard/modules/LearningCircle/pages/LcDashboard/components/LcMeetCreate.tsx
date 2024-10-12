import { Dispatch, SetStateAction, useState } from "react";
import styles from "../LcDashboard.module.css";
import toast from "react-hot-toast";
import {
    createMeetup,
    setLCMeetTime
} from "../../../services/LearningCircleAPIs";
import { useFormik } from "formik";
import { Switch } from "@chakra-ui/react";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    lc: LcDetail | undefined;
    id: string | undefined;
};

const LcMeetCreate = (props: Props) => {
    const formik = useFormik({
        initialValues: {
            title: "",
            location: "",
            meet_time: "",
            meet_place: "",
            agenda: "",
            need_pre_requirements: false,
            pre_requirements: null,
            is_public: true,
            limit_attendees: false,
            max_attendees: -1
        },
        onSubmit: values => {
            createMeetup(values, props.id ?? "")
                .then(res => {
                    console.log(res);
                    if (res) {
                        if (res.hasError) {
                            toast.error(res.message.general[0]);
                        } else {
                            toast.success(res.message.general[0]);
                        }
                    }
                })
                .catch(err => {
                    toast.error("Failed to create meetup");
                });

            props.setTemp(prev => ({
                ...prev,
                isCreateMeeting: false
            }));
        },
        validate: values => {
            if (values.location === "") {
                return { location: "Location is required" };
            } else if (!values.location.startsWith("http")) {
                return {
                    location:
                        "Location should be link to maps location or online meet link."
                };
            }
        }
    });

    return (
        <>
            <div className={styles.ScheduleOn}>
                <b>Create a Meetup</b>
                <p>Enter details to schedule a meet</p>
            </div>

            <div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={styles.dateandtime}>
                        <input
                            type="datetime-local"
                            id="timePicker"
                            required
                            placeholder="Meeting time"
                            name="meet_time"
                            value={formik.values.meet_time}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                        />

                        <input
                            required
                            type="text"
                            value={formik.values.meet_place}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Meeting Venue Name"
                            className={styles.inputVenue}
                            name="meet_place"
                        />
                    </div>
                    <div className={styles.input_field}>
                        <label className={styles.label}>Title *</label>
                        <div className={styles.inputBox}>
                            <input
                                name="title"
                                required
                                value={formik.values.title}
                                placeholder="Enter meetup title"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.title && formik.errors.title ? (
                                <p className={styles.error_message}>
                                    {formik.errors.title}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles.input_field}>
                        <label className={styles.label}>Agenda *</label>
                        <div className={styles.inputBox}>
                            <textarea
                                name="agenda"
                                required
                                value={formik.values.agenda}
                                placeholder="Type here..."
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            ></textarea>
                            {formik.touched.agenda && formik.errors.agenda ? (
                                <p className={styles.error_message}>
                                    {formik.errors.agenda}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles.input_field}>
                        <label className={styles.label}>
                            Meetup Location Link (Maps, Meet...) *
                        </label>
                        <div className={styles.inputBox}>
                            <input
                                name="location"
                                required
                                value={formik.values.location}
                                placeholder="Meetup location or link"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                            />
                            {formik.touched.location &&
                            formik.errors.location ? (
                                <p className={styles.error_message}>
                                    {formik.errors.location}
                                </p>
                            ) : null}
                        </div>
                    </div>
                    <div className={styles.input_switch}>
                        <label className={styles.label}>
                            Is public meetup?
                        </label>
                        <Switch
                            size="md"
                            isChecked={formik.values.is_public}
                            onChange={e => {
                                formik.setFieldValue(
                                    "is_public",
                                    e.target.checked
                                );
                            }}
                        />
                    </div>
                    <div className={styles.input_switch}>
                        <label className={styles.label}>
                            Need any pre requirements?
                        </label>
                        <Switch
                            size="md"
                            isChecked={formik.values.need_pre_requirements}
                            onChange={e => {
                                formik.setFieldValue(
                                    "need_pre_requirements",
                                    e.target.checked
                                );
                            }}
                        />
                    </div>
                    {formik.values.need_pre_requirements && (
                        <div className={styles.input_field}>
                            <label className={styles.label}>
                                Pre Requirements *
                            </label>
                            <div className={styles.inputBox}>
                                <textarea
                                    required
                                    name="pre_requirements"
                                    value={formik.values.pre_requirements ?? ""}
                                    placeholder="Type here..."
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                ></textarea>
                                {formik.touched.pre_requirements &&
                                formik.errors.pre_requirements ? (
                                    <p className={styles.error_message}>
                                        {formik.errors.pre_requirements}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    )}
                    <div className={styles.input_switch}>
                        <label className={styles.label}>
                            Limit maximum attendees?
                        </label>
                        <Switch
                            size="md"
                            isChecked={formik.values.limit_attendees}
                            onChange={e => {
                                if (!e.target.checked) {
                                    formik.setFieldValue("max_attendees", -1);
                                } else {
                                    formik.setFieldValue("max_attendees", 100);
                                }
                                formik.setFieldValue(
                                    "limit_attendees",
                                    e.target.checked
                                );
                            }}
                        />
                    </div>
                    {formik.values.limit_attendees && (
                        <div className={styles.input_field}>
                            <label className={styles.label}>
                                Maximum Attendees *
                            </label>
                            <div className={styles.inputBox}>
                                <input
                                    type="number"
                                    name="max_attendees"
                                    value={formik.values.max_attendees}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.max_attendees &&
                                formik.errors.max_attendees ? (
                                    <p className={styles.error_message}>
                                        {formik.errors.max_attendees}
                                    </p>
                                ) : null}
                            </div>
                        </div>
                    )}
                    <div className={styles.Bottom}>
                        <button className={styles.BtnBtn}>Create Meetup</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LcMeetCreate;
