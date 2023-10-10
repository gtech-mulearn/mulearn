import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import styles from "./Modal.module.css";
import mustyles from "@/MuLearnComponents/MuButtons/MuButtons.module.css";
import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
import * as Yup from "yup";
import FormikReactSelect from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { createCollegeLevels } from "../apis";
import { useEffect, useState } from "react";
import { levelCount } from "../Utisl";
import {
    getCountries,
    getColleges,
    getDistrict,
    getState
} from "../../../../Common/Authentication/services/onboardingApis";

type Props = {
    onClose: any;
    refetch?: Function;
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

    const selectProps = [
        {
            name: "country",
            label: "Country",
            options: countrys,
            isClearable: true,
            isSearchable: true,
            addOnChange: (option: any) => {
                if (option)
                    getState(errorHandler, setStates, {
                        country: option.value
                    });
                else {
                    setStates([]);
                    setDistricts([]);
                }
            }
        },
        {
            name: "state",
            label: "State",
            options: states,
            isClearable: true,
            isSearchable: true,
            addOnChange: (option: any) => {
                if (option)
                    getDistrict(errorHandler, setDistricts, {
                        state: option.value
                    });
                else {
                    setStates([]);
                    setDistricts([]);
                }
            }
        },
        {
            name: "district",
            label: "District",
            options: districts,
            isClearable: true,
            isSearchable: true,
            addOnChange: (option: any) => {
                if (option)
                    getColleges(
                        () => {},
                        setColleges,
                        () => {},
                        errorHandler,
                        { district: option.value }
                    );
            }
        },
        {
            name: "org_id",
            label: "College",
            options: colleges,
            isClearable: true,
            isSearchable: true
        },
        {
            name: "level",
            label: "Levels",
            options: [...new Array(levelCount).keys()].map(val => ({
                label: (val + 1).toString(),
                value: val + 1
            })),
            isClearable: true,
            isSearchable: true
        }
    ];

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
                    try {
                        await createCollegeLevels({
                            org_id: values.org_id,
                            level: values.level
                        });
                        if (props.refetch) props.refetch();
                        toast({
                            title: "College level created",
                            status: "success",
                            duration: 3000,
                            isClosable: true
                        });
                    } catch (err) {
                        errorHandler;
                    }

                    props.onClose(null);
                })();
            }}
        >
            <Form className={styles.form}>
                <div className={styles.selectContainer}>
                    {selectProps.map((props, index) => (
                        <FormikReactSelect
                            addStyles={{ width: "200px" }}
                            {...props}
                            key={`select${index}`}
                        />
                    ))}
                </div>

                <div className={styles.buttonContainer}>
                    <PowerfulButton
                        className={`${mustyles.btn} ${styles.decline}`}
                        onClick={() => {
                            props.onClose(null);
                        }}
                    >
                        Decline
                    </PowerfulButton>
                    <PowerfulButton
                        className={`${mustyles.btn} ${styles.confirm}`}
                        type="submit"
                    >
                        Confirm
                    </PowerfulButton>
                </div>
            </Form>
        </Formik>
    );
};

export default CollegeLevelsCreate;
