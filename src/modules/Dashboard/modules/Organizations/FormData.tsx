import { useState, useEffect } from "react";
import Select from "react-select";
import { hasRole } from "../../../../services/common_functions";
import { roles } from "../../../../services/types";
import {
    getCountry,
    getStates,
    getZones,
    getDistricts,
    getAffiliation
} from "./apis";
import { useNavigate } from "react-router-dom";
import Textfield from "../../../../components/MuComponents/TextField/Textfield";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { createOrganization, updateOrganization } from "./apis";
import { useToast } from "@chakra-ui/react";
import { FormikTextInput } from "../../../../components/MuComponents/FormikComponents/FormikComponents";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";
import { ClipLoader } from "react-spinners";

import "./Organizations.scss";
import { useRef } from 'react';

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

// export let myState = false; // Initial value

// export const setMyState = (newValue:boolean) => {
//   myState = newValue;
// };





const FormData = ({ ...props }: CollegeFormProps) => {
    const [inputName, setInputName] = useState("");
    const [inputCode, setInputCode] = useState("");
    const [oldCode, setOldCode] = useState("");

    const [affiliation, setAffiliation] = useState<any>("");
    const [country, setCountry] = useState<any>("");
    const [state, setState] = useState<any>("");
    const [district, setDistrict] = useState<any>("");
    const [zone, setZone] = useState<any>("");
    const [affiliatedUniversity, setAffiliatedUniversity] = useState("");

    const [affiliationData, setAffiliationData] = useState<any[]>([]);
    const [countryData, setCountryData] = useState<any[]>([]);
    const [statesData, setStatesData] = useState<any[]>([]);
    const [zonesData, setZonesData] = useState<any[]>([]);
    const [districtsData, setDistrictsData] = useState<any[]>([]);

    const [selectedAffiliation, setSelectedAffiliation] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedZone, setSelectedZone] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    const [isCountryDataLoaded, setIsCountryDataLoaded] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const [selectionStatus, setSelectionStatus] = useState({
        isCountrySelected: true,
        isStateSelected: false,
        isZoneSelected: false,
        isDistrictSelected: false
    })


    const navigate = useNavigate();
    const toast = useToast();


    const myRef = useRef(false);

    useEffect(() => {
        if (isSuccess) {
            navigate('/organizations')
        }
        if (isLoading) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    })

    function camelCase(str: string) {
        return str?.replace(
            /\b[A-Z]+\b/g,
            match => match.charAt(0) + match.slice(1).toLowerCase()
        );
    }

    const resetStates = () => {
        setInputName("");
        setInputCode("");
    };

    const orgType = props.activeItem;


    const handleSubmit = (Name: string, Code: string) => {
        // e.preventDefault();
        // resetStates()
        interface SelectBodyProps {
            Name: string,
            Code: string,
            country: string;
            state: string;
            zone: string;
            district: string;
            orgType: string;
            toast: any;
        }

        const createOrUpdateOrganization = (
            params: SelectBodyProps,
            isCreate: boolean,
            affiliation?: string
        ) => {
            const {
                country,
                state,
                zone,
                district,
                orgType,
                toast
            } = params;

            if (isCreate) {
                if (orgType === "College") {
                    createOrganization(
                        Name,
                        Code,
                        camelCase(country),
                        camelCase(state),
                        camelCase(zone),
                        camelCase(district),
                        orgType,
                        toast,
                        affiliation,
                        setIsSuccess,
                        setIsLoading,
                    );
                } else {
                    createOrganization(
                        Name,
                        Code,
                        camelCase(country),
                        camelCase(state),
                        camelCase(zone),
                        camelCase(district),
                        orgType,
                        toast,
                        "",
                        setIsSuccess,
                        setIsLoading
                    );
                }
            } else {
                if (orgType === "College") {
                    updateOrganization(
                        Name,
                        Code,
                        oldCode,
                        camelCase(country),     
                        camelCase(state),
                        camelCase(zone),
                        camelCase(district),
                        orgType,
                        toast,
                        affiliation,
                        setIsSuccess,
                        setIsLoading
                    );
                } else {
                    updateOrganization(
                        Name,
                        Code,
                        oldCode,
                        camelCase(country),
                        camelCase(state),
                        camelCase(zone),
                        camelCase(district),
                        orgType,
                        toast,
                        "",
                        setIsSuccess,
                        setIsLoading
                    );
                }
            }
            setIsLoading(false)
        };

        const SelectBody = (item: string) => {
            const params: SelectBodyProps = {
                Name,
                Code,
                country: country.value || props.selectedCountry,
                state: state.value || props.selectedState,
                zone: zone.value || props.selectedZone,
                district: district.value,
                orgType,
                toast
            };

            createOrUpdateOrganization(
                params,
                props.isCreate,
                affiliation.value
            );
        };

        SelectBody(orgType);
        // console.log("Success Status-->", myRef.current);
    };

    useEffect(() => {
        if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate("/404");

        if (!isCountryDataLoaded) {
            getCountry(setCountryData);
            getAffiliation(setAffiliationData);
            setIsCountryDataLoaded(true);
        }

        if (!props.isCreate) {

            setInputName(props.inputName || "");
            setInputCode(props.inputCode || "");
            setOldCode(props.inputCode || "")
            setSelectedCountry(props.selectedCountry || "");
            setSelectedState(props.selectedState || "");
            setSelectedZone(props.selectedZone || "");
            setSelectedDistrict(props.selectedDistrict || "");
            setSelectedAffiliation(props.selectedAffiliation || "");

            if (props.selectedCountry) {
                getStates(camelCase(props.selectedCountry), setStatesData);
            }

            if(props.selectedAffiliation){
                getAffiliation(camelCase(props.selectedAffiliation))
            }

            if (props.selectedCountry && props.selectedState) {
                getZones(
                    camelCase(props.selectedCountry),
                    camelCase(props.selectedState),
                    setZonesData
                );
            }

            if (
                props.selectedCountry &&
                props.selectedState &&
                props.selectedZone
            ) {
                getDistricts(
                    camelCase(props.selectedCountry),
                    camelCase(props.selectedState),
                    camelCase(props.selectedZone),
                    setDistrictsData
                );
            }
        }
    }, []);

    useEffect(() => {
        if (!props.isCreate) {
            if(props.activeItem == "College"){
                getStates(camelCase(selectedCountry), setStatesData);
            }
            if (country.value?.toLowerCase() !== props.selectedCountry?.toLowerCase() && country !== "") {
                setZonesData([])
                setDistrictsData([])
                getStates(camelCase(selectedCountry), setStatesData);
            }
            if (state.value?.toLowerCase() !== props.selectedState?.toLowerCase() && state !== "") {
                setDistrictsData([])
                getZones(
                    camelCase(country.value),
                    camelCase(state.value),
                    setZonesData
                );
            }
            if (zone.value?.toLowerCase() !== props.selectedZone?.toLowerCase() && zone !== "") {
                getDistricts(
                    camelCase(props.selectedCountry || country),
                    camelCase(props.selectedState || state),
                    camelCase(zone.value),
                    setDistrictsData
                );
            }
        }
    }, [country, state, zone])

    useEffect(() => {
        if (country !== "") {
            getStates(camelCase(country.value), setStatesData);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (state !== "") {
            getZones(
                camelCase(country.value || props.selectedCountry),
                camelCase(state.value),
                setZonesData
            );
        }
    }, [selectedState]);

    useEffect(() => {
        if (zone !== "") {
            getDistricts(
                camelCase(country.value || props.selectedCountry),
                camelCase(state.value || props.selectedCountry),
                camelCase(zone.value),
                setDistrictsData
            );
        }
    }, [selectedZone]);

    const handleCountryChange = (option: any) => {
        if (option) {
            setCountry(option);
            setSelectedCountry(option.value as string);
        }
    };

    const handleAffiliationChange = (option: any) => {
        if (option) {
            setAffiliation(option);
            setSelectedAffiliation(option.value as string);
        }
    };

    const handleStateChange = (option: any) => {
        if (option) {
            setState(option);
            setSelectedState(option.value as string);
        }
    };

    const handleZoneChange = (option: any) => {
        if (option) {
            setZone(option);
            setSelectedZone(option.value as string);
        }
    };

    const handleDistrictChange = (option: any) => {
        if (option) {
            setDistrict(option);
            setSelectedDistrict(option.value as string);
        }
    };

    return (
        <>
            <Formik
                initialValues={{
                    Name: props.inputName || "",
                    Code: props.inputCode || "",
                    Country: country.value || "",
                    Affiliation: affiliation.value || ""                    // acceptedTerms: false, // added for our checkbox
                    // jobType: "" // added for our select
                }}
                validationSchema={Yup.object({
                    Name: Yup.string()
                        .max(30, "Must be 30 characters or less")
                        .required("Required"),
                    Code: Yup.string()
                        .max(30, "Must be 30 characters or less")
                        .required("Required")
                })}
                onSubmit={values => {
                    setIsLoading(true)
                    handleSubmit(values.Name, values.Code);
                }}
            >
                <Form className="popup_dropdown_container">
                    {/* <Textfield
                    content={`${props.activeItem} Name`}
                    inputType="text"
                    setInput={setInputName}
                    input={inputName}
                    style={{
                        width: "100%"
                    }}
                /> */}
                    <div className="inputfield_container">
                        <FormikTextInput
                            label={`${props.activeItem} Name`}
                            name="Name"
                            type="text"
                            placeholder="Enter a name"
                        />
                    </div>
                    <div className="inputfield_container">
                        <FormikTextInput
                            label="Code"
                            name="Code"
                            type="text"
                            placeholder="Enter Code"
                        />
                    </div>
                    {props.activeItem === "College" ? (
                        <div className="inputfield_container">
                            <p>Affiliated University</p>
                            <Select
                                value={affiliationData.find(
                                    affiliation => affiliation.value === selectedAffiliation
                                )}
                                name="Affiliation"
                                onChange={handleAffiliationChange}
                                options={affiliationData}
                                required
                            />
                        </div>
                    ) : null}
                    <div className="inputfield_container">
                        <p>Country</p>
                        <Select
                            value={countryData.find(
                                country => country.value === selectedCountry.toLowerCase()
                            )}
                            name="Country"
                            onChange={handleCountryChange}
                            options={countryData}
                            required
                        />
                    </div>
                    <div className="inputfield_container">
                        <p>State</p>
                        <Select
                            value={statesData.find(
                                state => state.value === selectedState.toLowerCase()
                            )}
                            onChange={handleStateChange}
                            options={statesData}
                            required
                        // isDisabled={props.isCreate && selectedCountry ? false : true }
                        />
                    </div>
                    <div className="inputfield_container">
                        <p>Zone</p>
                        <Select
                            value={zonesData.find(
                                zone => zone.value === selectedZone.toLowerCase()
                            )}
                            onChange={handleZoneChange}
                            options={zonesData}
                            required
                        />
                    </div>
                    <div className="inputfield_container">
                        <p>District</p>
                        <Select
                            value={districtsData.find(
                                district => district.value === selectedDistrict.toLowerCase()
                            )}
                            onChange={handleDistrictChange}
                            options={districtsData}
                            required
                        />
                    </div>
                    <div className="inputfield_container grid-container">
                        {/* <div className="btn light-btn" onClick={resetStates}>
                            Decline
                        </div> */}
                        <MuButton
                            text={"Decline"}
                            className="btn light-btn"
                            onClick={() => {
                                navigate("/organizations");
                            }}
                        />
                        <button type="submit" className="btn blue-btn" disabled={isDisabled}>
                            Submit
                            {
                                isLoading ? (<ClipLoader size={20} color="#fff" className="btn_loader" />) : null
                            }
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    );
};

export default FormData;
function sleep(arg0: number) {
    throw new Error("Function not implemented.");
}

