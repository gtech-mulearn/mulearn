import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikReactSelect, {
    FormikTextInput
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { getCountryData, postCountryData } from "./apis/CountryAPI";
import { getStateData, postStateData } from "./apis/StateAPI";
import { getZoneData, postZoneData } from "./apis/ZoneAPI";
import { postDistrictData } from "./apis/DistrictAPI";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const AddLocation = () => {
    const [activeItem, setActiveItem] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
    const [option, setOption] = useState<{ label: string; value: string }[]>(
        []
    );

    useEffect(() => {
        setActiveItem(location.state.activeItem);
        if (location.state.activeItem === "State") {
            getCountryData(setOption);
        } else if (location.state.activeItem === "Zone") {
            getStateData(setOption);
        } else if (location.state.activeItem === "District") {
            getZoneData(setOption);
        }
    }, []);

    function handleSubmitAdd(values: any) {
        if (activeItem === "Country") {
            postCountryData(values.ItemName, toast);
        } else if (activeItem === "State") {
            postStateData(values.dropdata, values.ItemName);
        } else if (activeItem === "Zone") {
            postZoneData(values.dropdata, values.ItemName);
        } else if (activeItem === "District") {
            postDistrictData(values.dropdata, values.ItemName);
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
                            navigate("/dashboard/manage-locations", {
                                state: { activeItem: activeItem }
                            });
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
                        ...(activeItem !== "Country" && { dropdata: "" }),
                        ItemName: ""
                    }}
                    validationSchema={Yup.object({
                        ...(activeItem !== "Country" && {
                            dropdata: Yup.string().required()
                        }),

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
                        {activeItem !== "Country" && (
                            <FormikReactSelect
                                label={(() => {
                                    switch (activeItem) {
                                        case "State":
                                            return "Country";
                                        case "Zone":
                                            return "State";
                                        case "District":
                                            return "Zone";
                                        default:
                                            return "";
                                    }
                                })()}
                                name="dropdata"
                                options={option}
                            />
                        )}
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
