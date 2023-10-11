import React, { useRef, DragEvent, useState, ChangeEvent } from "react";
import * as Yup from "yup";
import { Formik, Form, FormikProps } from "formik";

import styles from "./MarketAddItem.module.css";

import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import {
    AiOutlineFile,
    AiOutlineFileAdd,
    AiOutlineMinusCircle,
    AiOutlinePlusCircle
} from "react-icons/ai";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

export default function MarketAddItem() {
    const formikRef = useRef<FormikProps<{
        name: string;
        description: string;
        price: number;
        quantity: number;
        image: File | null;
    }> | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleQuanityChange = (change: number) => {
        //as any is temp fix quantity should be number but if the users
        //types the value it becomes string
        if (!formikRef.current) return;
        if (parseInt(formikRef.current.values["quantity"] as any) + change <= 0)
            return;
        formikRef.current.setFieldValue(
            "quantity",
            parseInt(formikRef.current.values["quantity"] as any) + change
        );
    };
    const handleFileChange = (file: File) => {
        setFile(file);
        formikRef.current?.setFieldValue("image", file);
    };
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => e.preventDefault();
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFileChange(e.dataTransfer.files[0]);
    };

    return (
        <div className={styles.AddItem}>
            <h2>Add to Marketplace</h2>
            <h3>Fill up the following to add an item to Marketplace.</h3>
            <Formik
                innerRef={formikRef}
                enableReinitialize={true}
                initialValues={{
                    name: "",
                    description: "",
                    price: 1,
                    quantity: 1,
                    image: null
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required(),
                    description: Yup.string().required(),
                    price: Yup.number().required().min(1),
                    quantity: Yup.number().required().min(1)
                })}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                <Form>
                    <FormikTextInput
                        label="Name"
                        name="name"
                        styleClasses={styles.input}
                    />
                    <FormikTextInput
                        label="Description"
                        name="description"
                        styleClasses={styles.input}
                    />

                    <div
                        className={styles.uploadBox}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <label htmlFor="imageInput" className={styles.flex}>
                            {file ? (
                                <img src={URL.createObjectURL(file)} />
                            ) : (
                                <>
                                    <AiOutlineFileAdd size={32} />
                                    Upload the product Image here
                                </>
                            )}
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="imageInput"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                handleFileChange(e.currentTarget.files![0]);
                            }}
                        />
                    </div>

                    <div className={styles.flex + " " + styles.input}>
                        <FormikTextInput
                            label="Price"
                            name="price"
                            styleClasses={styles.input}
                        />
                        <div className={styles.flex}>
                            <button className={styles.padTopButton}>
                                {" "}
                                <AiOutlineMinusCircle
                                    size={24}
                                    onClick={() => handleQuanityChange(-1)}
                                />{" "}
                            </button>
                            <FormikTextInput
                                label="Quantity"
                                name="quantity"
                                styleClasses={styles.input}
                            />
                            <button className={styles.padTopButton}>
                                {" "}
                                <AiOutlinePlusCircle
                                    size={24}
                                    onClick={() => handleQuanityChange(1)}
                                />{" "}
                            </button>
                        </div>
                    </div>
                    <PowerfulButton className={styles.padLeftButton}>
                        Post
                    </PowerfulButton>
                </Form>
            </Formik>
        </div>
    );
}
