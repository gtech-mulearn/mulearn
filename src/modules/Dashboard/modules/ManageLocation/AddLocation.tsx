import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { MuButton, PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { postCountryData } from "./apis/CountryAPI";
import { postStateData } from "./apis/StateAPI";
import { postZoneData } from "./apis/ZoneAPI";
import { postDistrictData } from "./apis/DistrictAPI";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AddLocation = () => {
    const [activeItem, setActiveItem] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    useEffect(() => {
        setActiveItem(location.state.activeItem);
    }, []);

    function handleSubmitAdd(values: any) {
        if (activeItem === "Country") {
            postCountryData(values.ItemName, toast);
        } else if (activeItem === "State") {
            postStateData(location.state.country, values.ItemName);
        } else if (activeItem === "Zone") {
            postZoneData(location.state.state, values.ItemName);
        } else if (activeItem === "District") {
            postDistrictData(location.state.zone, values.ItemName);
        }
        toast({
            title: "Location created",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        navigate("/dashboard/manage-locations", {
            state: { activeItem: activeItem }
        });
    }

    return (
        <div className="popup_container">
            <div className={styles.container}>
                <div className="popup_top_container">
                    <h1 className="popup_title">Add {activeItem}</h1>
                    <i
                        className="fi fi-sr-cross"
                        onClick={() => {
                            navigate("/dashboard/manage-locations");
                        }}
                    ></i>
                </div>
                <p>
                    Kindly review the provided details and make sure that they
                    are correct. Once you have verified the information, please
                    click the <span>Confirm</span>
                    button to proceed for further process.
                </p>
                <Formik
                    initialValues={{
                        ItemName: ""
                    }}
                    validationSchema={Yup.object({
                        ItemName: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        console.log(values.ItemName);
                        handleSubmitAdd(values);
                    }}
                >
                    <Form>
                        <FormikTextInput
                            label={`${activeItem} Name`}
                            name="ItemName"
                            type="text"
                            placeholder={`Enter ${activeItem}`}
                            onKeyPress={(e: any) => {
                                e.which === 13 && e.preventDefault();
                            }}
                        />
                        <div className="ml_popup_btn_container">
                            <PowerfulButton
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/dashboard/manage-locations", {
                                        state: {
                                            activeItem: activeItem,
                                            isDeclined: true
                                        }
                                    });
                                }}
                            >
                                Decline
                            </PowerfulButton>
                            <button type="submit" className={styles.btn_submit}>
                                Confirm
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default AddLocation;
