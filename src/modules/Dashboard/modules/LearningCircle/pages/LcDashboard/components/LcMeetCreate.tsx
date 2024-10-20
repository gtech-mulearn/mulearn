import { createRef, Dispatch, SetStateAction, useRef, useState } from "react";
import styles from "../LcDashboard.module.css";
import toast from "react-hot-toast";
import {
    createMeetup,
    setLCMeetTime
} from "../../../services/LearningCircleAPIs";
import { useFormik } from "formik";
import { Switch } from "@chakra-ui/react";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    lc: LcDetail | undefined;
    id: string | undefined;
};

const LcMeetCreate = (props: Props) => {
    const [tasks, setTasks] = useState<LcTask[]>([]);
    const taskInputRef = createRef<HTMLInputElement>();
    const [isLoading, setIsLoading] = useState(false);
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
            max_attendees: -1,
            is_online: false
        },
        onSubmit: values => {
            if (tasks.length === 0) {
                toast.error("Please add tasks");
                return;
            }
            setIsLoading(true);
            createMeetup({ ...values, tasks: tasks }, props.id ?? "")
                .then(res => {
                    setIsLoading(false);
                    if (res) {
                        if (res.hasError) {
                            toast.error(res.message.general[0]);
                        } else {
                            toast.success(res.message.general[0]);
                        }
                    }
                })
                .catch(err => {
                    setIsLoading(false);
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
                        <label className={styles.label}>Description *</label>
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
                        <label className={styles.label}>Add Tasks *</label>
                        <div className={styles.addedTasks}>
                            {tasks.map((task, index) => (
                                <div key={index} className={styles.task}>
                                    <div>
                                        <span>{index + 1}.</span>
                                        <p>{task.title}</p>
                                    </div>
                                    <button
                                        onClick={e => {
                                            e.preventDefault();
                                            setTasks(
                                                tasks.filter(
                                                    (_, i) => i !== index
                                                )
                                            );
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={styles.inputBox}>
                            <div className={styles.tasks}>
                                <input
                                    name="tasks"
                                    ref={taskInputRef}
                                    placeholder="Add tasks"
                                    maxLength={100}
                                    onChange={e => {
                                        e.preventDefault();
                                        if (
                                            e.currentTarget.value.endsWith("\n")
                                        ) {
                                            setTasks([
                                                ...tasks,
                                                {
                                                    title: e.currentTarget.value.slice(
                                                        0,
                                                        -1
                                                    )
                                                } as any
                                            ]);
                                            e.currentTarget.value = "";
                                        }
                                    }}
                                />
                                <button
                                    onClick={e => {
                                        e.preventDefault();
                                        if (taskInputRef.current?.value)
                                            setTasks([
                                                ...tasks,
                                                {
                                                    title: taskInputRef.current
                                                        ?.value
                                                } as any
                                            ]);
                                        taskInputRef.current!.value = "";
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.input_switch}>
                        <label className={styles.label}>
                            Is online meetup?
                        </label>
                        <Switch
                            size="md"
                            isChecked={formik.values.is_online}
                            onChange={e => {
                                formik.setFieldValue(
                                    "is_online",
                                    e.target.checked
                                );
                            }}
                        />
                    </div>
                    <div className={styles.input_field}>
                        <label className={styles.label}>
                            {formik.values.is_online
                                ? "Online meet link"
                                : "Meetup Location Link"}
                            *
                        </label>
                        <div className={styles.inputBox}>
                            <input
                                name="location"
                                required
                                value={formik.values.location}
                                placeholder={
                                    "Enter Link " +
                                    (formik.values.is_online
                                        ? " (eg: https://meet.google.com/abc-xyz)"
                                        : " (eg: https://maps.google.com/abc-xyz)")
                                }
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
                            Need any prerequisites?
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
                                Prerequisites *
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
                    <PowerfulButton isLoading={isLoading}>
                        Create Meetup
                    </PowerfulButton>
                </form>
            </div>
        </>
    );
};

export default LcMeetCreate;
