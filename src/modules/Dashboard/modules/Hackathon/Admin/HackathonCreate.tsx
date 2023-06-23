import { Form, Formik, useFormikContext } from "formik";
import styles from "./HackathonCreate.module.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { FormikTextAreaWhite, FormikTextInputWhite } from "../../../../../components/MuComponents/FormikComponents/FormikComponents";
import { useState } from "react";

const SubmitButton = () => {
    const formik = useFormikContext();

    const handleSubmit = () => {
        formik.submitForm();
    };

    return (
        <button onClick={handleSubmit} className={styles.btn}>
            Save & Finish later
        </button>
    );
};

const HackathonCreate = () => {
    const [tabIndex, setTabIndex] = useState(0);

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
    return (
        <div className={styles.container}>
            <div className={styles.topText}>
                <h1 className={styles.dashLine}>Lets Get Started</h1>
                <SubmitButton />
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
                            name: "",
                            description: "",
                            startDate: "",
                            endDate: "",
                            regStartDate: "",
                            regEndDate: "",
                            participants: "",
                            about: ""
                        }}
                        onSubmit={values => {
                            // Handle form submission
                            console.log(values);
                        }}
                    >
                        <Form>
                            <Tabs
                                selectedTabClassName={styles.selectedTab}
                                selectedIndex={tabIndex}
                                onSelect={index => setTabIndex(index)}
                            >
                                <TabList>
                                    <Tab>Basics</Tab>
                                    <Tab>Dates</Tab>
                                    <Tab>Links</Tab>
                                    <span></span>
                                    <Tab>Prizes</Tab>
                                    <Tab>Sponsors</Tab>
                                    <Tab>Events</Tab>
                                    <Tab>FAQs</Tab>
                                </TabList>
                                <div className={styles.form}>
                                    <TabPanel className={styles.formGroup}>
                                        <FormikTextInputWhite
                                            label="Name"
                                            name="name"
                                            type="text"
                                            placeholder="what you are calling your hackathon"
                                        />

                                        <FormikTextInputWhite
                                            label="Tagline"
                                            name="description"
                                            type="text"
                                            placeholder="eg: worlds realest hackathon"
                                        />
                                        <FormikTextAreaWhite
                                            label="About"
                                            name="about"
                                            placeholder="explain something"
                                        />
                                    </TabPanel>

                                    <TabPanel className={styles.formGroup}>
                                        <FormikTextInputWhite
                                            label="Start Date"
                                            name="startDate"
                                            type="date"
                                        />
                                        <FormikTextInputWhite
                                            label="End Date"
                                            name="endDate"
                                            type="date"
                                        />
                                        <FormikTextInputWhite
                                            label="Registration Start Date"
                                            name="regStartDate"
                                            type="date"
                                        />
                                        <FormikTextInputWhite
                                            label="Registration End Date"
                                            name="regEndDate"
                                            type="date"
                                        />
                                        <FormikTextInputWhite
                                            label="Approx. Participants"
                                            name="participants"
                                            type="number"
                                            placeholder="eg: 250."
                                        />
                                    </TabPanel>
                                    <TabPanel className={styles.formGroup}>
                                        <h2>Content for Tab 3</h2>
                                        <p>This is the content of Tab 3.</p>
                                    </TabPanel>
                                </div>
                                <div className={styles.btns}>
                                    <button
                                        onClick={handleBack}
                                        className={styles.btn}
                                    >
                                        Go back
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className={styles.btn}
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
