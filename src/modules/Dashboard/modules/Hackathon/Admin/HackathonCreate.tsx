import { Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./HackathonCreate.module.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import FormikReactSelect, {
    FormikTextAreaWhite,
    FormikTextInputWhite
} from "../../../../../components/MuComponents/FormikComponents/FormikComponents";
import { useEffect, useState } from "react";
import { getFormFields } from "./HackathonApis";

const options = [
    { label: "Option 1", value: "111" },
    { label: "Option 2", value: "222" },
    { label: "Option 3", value: "333" }
];
const options1 = [
    { label: "Everyone", value: true },
    { label: "Invite only", value: false },
];

const HackathonCreate = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [formData, setFormData] = useState("");

    useEffect(() => {
        getFormFields(setFormData);
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
        tagline: Yup.string()
            .min(2, "Too Short!")
            .max(100, "Too Long!")
            .required("Required"),
        orgId: Yup.string().min(2, "Too Short!").required("Required"),
        place: Yup.string().min(2, "Too Short!").required("Required"),
        districtId: Yup.string().min(2, "Too Short!").required("Required"),
        isOpenToAll: Yup.boolean().required("Required"),
        description: Yup.string().min(5, "Too Short!").required("Required"),
        eventStart: Yup.date().required("Required"),
        eventEnd: Yup.date().required("Required"),
        applicationStart: Yup.date().required("Required"),
        applicationEnds: Yup.date().required("Required"),
        participantCount: Yup.number()
            .positive("Number of users should be a positive value")
            .min(10, "Needs to be at least 2 digits.")
            .max(999999, "Should not exceed 6 digits")
            .truncate()
            .required("User count is required")
    });

    const handleSubmit = (values: any, { resetForm }: any) => {
        console.log(values);
		console.log(formData);
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
                            src="/src/modules/Dashboard/modules/Hackathon/Assects/Star 1.png"
                            alt=""
                        />
                        <img
                            src="/src/modules/Dashboard/modules/Hackathon/Assects/Star 2.png"
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
                            isOpenToAll: ""
                        }}
                        validationSchema={hackathonSchema}
                        onSubmit={handleSubmit}
                    >
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
                                            placeholder="what you are calling your hackathon"
                                        />
                                        <FormikTextInputWhite
                                            label="Tagline"
                                            name="tagline"
                                            type="text"
                                            placeholder="eg: worlds realest hackathon"
                                        />
                                        <FormikTextInputWhite
                                            label="Approx. Participants"
                                            name="participantCount"
                                            type="number"
                                            placeholder="eg: 250."
                                        />
                                        <FormikTextAreaWhite
                                            label="About"
                                            name="description"
                                            placeholder="explain something"
                                        />
                                    </TabPanel>

                                    <TabPanel className={styles.formGroup}>
                                        <FormikTextInputWhite
                                            label="Start Date"
                                            name="eventStart"
                                            type="date"
                                        />
                                        <FormikTextInputWhite
                                            label="End Date"
                                            name="eventEnd"
                                            type="date"
                                        />
                                        <FormikTextInputWhite
                                            label="Registration Start Date"
                                            name="applicationStart"
                                            type="date"
                                        />
                                        <FormikTextInputWhite
                                            label="Registration End Date"
                                            name="applicationEnds"
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
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default HackathonCreate;
