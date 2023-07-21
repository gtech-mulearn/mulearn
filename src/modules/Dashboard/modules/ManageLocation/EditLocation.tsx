
import styles from "../../../../components/MuComponents/FormikComponents/FormComponents.module.css";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "../../../../components/MuComponents/FormikComponents/FormikComponents";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";
<<<<<<< HEAD
import { putCountryData } from "./apis/CountryAPI";
import { putStateData } from "./apis/StateAPI";
import { putZoneData } from "./apis/ZoneAPI";
import { putDistrictData } from "./apis/DistrictAPI";
import { useStatStyles, useToast } from "@chakra-ui/react";
=======
import { putCountryData } from "./apis";
import { useToast } from "@chakra-ui/react";
>>>>>>> 528cb6913cfaff7b93847f3d16c436b1b6a3f70e
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";

const EditLocation = () => {

    const[selectedItem,setSelectedItem] = useState("")
    const[activeItem,setActiveItem] = useState("")
    const[selectedCountry,setSelectedCountry] = useState("")
    const[selectedState,setSelectedState] = useState("")
    const[selectedZone,setSelectedZone] = useState("")


    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();   

    useEffect(()=>{
        setSelectedItem(location.state.value)
        setActiveItem(location.state.activeItem)
        setSelectedCountry(location.state.country)
        setSelectedState(location.state.state)
        setSelectedZone(location.state.zone)
    },[])

    function handleSubmitEdit(values:any){
        if(selectedItem === values.ItemName){
            toast({
                title: "No Changes Made",
                status: "warning",
                duration: 3000,
                isClosable: true
            });
            navigate('/manage-locations');
        }else{
            if(activeItem === "Country"){
                putCountryData(selectedItem,values.ItemName);
            }
            else if(activeItem === "State"){
                putStateData(selectedCountry,selectedItem,values.ItemName)
                alert("state edited")
            }
            else if(activeItem === "Zone"){
                putZoneData(selectedCountry,selectedState,selectedItem,values.ItemName)
                alert("zone edited")
            }
            else if(activeItem === "District"){
                putDistrictData(selectedCountry,selectedState,selectedZone,selectedItem,values.ItemName)
                alert("district edited")
            }
            toast({
                title: "Interest Group Updated",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            navigate('/manage-locations');
        }
    }

    return (
        <div className="popup_container">
            <div className={styles.container}>
                <div className="popup_top_container">
                    <h1 className="popup_title">Edit {activeItem}</h1>
                    <i
                        className="fi fi-sr-cross"
                        onClick={() => {
                            navigate('/manage-locations');
                        }}
                    ></i>
                </div>
                <p>Kindly review the provided details and make sure that they are correct.
                    Once you have verified the information, please click the <span>Confirm</span>
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
                        />

                        {/* <MySelect label="Job Type" name="jobType">
                            <option value="">Select a job type</option>
                            <option value="designer">Designer</option>
                            <option value="development">Developer</option>
                            <option value="product">Product Manager</option>
                            <option value="other">Other</option>
                        </MySelect>

                        <MyCheckbox name="acceptedTerms">
                            I accept the terms and conditions
                        </MyCheckbox> */}
                        <div className="ml_popup_btn_container">
                            <MuButton
                                text={"Decline"}
                                className={styles.btn_cancel}
                                onClick={() => {
                                    navigate('/manage-locations');
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
    )
}

export default EditLocation