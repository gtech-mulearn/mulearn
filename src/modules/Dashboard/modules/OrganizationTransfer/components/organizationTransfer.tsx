import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { Form, Formik } from "formik";
import styles from "./organizationTransfer.module.css";
import * as Yup from "yup";

export default function OrganizationTransfer() {
    const initialValues = {
        from: "",
        to: ""
    };
    const organizationTransferSchema = Yup.object().shape({
        from: Yup.string().required("Required"),
        to: Yup.string().required("Required")
    });
    return (
        <div className={styles.organizationTransfer}>
            <h1>Organization Transfer</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={organizationTransferSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log("Form values:", values);
                    resetForm();
                }}
            >
                <Form>
                    <FormikTextInput
                        type="text"
                        name="from"
                        placeholder="From"
                    />
                    <FormikTextInput type="text" name="to" placeholder="To" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
}
