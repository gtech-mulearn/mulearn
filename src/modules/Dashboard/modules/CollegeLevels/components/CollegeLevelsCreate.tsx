import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import styles from "./Modal.module.css";
import mustyles from "@/MuLearnComponents/MuButtons/MuButtons.module.css";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import * as Yup from "yup";
import FormikReactSelect from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { createCollegeLevels } from "../apis";
import { useEffect, useState } from "react";

import {
    getCountries,
    getColleges,
    getDistrict,
    getState
} from "../../../../Common/Authentication/services/onboardingApis";

type Props = {
    id: string;
    onClose: any;
};

const CollegeLevelsCreate = (props: Props) => {
    const toast = useToast();
    const [countrys, setCountrys] = useState([{ value: "", label: "" }]);
    const [states, setStates] = useState([{ value: "", label: "" }]);
    const [districts, setDistricts] = useState([{ value: "", label: "" }]);
    const [colleges, setColleges] = useState([{ value: "", label: "" }]);

    const errorHandler = (err: any) => {
        toast({
            title: "Error",
            description: err,
            status: "error",
            duration: 5000,
            isClosable: true
        });
    };

    useEffect(() => {
        getCountries(errorHandler, setCountrys);
    }, []);

    return (
        <Formik
            initialValues={{
                org_id: "",
                level: "",
                country: "",
                state: "",
                district: ""
            }}
            validationSchema={Yup.object({
                country: Yup.string().required("Required"),
                state: Yup.string().required("Required"),
                district: Yup.string().required("Required"),
                org_id: Yup.string().required("Required"),
                level: Yup.number().required("Required")
            })}
            onSubmit={values => {
                (async () => {
                    createCollegeLevels({
                        org_id: values.org_id,
                        level: values.level
                    });
                    toast({
                        title: "College level created",
                        status: "success",
                        duration: 3000,
                        isClosable: true
                    });
                    props.onClose(null);
                })();
            }}
        >
            <Form className={styles.Form}>
                <div className={styles.selectContainer}>
                    <FormikReactSelect
                        name="country"
                        label="Country"
                        options={countrys}
                        isClearable
                        isSearchable
                        addOnChange={(option: any) => {
                            if (option)
                                getState(errorHandler, setStates, {
                                    country: option.value
                                });
                            else {
                                setStates([]);
                                setDistricts([]);
                            }
                        }}
                    />
                    <FormikReactSelect
                        name="state"
                        label="State"
                        options={states}
                        isClearable
                        isSearchable
                        addOnChange={(option: any) => {
                            if (option)
                                getDistrict(errorHandler, setDistricts, {
                                    state: option.value
                                });
                            else {
                                setStates([]);
                                setDistricts([]);
                            }
                        }}
                    />
                    <FormikReactSelect
                        name="district"
                        label="District"
                        options={districts}
                        isClearable
                        isSearchable
                        addOnChange={(option: any) => {
                            if (option)
                                getColleges(
                                    () => {},
                                    setColleges,
                                    () => {},
                                    errorHandler,
                                    { district: option.value }
                                );
                        }}
                    />
                    <FormikReactSelect
                        name="org_id"
                        label="College"
                        options={colleges}
                        isClearable
                        isSearchable
                    />
                    <FormikReactSelect
                        name="level"
                        label="Level"
                        options={[1, 2, 3, 4].map(val => ({
                            label: val.toString(),
                            value: val
                        }))}
                        isClearable
                        isSearchable
                    />
                </div>

                <div className={styles.ButtonContainer}>
                    <MuButton
                        className={`${mustyles.btn} ${styles.Decline}`}
                        text={"Decline"}
                        onClick={() => {
                            props.onClose(null);
                        }}
                    />
                    <MuButton
                        className={`${mustyles.btn} ${styles.Confirm}`}
                        text={"Confirm"}
                        submit={true}
                        type="submit"
                    />
                </div>
            </Form>
        </Formik>
    );
};

export default CollegeLevelsCreate;
