import { useState, useEffect } from "react";
import Select from "react-select";
import { hasRole } from "@/MuLearnServices/common_functions";
import { roles } from "@/MuLearnServices/types";
import {
    getCountry,
    getStates,
    getZones,
    getDistricts,
    getAffiliation
} from "./apis";
import { useNavigate } from "react-router-dom";
import Textfield from "@/MuLearnComponents/TextField/Textfield";

import { useToast } from "@chakra-ui/react";

import "./Organizations.scss";
import { useFormData } from "./FormDataUtils";

interface Option {
    value: string;
    label: string;
}

interface CollegeFormProps {
    isCreate: boolean;
    activeItem: string;

    inputName?: string;
    inputCode?: string;
    selectedCountry?: string;
    selectedState?: string;
    selectedZone?: string;
    selectedDistrict?: string;
    selectedAffiliation?: string;
}

const FormData = ({ ...props }: CollegeFormProps) => {
    const { resetStates, handleSubmit, formStructure } = useFormData(props);
    return (
        <>
            {formStructure.map(formItem => {
                if (formItem?.element === "input") {
                    return (
                        <div className="inputfield_container">
                            <Textfield
                                content={formItem?.content}
                                inputType="text"
                                setInput={formItem?.setInput}
                                input={formItem?.content}
                                style={{
                                    width: "100%"
                                }}
                            />
                        </div>
                    );
                }
                if (formItem?.element === "select") {
                    return (
                        <div className="inputfield_container">
                            <p>{formItem?.content}</p>
                            <Select
                                value={formItem.value}
                                onChange={formItem?.onChange}
                                options={formItem?.options}
                            />
                        </div>
                    );
                }
            })}
            <div className="inputfield_container grid-container">
                <div className="btn light-btn" onClick={resetStates}>
                    Decline
                </div>
                <div className="btn blue-btn" onClick={handleSubmit}>
                    Submit
                </div>
            </div>
        </>
    );
};

export default FormData;
