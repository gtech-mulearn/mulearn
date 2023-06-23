import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./HackathonCreate.module.css";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    FormikTextAreaWhite,
    FormikTextInputWhite
} from "../../../../../components/MuComponents/FormikComponents/FormikComponents";
import { useState } from "react";

type Props = {};

const HackathonCreateTabs = (props: Props) => {
	const [tabIndex, setTabIndex] = useState(0)
    const handleSubmit = (values: any) => {
        console.log(values);
    };
	function handleNext() {
		if (tabIndex === 6) {
			setTabIndex(6);
		}
		else {
			setTabIndex(tabIndex + 1);
		}
    }
	
	function handleBack() {
		if (tabIndex === 0) {
            setTabIndex(0);
        }
		else {
			setTabIndex(tabIndex - 1);
		}
    }

	const hackathonSchema = Yup.object().shape({
        name: Yup.string()
            .required("Required")
            .min(2, "Too Short!")
            .max(30, "Too Long!"),
        description: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
        startDate: Yup.date(),
        endDate: Yup.date(),
        regStartDate: Yup.date(),
        regEndDate: Yup.date(),
        participants: Yup.number()
            .positive("number of users should be a positive value")
            .min(10, "Needs to be at least 2 digits.")
            .max(999999, "Should not exceed 4 digits")
            .truncate()
            .required("Karma is required")
    });

    return (
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
                validationSchema={hackathonSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Tabs
                        selectedTabClassName={styles.selectedTab}
                        selectedIndex={tabIndex}
                        onSelect={index => setTabIndex(index)}
                    >
                        <TabList>
                            <Tab>basics</Tab>
                            <Tab>application</Tab>
                            <Tab>links</Tab>
                            <span></span>
                            <Tab>prizes</Tab>
                            <Tab>sponsors</Tab>
                            <Tab>events</Tab>
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
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className={styles.error}
                                />

                                <FormikTextInputWhite
                                    label="Tagline"
                                    name="description"
                                    type="text"
                                    placeholder="eg: worlds realest hackathon"
                                />
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className={styles.error}
                                />
                                <FormikTextInputWhite
                                    label="Approx. Participants"
                                    name="participants"
                                    type="number"
                                    placeholder="eg: 250."
                                />
                                <ErrorMessage
                                    name="participants"
                                    component="div"
                                    className={styles.error}
                                />
                                <FormikTextAreaWhite
                                    label="About"
                                    name="about"
                                    placeholder="explain something"
                                />
                                <ErrorMessage
                                    name="about"
                                    component="div"
                                    className={styles.error}
                                />
                            </TabPanel>

                            <TabPanel className={styles.formGroup}>
                                <FormikTextInputWhite
                                    label="Start Date"
                                    name="startDate"
                                    type="date"
                                />
                                <ErrorMessage
                                    name="startDate"
                                    component="div"
                                    className={styles.error}
                                />
                                <FormikTextInputWhite
                                    label="End Date"
                                    name="endDate"
                                    type="date"
                                />
                                <ErrorMessage
                                    name="endDate"
                                    component="div"
                                    className={styles.error}
                                />
                                <FormikTextInputWhite
                                    label="Registration Start Date"
                                    name="regStartDate"
                                    type="date"
                                />
                                <ErrorMessage
                                    name="regStartDate"
                                    component="div"
                                    className={styles.error}
                                />
                                <FormikTextInputWhite
                                    label="Registration End Date"
                                    name="regEndDate"
                                    type="date"
                                />
                                <ErrorMessage
                                    name="regEndDate"
                                    component="div"
                                    className={styles.error}
                                />
                            </TabPanel>
                            <TabPanel className={styles.formGroup}>
                                <h2>Content for Tab 3</h2>
                                <p>This is the content of Tab 3.</p>
                            </TabPanel>
                        </div>
                        <div className={styles.btns}>
                            <button onClick={handleBack} className={styles.btn}>
                                Go back
                            </button>
                            <button onClick={handleNext} className={styles.btn}>
                                Next
                            </button>
                        </div>
                    </Tabs>
                </Form>
            </Formik>
        </div>
    );
};

export default HackathonCreateTabs;
