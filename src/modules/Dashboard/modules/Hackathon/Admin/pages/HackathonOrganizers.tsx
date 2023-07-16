import { useFormik } from "formik";
import styles from "./HackathonCreate.module.css";

type Props = {};

const HackathonOrganizers = (props: Props) => {
    const formik = useFormik({
        initialValues: {
            muId: ""
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        }
    });
    return (
        <div>
            <form className={styles.InputSet} onSubmit={formik.handleSubmit}>
                <label htmlFor="muId" className={styles.formLabel}>
                    Mu ID of the organizer
                </label>
                <input
                    id="muId"
                    name="muId"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.muId}
                />
                <div className={styles.btns}>
                    <button className={styles.btn} type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default HackathonOrganizers;
