import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./HackathonCreate.module.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import FormikReactSelect, {
    FormikTextAreaWhite,
    FormikTextInputWhite
} from "../../../../../../components/MuComponents/FormikComponents/FormikComponents";
import { useEffect, useState } from "react";
import { createHackathon, getFormFields, getHackDetails } from "../HackathonApis";
import { useParams } from "react-router-dom";
import { HackList } from "../../User/Hackathon";

const options = [
    { label: "Option 1", value: "111" },
    { label: "Option 2", value: "222" },
    { label: "Option 3", value: "333" }
];
const options1 = [
    { label: "Everyone", value: true },
    { label: "Invite only", value: false }
];

const HackathonEdit = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [formData, setFormData] = useState("");
    const [editData, setEditData] = useState<HackList>();

    const { id } = useParams();

    useEffect(() => {
        if (formData === "") {
            getFormFields(setFormData);
        }
		getHackDetails(setEditData, id);
    }, []);

    function handleNext() {
        if (tabIndex === 3) {
            setTabIndex(3);
        } else {
            setTabIndex(tabIndex + 1);
        }
    }

    function handleBack() {
        if (tabIndex === 0) {
            setTabIndex(0);
        } else {
            setTabIndex(tabIndex - 1);
        }
    }

    const hackathonSchema = Yup.object().shape({
        title: Yup.string()
            .required("Required")
            .min(2, "Too Short!")
            .max(50, "Too Long!"),
        tagline: Yup.string()
            .min(2, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),
        orgId: Yup.string().min(2, "Too Short!"),
        place: Yup.string().min(2, "Too Short!"),
        districtId: Yup.string().min(2, "Too Short!"),
        isOpenToAll: Yup.boolean(),
        description: Yup.string().min(5, "Too Short!"),
        eventStart: Yup.date(),
        eventEnd: Yup.date(),
        applicationStart: Yup.date(),
        applicationEnds: Yup.date(),
        participantCount: Yup.number()
            .positive("Number of users should be a positive value")
            .min(10, "Needs to be at least 2 digits.")
            .max(999999, "Should not exceed 6 digits")
            .truncate(),
        website: Yup.string().min(3, "Too Short!").max(200, "Too Long!"),
        event_logo: Yup.mixed()
            .test(
                "fileSize",
                "File size is too large, maximum size is 10MB",
                (value: any) => {
                    if (value) {
                        const maxSize = 10 * 1024 * 1024; // 10MB
                        return value.size <= maxSize;
                    }
                    return true; // No file selected, so it passes validation
                }
            )
            .test(
                "fileType",
                "Invalid file format, only image formats are supported",
                (value: any) => {
                    if (value) {
                        const supportedFormats = [
                            "image/jpeg",
                            "image/png",
                            "image/gif"
                        ];
                        return supportedFormats.includes(value.type);
                    }
                    return true; // No file selected, so it passes validation
                }
            ),

        banner: Yup.mixed()
            .test(
                "fileSize",
                "File size is too large, maximum size is 20MB",
                (value: any) => {
                    if (value) {
                        const maxSize = 20 * 1024 * 1024; // 20MB
                        return value.size <= maxSize;
                    }
                    return true; // No file selected, so it passes validation
                }
            )
            .test(
                "fileType",
                "Invalid file format, only image formats are supported",
                (value: any) => {
                    if (value) {
                        const supportedFormats = [
                            "image/jpeg",
                            "image/png",
                            "image/gif"
                        ];
                        return supportedFormats.includes(value.type);
                    }
                    return true; // No file selected, so it passes validation
                }
            )
    });

    const handleSubmit = (values: any, { resetForm }: any) => {
        console.log(values);
        console.log(formData);
        const fields: { [key: string]: string } = {
            bio: "system",
            college: "system",
            email: "system",
            experience: "input",
            gender: "system",
            github: "input",
            linkedin: "input",
            mobile: "system",
            name: "system"
        };

        const selectedFields: { [key: string]: string } = {};

        values.formFields.forEach((field: string) => {
            if (fields.hasOwnProperty(field)) {
                selectedFields[field] = fields[field];
            }
        });

        console.log(selectedFields);
        createHackathon(
            values.title,
            values.tagline,
            values.description,
            values.participantCount,
            values.orgId,
            values.districtId,
            values.place,
            values.isOpenToAll,
            `${values.applicationStart}T00:00:00Z`,
            `${values.applicationEnds}T00:00:00Z`,
            `${values.eventStart}T00:00:00Z`,
            `${values.eventEnd}T00:00:00Z`,
            selectedFields,
            values.event_logo
        );
        resetForm();
    };

    return (
        <div className={styles.container}>
            <div className={styles.topText}>
                <h1 className={styles.dashLine}>Lets Finish Setup</h1>
                <div>
                    <button
                        type="submit"
                        form="hackathon"
                        className={styles.btn}
                    >
                        Save & Finish later
                    </button>
                    <button
                        type="submit"
                        form="hackathon"
                        className={styles.btn}
                    >
                        Submit
                    </button>
                </div>
            </div>

            <div>
                <div className={styles.hackNav}>
                    <div className={styles.starImg}>
                        <img
                            src="/src/modules/Dashboard/modules/Hackathon/Assets/Star 1.png"
                            alt=""
                        />
                        <img
                            src="/src/modules/Dashboard/modules/Hackathon/Assets/Star 2.png"
                            alt=""
                        />
                    </div>

                    <Formik
                        initialValues={{
                            title: editData?.title || "",
                            tagline: editData?.tagline || "",
                            description: editData?.description || "",
                            participantCount: editData?.participant_count || "",
                            eventStart: editData?.event_start || "",
                            eventEnd: editData?.event_end || "",
                            applicationStart: editData?.application_start || "",
                            applicationEnds: editData?.application_ends ||"",
                            orgId: editData?.organisation || "",
                            place: "",
                            districtId: "",
                            isOpenToAll: "",
                            formFields: [],
                            event_logo: "",
                            banner: "",
                            website: ""
                        }}
                        validationSchema={hackathonSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, setFieldValue, errors }) => (
                            <Form id="hackathon">
                                <Tabs
                                    selectedTabClassName={styles.selectedTab}
                                    selectedIndex={tabIndex}
                                    onSelect={index => setTabIndex(index)}
                                >
                                    <TabList>
                                        <Tab>Basics</Tab>
                                        <Tab>Dates</Tab>
                                        <Tab>Details</Tab>
                                        <span></span>
                                        <Tab>Application</Tab>
                                        {/* <Tab>Sponsors</Tab> */}
                                        {/* <Tab>Events</Tab> */}
                                        {/* <Tab>FAQs</Tab> */}
                                    </TabList>
                                    <div className={styles.form}>
                                        <TabPanel className={styles.formGroup}>
                                            <FormikTextInputWhite
                                                label="Name"
                                                name="title"
                                                type="text"
                                                className={styles.placeholder}
                                                placeholder="what you are calling your hackathon"
                                            />
                                            <FormikTextInputWhite
                                                label="Tagline"
                                                name="tagline"
                                                type="text"
                                                className={styles.placeholder}
                                                placeholder="eg: worlds realest hackathon"
                                            />
                                            <FormikTextInputWhite
                                                label="Approx. Participants"
                                                name="participantCount"
                                                type="number"
                                                className={styles.placeholder}
                                                placeholder="eg: 250."
                                            />
                                            <FormikTextAreaWhite
                                                label="About"
                                                name="description"
                                                className={styles.placeholder}
                                                placeholder="explain something"
                                            />
                                        </TabPanel>

                                        <TabPanel className={styles.formGroup}>
                                            <FormikTextInputWhite
                                                label="Start Date"
                                                name="eventStart"
                                                className={styles.placeholder}
                                                type="date"
                                            />
                                            <FormikTextInputWhite
                                                label="End Date"
                                                name="eventEnd"
                                                className={styles.placeholder}
                                                type="date"
                                            />
                                            <FormikTextInputWhite
                                                label="Registration Start Date"
                                                name="applicationStart"
                                                className={styles.placeholder}
                                                type="date"
                                            />
                                            <FormikTextInputWhite
                                                label="Registration End Date"
                                                name="applicationEnds"
                                                className={styles.placeholder}
                                                type="date"
                                            />
                                        </TabPanel>

                                        <TabPanel className={styles.formGroup}>
                                            <FormikReactSelect
                                                name="orgId"
                                                options={options}
                                                label={"Organization"}
                                            />
                                            <FormikReactSelect
                                                name="districtId"
                                                options={options}
                                                label={"District"}
                                            />
                                            <FormikTextInputWhite
                                                label="Place"
                                                name="place"
                                                placeholder="location of the hackathon"
                                                type="text"
                                            />
                                            <FormikReactSelect
                                                name="isOpenToAll"
                                                options={options1}
                                                label={"Type of the hackathon"}
                                            />
                                            <div className={styles.InputSet}>
                                                <label
                                                    className={styles.formLabel}
                                                >
                                                    Event Logo
                                                </label>
                                                <input
                                                    type="file"
                                                    className={
                                                        styles.image_input
                                                    }
                                                    onChange={event => {
                                                        if (
                                                            event.target.files
                                                        ) {
                                                            setFieldValue(
                                                                "event_logo",
                                                                event.target
                                                                    .files[0]
                                                            );
                                                        }
                                                    }}
                                                />
                                                {errors.event_logo && (
                                                    <div
                                                        className={styles.error}
                                                    >
                                                        {errors.event_logo}
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.InputSet}>
                                                <label
                                                    className={styles.formLabel}
                                                >
                                                    Banner
                                                </label>
                                                <input
                                                    type="file"
                                                    className={
                                                        styles.image_input
                                                    }
                                                    onChange={event => {
                                                        if (
                                                            event.target.files
                                                        ) {
                                                            setFieldValue(
                                                                "banner",
                                                                event.target
                                                                    .files[0]
                                                            );
                                                        }
                                                    }}
                                                />
                                                {errors.banner && (
                                                    <div
                                                        className={styles.error}
                                                    >
                                                        {errors.banner}
                                                    </div>
                                                )}
                                            </div>
                                            <FormikTextInputWhite
                                                label="Website"
                                                name="website"
                                                placeholder="link for the event website"
                                                type="text"
                                            />
                                        </TabPanel>

                                        <TabPanel className={styles.formGroup}>
                                            <div
                                                id="checkbox-group"
                                                className={styles.InputSet}
                                            >
                                                <label
                                                    className={styles.formLabel}
                                                >
                                                    Select fields for
                                                    application form
                                                </label>
                                            </div>
                                            <div
                                                role="group"
                                                aria-labelledby="checkbox-group"
                                                className={styles.checkboxOuter}
                                            >
                                                {Object.entries(formData).map(
                                                    ([key, value]) => (
                                                        <label
                                                            key={key}
                                                            className={`${
                                                                styles.checkBoxContainer
                                                            } ${
                                                                values.formFields.includes(
                                                                    key as never
                                                                )
                                                                    ? styles.checked
                                                                    : ""
                                                            }`}
                                                        >
                                                            <Field
                                                                type="checkbox"
                                                                name="formFields"
                                                                className={
                                                                    styles.formCheckbox
                                                                }
                                                                style={{
                                                                    display:
                                                                        "none"
                                                                }}
                                                                value={key}
                                                                checked={values.formFields.includes(
                                                                    key as never
                                                                )}
                                                                onChange={
                                                                    handleChange
                                                                }
                                                            />
                                                            {key}
                                                        </label>
                                                    )
                                                )}
                                            </div>
                                        </TabPanel>

                                        <TabPanel
                                            className={styles.formGroup}
                                        ></TabPanel>

                                        <TabPanel
                                            className={styles.formGroup}
                                        ></TabPanel>

                                        <TabPanel
                                            className={styles.formGroup}
                                        ></TabPanel>
                                    </div>
                                    <div className={styles.btns}>
                                        <button
                                            onClick={handleBack}
                                            className={styles.btn}
                                            type="button"
                                        >
                                            Go back
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className={styles.btn}
                                            type="button"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </Tabs>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default HackathonEdit;
