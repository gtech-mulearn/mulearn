import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { patchCountryData } from "./apis/CountryAPI";
import { patchStateData } from "./apis/StateAPI";
import { patchZoneData } from "./apis/ZoneAPI";
import { patchDistrictData } from "./apis/DistrictAPI";
import { useToast } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const EditLocation = () => {
    const [selectedItem, setSelectedItem] = useState("");
    const [activeItem, setActiveItem] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedZone, setSelectedZone] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    useEffect(() => {
        setSelectedItem(location.state.name);
        setActiveItem(location.state.activeItem);
        setSelectedCountry(location.state.country);
        setSelectedState(location.state.state);
        setSelectedZone(location.state.zone);
    }, []);

    function handleSubmitEdit(values: any) {
        if (selectedItem === values.ItemName) {
            toast({
                title: "No Changes Made",
                status: "warning",
                duration: 3000,
                isClosable: true
            });
        } else {
            if (activeItem === "Country") {
                patchCountryData(location.state.value, values.ItemName);
            } else if (activeItem === "State") {
                patchStateData(
                    selectedCountry,
                    location.state.value,
                    values.ItemName
                );
            } else if (activeItem === "Zone") {
                patchZoneData(
                    selectedCountry,
                    selectedState,
                    location.state.value,
                    values.ItemName
                );
            } else if (activeItem === "District") {
                patchDistrictData(location.state.value, values.ItemName);
            }
            toast({
                title: "Interest Group Updated",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        }
        navigate("/dashboard/manage-locations", {
            state: { activeItem: activeItem }
        });
    }

    return (
        <div className="popup_container">
            <div className={styles.container}>
                <div className="popup_top_container">
                    <h1 className="popup_title">Edit {activeItem}</h1>
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
                    enableReinitialize={true}
                    initialValues={{
                        ItemName: selectedItem
                    }}
                    validationSchema={Yup.object({
                        ItemName: Yup.string()
                            .max(30, "Must be 30 characters or less")
                            .required("Required")
                    })}
                    onSubmit={values => {
                        console.log(values.ItemName);
                        handleSubmitEdit(values);
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
                            <MuButton
                                text={"Decline"}
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate("/dashboard/manage-locations", {
                                        state: {
                                            activeItem: activeItem,
                                            isDeclined: true
                                        }
                                    });
                                }}
                            />
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

export default EditLocation;
