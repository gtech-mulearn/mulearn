import styles from "./HackathonCreate.module.css";
import { Form, Formik } from "formik";
import { FormikTextAreaWhite, FormikTextInputWhite } from "../../../../../components/MuComponents/FormikComponents/FormikComponents";

const HackathonCreate = () => {
	const handleSubmit = (values: any) => {
		console.log(values);
	}
    return (
        <div className={styles.container}>
            <div className={styles.topText}>
                <h1 className={styles.dashLine}>Lets Get Started</h1>
                <button className={styles.btn}>save & Finish later</button>
            </div>

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
                <ul>
                    <li>basics</li>
                    <li>application</li>
                    <li>links</li>
                    <span></span>
                    <li>prizes</li>
                    <li>sponsors</li>
                    <li>events</li>
                    <li>FAQs</li>
                </ul>
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
                <Form className={styles.form}>
                    <div className={styles.formGroup}>
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
                        <FormikTextAreaWhite
                            label="About"
                            name="about"
                            placeholder="explain something"
                        />
                    </div>
                </Form>
            </Formik>

            {/* <div className={styles.form}>
                <div className={styles.formGroup}>
                    <div className={styles.InputSet}>
                        <label className={styles.formLabel} htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="what you are calling your hackathon"
                        />
                    </div>

                    <div className={styles.InputSet}>
                        <label
                            className={styles.formLabel}
                            htmlFor="description"
                        >
                            Tagline
                        </label>
                        <input
                            type="text"
                            id="description"
                            placeholder="eg: worlds realest hackathon"
                        />
                    </div>

                    <div className={styles.InputSet}>
                        <label className={styles.formLabel} htmlFor="startDate">
                            Start Date
                        </label>
                        <input type="date" id="startDate" />
                    </div>

                    <div className={styles.InputSet}>
                        <label className={styles.formLabel} htmlFor="endDate">
                            End Date
                        </label>
                        <input type="date" id="endDate" />
                    </div>

                    <div className={styles.InputSet}>
                        <label
                            className={styles.formLabel}
                            htmlFor="registrationStartDate"
                        >
                            Registration Start Date
                        </label>
                        <input type="date" id="registrationStartDate" />
                    </div>

                    <div className={styles.InputSet}>
                        <label
                            className={styles.formLabel}
                            htmlFor="registrationEndDate"
                        >
                            Registration End Date
                        </label>
                        <input type="date" id="registrationEndDate" />
                    </div>

                    <div className={styles.InputSet}>
                        <label className={styles.formLabel} htmlFor="teamSize">
                            Approx. Participants
                        </label>
                        <input
                            type="number"
                            id="teamSize"
                            placeholder="eg: 250."
                        />
                    </div>
                </div>
                <div className={styles.InputSet}>
                    <label className={styles.formLabel} htmlFor="teamSize">
                        About
                    </label>
                    <textarea id="about" placeholder="explain something" />
                </div>
            </div> */}

            <div className={styles.btns}>
                <button className={styles.btn}>Go back</button>
                <button className={styles.btn}>Next</button>
            </div>
        </div>
    );
};

export default HackathonCreate;
