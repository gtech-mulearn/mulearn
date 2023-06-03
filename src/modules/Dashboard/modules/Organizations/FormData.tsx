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

import { createOrganization, updateOrganization } from "./apis";
import { useToast } from "@chakra-ui/react";

import "./Organizations.scss";

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
    const [inputName, setInputName] = useState("");
    const [inputCode, setInputCode] = useState("");

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

    const navigate = useNavigate();
    const toast = useToast();

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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // resetStates()
        interface SelectBodyProps {
            inputName: string;
            inputCode: string;
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
                inputName,
                inputCode,
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
                        inputName,
                        inputCode,
                        camelCase(country),
                        camelCase(state),
                        camelCase(zone),
                        camelCase(district),
                        orgType,
                        toast,
                        affiliation,
                        setIsSuccess
                    );
                } else {
                    createOrganization(
                        inputName,
                        inputCode,
                        camelCase(country),
                        camelCase(state),
                        camelCase(zone),
                        camelCase(district),
                        orgType,
                        toast
                    );
                }
            } else {
                if (orgType === "College") {
                    updateOrganization(
                        inputName,
                        inputCode,
                        camelCase(country),
                        camelCase(state),
                        camelCase(zone),
                        camelCase(district),
                        orgType,
                        toast,
                        affiliation
                    );
                } else {
                    updateOrganization(
                        inputName,
                        inputCode,
                        camelCase(country),
                        camelCase(state),
                        camelCase(zone),
                        camelCase(district),
                        orgType,
                        toast
                    );
                }
            }
        };

        const SelectBody = (item: string) => {
            const params: SelectBodyProps = {
                inputName,
                inputCode,
                country: country.value,
                state: state.value,
                zone: zone.value,
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
        console.log("Success Status-->", isSuccess);
        navigate("/organizations");
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
            setSelectedCountry(props.selectedCountry || "");
            setSelectedState(props.selectedState || "");
            setSelectedZone(props.selectedZone || "");
            setSelectedDistrict(props.selectedDistrict || "");
            setSelectedAffiliation(props.selectedAffiliation || "");

            if (props.selectedCountry) {
                getStates(camelCase(props.selectedCountry), setStatesData);
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
        if (country !== "") {
            getStates(camelCase(country.value), setStatesData);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (state !== "") {
            getZones(
                camelCase(country.value),
                camelCase(state.value),
                setZonesData
            );
        }
    }, [selectedState]);

    useEffect(() => {
        if (state !== "") {
            getDistricts(
                camelCase(country.value),
                camelCase(state.value),
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
            <div className="inputfield_container">
                <Textfield
                    content={`${props.activeItem} Name`}
                    inputType="text"
                    setInput={setInputName}
                    input={inputName}
                    style={{
                        width: "100%"
                    }}
                />
            </div>
            <div className="inputfield_container">
                <Textfield
                    content="Code"
                    inputType="text"
                    setInput={setInputCode}
                    input={inputCode}
                    style={{
                        width: "100%"
                    }}
                />
            </div>
            {props.activeItem === "College" ? (
                <div className="inputfield_container">
                    <p>Affiliated University</p>
                    <Select
                        value={affiliationData.find(
                            affiliation =>
                                affiliation.value === selectedAffiliation
                        )}
                        onChange={handleAffiliationChange}
                        options={affiliationData}
                    />
                </div>
            ) : null}

            <div className="inputfield_container">
                <p>Country</p>
                <Select
                    value={countryData.find(
                        country => country.value === selectedCountry
                    )}
                    onChange={handleCountryChange}
                    options={countryData}
                />
            </div>
            <div className="inputfield_container">
                <p>State</p>
                <Select
                    value={statesData.find(
                        state => state.value === selectedState
                    )}
                    onChange={handleStateChange}
                    options={statesData}
                />
            </div>
            <div className="inputfield_container">
                <p>Zone</p>
                <Select
                    value={zonesData.find(zone => zone.value === selectedZone)}
                    onChange={handleZoneChange}
                    options={zonesData}
                />
            </div>
            <div className="inputfield_container">
                <p>District</p>
                <Select
                    value={districtsData.find(
                        district => district.value === selectedDistrict
                    )}
                    onChange={handleDistrictChange}
                    options={districtsData}
                />
            </div>
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
