import styles from "@/MuLearnComponents/FormikComponents/FormComponents.module.css";
import { hasRole } from "@/MuLearnServices/common_functions";
import { roles } from "@/MuLearnServices/types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getInfo } from "./apis";
import orgStyles from './Organizations.module.css'

import FormData from "./FormData";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

function EditOrganization() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    const { activeItem, rowId } = location.state;

    const [inputName, setInputName] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedZone, setSelectedZone] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedAffiliation, setSelectedAffiliation] = useState("");

    useEffect(() => {
        if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate("/404");

        getInfo(rowId)
            .then(data => {
                setInputName(data.title);
                setInputCode(data.code);
                setSelectedCountry(data.country);
                setSelectedState(data.state);
                setSelectedZone(data.zone);
                setSelectedDistrict(data.district);
                setSelectedAffiliation(data.affiliation);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const RenderFormData = ({ activeItem }: any) => {
        switch (activeItem) {
            case "Colleges":
                return (
                    <FormData
                        isCreate={false}
                        activeItem="College"
                        inputName={inputName}
                        inputCode={inputCode}
                        selectedCountry={selectedCountry}
                        selectedState={selectedState}
                        selectedZone={selectedZone}
                        selectedDistrict={selectedDistrict}
                        selectedAffiliation={selectedAffiliation}
                    />
                );
            case "Companies":
                return (
                    <FormData
                        isCreate={false}
                        activeItem="Company"
                        inputName={inputName}
                        inputCode={inputCode}
                        selectedCountry={selectedCountry}
                        selectedState={selectedState}
                        selectedZone={selectedZone}
                        selectedDistrict={selectedDistrict}
                    />
                );
            case "Communities":
                return (
                    <FormData
                        isCreate={false}
                        activeItem="Community"
                        inputName={inputName}
                        inputCode={inputCode}
                        selectedCountry={selectedCountry}
                        selectedState={selectedState}
                        selectedZone={selectedZone}
                        selectedDistrict={selectedDistrict}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            {loading ? (
                <div className={styles.loader_container}>
                    <MuLoader />
                </div>
            ) : (
                <div className={orgStyles.popupContainer}>
                    <div className={styles.container}>
                        <div className={orgStyles.popupTopContainer}>
                            <h1 className={orgStyles.popupTitle}>Edit {activeItem}</h1>
                            <i
                                className="fi fi-sr-cross"
                                onClick={() => {
                                    navigate("/organizations");
                                }}
                            ></i>
                        </div>
                        <p>
                            Kindly review the provided details and make sure
                            that they are correct. Once you have verified the
                            information, please click the <span>Confirm</span>
                            button to proceed for further process.
                        </p>
                        <RenderFormData activeItem={activeItem} />
                    </div>
                </div>
            )}
        </>
    );
}

export default EditOrganization;