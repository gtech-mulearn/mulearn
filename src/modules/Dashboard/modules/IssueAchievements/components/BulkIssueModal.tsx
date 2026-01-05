import { useRef, useState } from "react";
import styles from "./BulkIssueModal.module.css";
import { AiOutlineClose, AiOutlineCloudUpload, AiOutlineDownload } from "react-icons/ai";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { toast } from "react-hot-toast";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    achievements: any[];
    onSubmit: (values: any) => void;
    onDownloadTemplate: () => void;
};

const BulkIssueModal: React.FC<Props> = ({ isOpen, onClose, achievements, onSubmit, onDownloadTemplate }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    if (!isOpen) return null;

    const validationSchema = Yup.object().shape({
        achievement_id: Yup.string().required("Required"),
        file: Yup.mixed().required("File is required"),
    });

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h3>Bulk Issue Achievements</h3>
                    <AiOutlineClose onClick={onClose} className={styles.closeIcon} />
                </div>
                <Formik
                    initialValues={{ achievement_id: "", file: null }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values);
                        setSubmitting(false);
                    }}
                >
                    {({ setFieldValue, errors, touched, isSubmitting }) => (
                        <Form className={styles.formContainer}>
                            <div className={styles.inputGroup}>
                                <label>Select Achievement</label>
                                <select
                                    name="achievement_id"
                                    className={styles.selectInput}
                                    onChange={(e) => setFieldValue("achievement_id", e.target.value)}
                                >
                                    <option value="">Select an achievement</option>
                                    {achievements.map((ach) => (
                                        <option key={ach.id} value={ach.id}>
                                            {ach.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.achievement_id && touched.achievement_id && (
                                    <div className={styles.error}>{errors.achievement_id as string}</div>
                                )}
                            </div>

                            <div className={styles.fileUploadContainer}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    accept=".xlsx, .xls"
                                    onChange={(e) => {
                                        const file = e.currentTarget.files?.[0];
                                        if (file) {
                                            setFieldValue("file", file);
                                            setFileName(file.name);
                                        }
                                    }}
                                />
                                <div
                                    className={styles.uploadBox}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <AiOutlineCloudUpload size={40} />
                                    <p>{fileName || "Click to upload Excel file"}</p>
                                </div>
                                {errors.file && touched.file && (
                                    <div className={styles.error}>{errors.file as string}</div>
                                )}
                            </div>

                            <div className={styles.templateLink} onClick={onDownloadTemplate}>
                                <AiOutlineDownload /> Download Template
                            </div>

                            <div className={styles.buttonGroup}>
                                <MuButton
                                    text={isSubmitting ? "Issuing..." : "Issue Achievements"}
                                    submit={true}
                                    className={styles.submitBtn}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default BulkIssueModal;
