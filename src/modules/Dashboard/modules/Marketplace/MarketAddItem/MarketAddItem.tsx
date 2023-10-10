import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";

import styles from "./MarketAddItem.module.css";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

export default function MarketAddItem() {
    return (
        <div className={styles.AddItem}>
            <h2>Add to Marketplace</h2>
            <h3>Fill up the following to add an item to Marketplace.</h3>
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    price: "",
                    quantity: ""
                }}
                validationSchema={Yup}
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
                    <div className={styles.flex + " " + styles.input}>
                        <FormikTextInput
                            label="Price"
                            name="price"
                            styleClasses={styles.input}
                        />
                        <div className={styles.flex}>
                            <button className={styles.padTopButton}>
                                {" "}
                                <AiOutlinePlusCircle size={24} />{" "}
                            </button>
                            <FormikTextInput
                                label="Quantity"
                                name="quantity"
                                styleClasses={styles.input}
                            />
                            <button>
                                {" "}
                                <AiOutlineMinusCircle size={24} />{" "}
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
