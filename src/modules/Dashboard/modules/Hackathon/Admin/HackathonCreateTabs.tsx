import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import styles from "./HackathonCreate.module.css";
import { Form, Formik } from "formik";
import {
    FormikTextAreaWhite,
    FormikTextInputWhite
} from "../../../../../components/MuComponents/FormikComponents/FormikComponents";

type Props = {};

const HackathonCreateTabs = (props: Props) => {
    const handleSubmit = (values: any) => {
        //console.log(values);
    };
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
                onSubmit={handleSubmit}
            >
                <Form>
                    <Tabs selectedTabClassName={styles.selectedTab}>
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
                            <button className={styles.btn}>Go back</button>
                            <button className={styles.btn}>Next</button>
                        </div>
                    </Tabs>
                </Form>
            </Formik>
        </div>
    );
};

export default HackathonCreateTabs;
