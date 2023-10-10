import React, { useRef } from "react";
import * as Yup from "yup";
import { Formik, Form, FormikProps } from "formik";

import styles from "./MarketAddItem.module.css";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

export default function MarketAddItem() {
    const formikRef = useRef<FormikProps<{
        name: string;
        description: string;
        price: number;
        quantity: number;
    }> | null>(null);

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
                    quantity: 1
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
