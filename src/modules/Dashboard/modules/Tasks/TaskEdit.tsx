import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { Form, Formik } from "formik";
import FormikReactSelect, {
    FormikCheckBox,
    FormikSelect,
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { taskEditSchema, useFormikData } from "./TaskEditUtils";

type Props = {};

const TaskEdit = (props: Props) => {
    const { navigate, initialValues, submitHandler, loading, formStructure } =
        useFormikData();
    return (
        <>
            {loading ? (
                <div className={styles.loader_container}>
                    <MuLoader />
                </div>
            ) : (
                <div className={styles.external_container}>
                    <div className={styles.container}>
                        <h1 className={styles.text}>Task Edit Page</h1>
                        <Formik
                            enableReinitialize={true}
                            initialValues={initialValues}
                            validationSchema={taskEditSchema}
                            onSubmit={submitHandler}
                        >
                            <Form className={styles.inputContainer}>
                                {formStructure
                                    .filter(val => val.element === "input")
                                    ?.map((val, index) => {
                                        return (
                                            <FormikTextInput
                                                label={val.label}
                                                name={val.name}
                                                type={val.type}
                                                placeholder={val.placeholder}
                                                required={val.required}
                                                key={val.label}
                                            />
                                        );
                                    })}

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-evenly"
                                    }}
                                >
                                    {formStructure
                                        .filter(
                                            val => val.element === "checkbox"
                                        )
                                        .map(val => (
                                            <FormikCheckBox
                                                label={val.label}
                                                name={val.name}
                                                key={val.label}
                                            />
                                        ))}
                                </div>
                                {formStructure
                                    .filter(val => val.element === "select")
                                    ?.map((val, index) => {
                                        return (
                                            <FormikReactSelect
                                                label={val.label}
                                                name={val.name}
                                                isDisabled={val.disabled}
                                                required={val.required}
                                                options={val.options!}
                                                key={val.label}
                                            />
                                        );
                                    })}

                                {/* <FormikSelect
                                    label={"Events"}
                                    name={"Event"}
                                    disabled={false}
                                >
                                    <option
                                        value={""}
                                    >
                                        {"Shaheen hyder"}
                                    </option>
                                    <option
                                        value={""}
                                    >
                                        {"Aswin Ashok"}
                                    </option>
                                    <option
                                        value={""}
                                    >
                                        {"Shaheen hyder"}
                                    </option>
                                    <option
                                        value={""}
                                    >
                                        {"Aswin Ashok"}
                                    </option>
                                </FormikSelect> */}
                                <div className={styles.btn_container}>
                                    <button
                                        className={styles.btn_cancel}
                                        onClick={() => {
                                            navigate("/dashboard/tasks");
                                        }}
                                    >
                                        Decline
                                    </button>
                                    <button
                                        type="submit"
                                        className={styles.btn_submit}
                                    >
                                        Confirm
                                    </button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskEdit;
