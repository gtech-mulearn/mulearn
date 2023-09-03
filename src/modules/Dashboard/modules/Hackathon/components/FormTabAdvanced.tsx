import { FiUploadCloud } from "react-icons/fi";
import styles from "../pages/HackathonCreate.module.css";
import { useState } from "react";
import { Field } from "formik";

type FormTabAdvancedProps = {
    data: any;
    errors: any;
    setFieldValue: any;
};

export const FormTabAdvanced = ({
    data,
    errors,
    setFieldValue
}: FormTabAdvancedProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File | null>(null);

    return (
        <>
            <div className={styles.formGroupLogo}>
                <div className={styles.InputSet}>
                    <label className={styles.formLabel + " requiredLabel"}>Banner</label>
                    <div className={styles.upload_area}>
                        <label
                            htmlFor="file-upload1-input1"
                            className={styles.upload_button}
                        >
                            <FiUploadCloud className={styles.icon} />
                            <p className={styles.text}>Click to choose</p>
                            <span className={styles.text1}>
                                60x12 .png or .jpeg 5MB max
                            </span>
                        </label>
                        {data?.banner !== null && (
                            <div className={styles.editBanner}>
                                <img
                                    src={`https://dev.mulearn.org/${data?.banner}`}
                                    alt=""
                                />
                            </div>
                        )}
                        <input
                            id="file-upload1-input1"
                            type="file"
                            accept=".png,.jepg,.jpg"
                            name="banner"
                            onChange={(event: any) => {
                                if (event.target.files) {
                                    setFieldValue(
                                        "banner",
                                        event.target.files[0]
                                    );
                                }
                                setSelectedFiles(event.target.files[0]);
                            }}
                            style={{
                                opacity: 0,
                                position: "absolute",
                                top: 100,
                                left: 0
                            }}
                        />
                        {selectedFiles && (
                            <div className={styles.fileInfo}>
                                <b>{selectedFiles.name}</b>
                            </div>
                        )}
                    </div>
                    {errors.banner && (
                        <div className={styles.error}>{errors.banner}</div>
                    )}
                </div>

                <div className={styles.InputSet}>
                    <label className={styles.formLabel + " requiredLabel"}>Event Logo</label>
                    <div className={styles.upload_area}>
                        <label
                            htmlFor="file-upload1-input"
                            className={styles.upload_button}
                        >
                            <FiUploadCloud className={styles.icon} />
                            <p className={styles.text}>Click to choose</p>
                            <span className={styles.text1}>
                                300x124 .png or .jpeg 10MB max
                            </span>
                        </label>
                        {data?.banner !== null && (
                            <div className={styles.editBanner}>
                                <img
                                    src={`https://dev.mulearn.org/${data?.event_logo}`}
                                    alt=""
                                />
                            </div>
                        )}
                        <input
                            id="file-upload1-input"
                            type="file"
                            accept=".png,.jepg,.jpg"
                            name="event_logo"
                            onChange={(event: any) => {
                                if (event.target.files) {
                                    setFieldValue(
                                        "event_logo",
                                        event.target.files[0]
                                    );
                                }
                                setSelectedFile(event.target.files[0]);
                            }}
                            style={{
                                opacity: 0,
                                position: "absolute",
                                top: 100,
                                left: 0
                            }}
                        />
                        {selectedFile && (
                            <div className={styles.fileInfo}>
                                <b>{selectedFile.name}</b>
                            </div>
                        )}
                    </div>
                    {errors.event_logo && (
                        <div className={styles.error}>{errors.event_logo}</div>
                    )}
                </div>
            </div>
            <div className={styles.checker}>
                <label className={styles.formLabel}>
                    Hackathon Open to all ?
                </label>
                <div className={styles.checkerInput}>
                    <Field type="checkbox" name="isOpenToAll" />
                </div>
            </div>
        </>
    );
};
