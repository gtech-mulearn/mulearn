import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./HackathonCreate.module.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import FormikReactSelect, {
	FormikImageComponent,
    FormikTextAreaWhite,
    FormikTextInputWhite
} from "../../../../../components/MuComponents/FormikComponents/FormikComponents";
import { useEffect, useState } from "react";
import { createHackathon, getFormFields } from "./HackathonApis";

const options = [
    { label: "Option 1", value: "111" },
    { label: "Option 2", value: "222" },
    { label: "Option 3", value: "333" }
];
const options1 = [
    { label: "Everyone", value: true },
    { label: "Invite only", value: false }
];

const HackathonCreate = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [formData, setFormData] = useState("");

    useEffect(() => {
        if (formData === '') {
            getFormFields(setFormData);
        }
    }, []);

    function handleNext() {
        if (tabIndex === 6) {
            setTabIndex(6);
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
        tagline: Yup.string().min(2, "Too Short!").max(100, "Too Long!"),
        // .required("Required"),
        orgId: Yup.string().min(2, "Too Short!"),
        // .required("Required"),
        place: Yup.string()
            // .required("Required")
            .min(2, "Too Short!"),
        districtId: Yup.string().min(2, "Too Short!"),
        // .required("Required"),
        isOpenToAll: Yup.boolean(),
        // .required("Required"),
        description: Yup.string().min(5, "Too Short!"),
        eventStart: Yup.date(),
        eventEnd: Yup.date(),
        applicationStart: Yup.date(),
        applicationEnds: Yup.date(),
        participantCount: Yup.number()
            .positive("Number of users should be a positive value")
            .min(10, "Needs to be at least 2 digits.")
            .max(999999, "Should not exceed 6 digits")
            .truncate()
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
            selectedFields
        );
        resetForm();
    };

    return (
        <div className={styles.container}>
            <div className={styles.topText}>
                <h1 className={styles.dashLine}>Lets Get Started</h1>
                <button type="submit" form="hackathon" className={styles.btn}>
                    Save & Finish later
                </button>
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
                            title: "",
                            tagline: "",
                            description: "",
                            participantCount: "",
                            eventStart: "",
                            eventEnd: "",
                            applicationStart: "",
                            applicationEnds: "",
                            orgId: "",
                            place: "",
                            districtId: "",
                            isOpenToAll: "",
                            formFields: [],
                            event_logo: null
                        }}
                        validationSchema={hackathonSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange }) => (
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
                                        <Tab>Sponsors</Tab>
                                        <Tab>Events</Tab>
                                        <Tab>FAQs</Tab>
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
                                            <FormikImageComponent
                                                name={"event_logo"}
                                                label={"Event logo"}
                                            />
                                            <FormikImageComponent
                                                name={"banner"}
                                                label={"Banner"}
                                            />
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

export default HackathonCreate;
