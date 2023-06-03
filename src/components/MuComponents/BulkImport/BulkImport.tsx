import React, { useState, ChangeEvent, DragEvent } from "react";
import styles from "./BulkImport.module.css";
import { FiPlus } from "react-icons/fi";
import { bulkImport } from "./BulkImportApi";

type Props = {
	path: string,
};

const BulkImport = (props: Props) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            if (validateFile(file)) {
                setSelectedFile(file);
                setErrorMessage("");
            } else {
                setSelectedFile(null);
                setErrorMessage(
                    "Invalid file format. Please upload a valid Excel file."
                );
            }
        }
    };

    const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        if (validateFile(file)) {
            setSelectedFile(file);
            setErrorMessage("");
        } else {
            setSelectedFile(null);
            setErrorMessage(
                "Invalid file format. Please upload a valid Excel file."
            );
        }
    };

    const validateFile = (file: File): boolean => {
        const allowedExtensions = [".xls", ".xlsx"];
        const allowedMimeTypes = [
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ];
        const fileExtension = "." + file.name.split(".").pop();

        // Validate extension
        if (!allowedExtensions.includes(fileExtension)) {
            return false;
        }

        // Validate MIME type
        if (!allowedMimeTypes.includes(file.type)) {
            return false;
        }

        return true;
    };

    const handleUpload = () => {
        if (selectedFile) {
            const renamedFile = renameFile(selectedFile, "task_list.xlsx");
            const formData = new FormData();
            formData.append("file", renamedFile);
			bulkImport(formData, props.path)
            // Make the POST API call with the formData
            // Example: axios.post('/api/upload', formData)
            // Replace '/api/upload' with your actual API endpoint
        }
    };

	const renameFile = (file: File, newName: string): File => {
        const renamed = new File([file], newName, { type: file.type });
        return renamed;
    };

    return (
        <div className={styles.container}>
            <div
                className={`file-upload ${isDragging ? "dragging" : ""}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className={styles.upload_area}>
                    <label
                        htmlFor="file-upload-input"
                        className={styles.upload_button}
                    >
                        <FiPlus className={styles.icon} />
                    </label>
                    <input
                        id="file-upload-input"
                        type="file"
                        accept=".xls, .xlsx"
                        onChange={handleFileChange}
                        style={{
                            opacity: 0,
                            position: "absolute",
                            top: 0,
                            left: 0
                        }}
                    />
                    <p className={styles.text}>
                        Drag and drop Excel files here or click to select files
                    </p>
                </div>
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
                {selectedFile && (
                    <div className="file-info">
                        <span>{selectedFile.name}</span>
                        <button onClick={handleUpload}>Upload</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BulkImport;