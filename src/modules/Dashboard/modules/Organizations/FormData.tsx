import { FormikTextInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { MuButton, PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { hasRole } from "@/MuLearnServices/common_functions";
import { roles } from "@/MuLearnServices/types";
import { useToast } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import {
    createOrganization,
    getAffiliation,
    getCountry,
    getDistricts,
    getStates,
    getZones,
    updateOrganization
} from "./apis";

import { useRef } from "react";
import orgStyles from "./Organizations.module.css";

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
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const [selectionStatus, setSelectionStatus] = useState({
        isCountrySelected: true,
        isStateSelected: false,
        isZoneSelected: false,
        isDistrictSelected: false
    });

    const navigate = useNavigate();
    const toast = useToast();

    const myRef = useRef(false);
    const strSwap = (
        uuid: string,
        type: "Country" | "State" | "District" | "Zone"
    ) => {
        switch (type) {
            case "Country":
                break;

            default:
                break;
        }
    };
    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard/organizations");
        }
        if (isLoading) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    });

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

    const org_type = props.activeItem;
    
    const handleSubmit = (Name: string, Code: string) => {
      
        interface SelectBodyProps {
            Name: string;
            Code: string;
            country: string;
            state: string;
            zone: string;
            district: string;
            org_type: string;
            toast: any;
        }

        const createOrUpdateOrganization = (
            params: SelectBodyProps,
            isCreate: boolean,
            affiliation?: string
        ) => {
           
            const { org_type, toast } = params;

            if (isCreate) {
                if (org_type === "College") {
                    createOrganization(
                        Name,
                        Code,
                        country.value,
                        state.value,
                        zone.value,
                        district.value,
                        org_type,
                        toast,
                        affiliation,
                        setIsSuccess,
                        setIsLoading
                    );
                } else {
                    createOrganization(
                        Name,
                        Code,
                        country.value,
                        state.value,
                        zone.value,
                        district.value,
                        org_type,
                        toast,
                        "",
                        setIsSuccess,
                        setIsLoading
                    );
                }
            } else {
                if (org_type === "College") {
                    updateOrganization(
                        Name,
                        Code,
                        oldCode,
                        country.value,
                        state.value,
                        zone.value,
                        district.value,
                        org_type,
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
                        country.value,
                        state.value,
                        zone.value,
                        district.value,
                        org_type,
                        toast,
                        "",
                        setIsSuccess,
                        setIsLoading
                    );
                }
            }
            setIsLoading(false);
        };

        const SelectBody = (item: string) => {
            const params: SelectBodyProps = {
                Name,
                Code,
                country: country.value || props.selectedCountry,
                state: state.value || props.selectedState,
                zone: zone.value || props.selectedZone,
                district: district.value || props.selectedDistrict,
                org_type,
                toast
            };

            createOrUpdateOrganization(
                params,
                props.isCreate,
                affiliation.value
            );
        };

        SelectBody(org_type);
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
            setOldCode(props.inputCode || "");
            setSelectedCountry(props.selectedCountry || "");
            setSelectedState(props.selectedState || "");
            setSelectedZone(props.selectedZone || "");
            setSelectedDistrict(props.selectedDistrict || "");
            setSelectedAffiliation(props.selectedAffiliation || "");

            if (props.selectedCountry) {
                getStates(
                    camelCase(props.selectedCountry),
                    setStatesData,
                    toast
                );
            }

            if (props.selectedAffiliation) {
                getAffiliation(camelCase(props.selectedAffiliation));
            }

            if (props.selectedCountry && props.selectedState) {
                getZones(
                    camelCase(props.selectedCountry),
                    camelCase(props.selectedState),
                    setZonesData,
                    toast
                );
            }

            if (
                props.selectedCountry &&
                props.selectedState &&
                props.selectedZone &&
                props.selectedZone !== ""
            ) {
                getDistricts(
                    camelCase(props.selectedCountry),
                    camelCase(props.selectedState),
                    camelCase(props.selectedZone),
                    setDistrictsData,
                    toast
                );
            }
        }
    }, []);

    useEffect(() => {
        if (!props.isCreate) {
            if (
                props.activeItem == "College" &&
                country.value?.toLowerCase() !==
                    selectedCountry?.toLowerCase() &&
                country !== ""
            ) {
                getStates(camelCase(selectedCountry), setStatesData, toast);
            }
            if (
                country.value?.toLowerCase() !==
                    selectedCountry?.toLowerCase() &&
                country !== ""
            ) {
                getStates(camelCase(selectedCountry), setStatesData, toast);
            }
            if (
                state.value?.toLowerCase() !== selectedState?.toLowerCase() &&
                state !== ""
            ) {
                getZones(
                    camelCase(props.selectedCountry || country.value),
                    camelCase(state.value),
                    setZonesData,
                    toast
                );
                setZonesData([]);
                setDistrictsData([]);
            }

            if (
                zone.value?.toLowerCase() !== selectedZone?.toLowerCase() &&
                selectedZone !== "" &&
                zone !== ""
            ) {
                getDistricts(
                    camelCase(props.selectedCountry || country.value),
                    camelCase(props.selectedState || state.value),
                    camelCase(zone.value),
                    setDistrictsData,
                    toast
                );
            }
        }
    }, [country, state, zone, district]);

    useEffect(() => {
        if (country !== "") {
            getStates(camelCase(country.value), setStatesData, toast);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (state !== "") {
            getZones(
                camelCase(country.value || props.selectedCountry),
                camelCase(state.value),
                setZonesData,
                toast
            );
        }
    }, [selectedState]);

    useEffect(() => {
        if (zone !== "" && zone.value !== undefined) {
            getDistricts(
                camelCase(country.value || props.selectedCountry),
                camelCase(state.value || props.selectedState),
                camelCase(zone.value),
                setDistrictsData,
                toast
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
            console.log(option);
            setAffiliation(option);
            setSelectedAffiliation(option.value as string);
        }
    };

    const handleStateChange = (option: any) => {
        if (option) {
            setZone([]);
            setSelectedZone("");
            setSelectedDistrict("");
            setState(option);
            setSelectedState(option.value as string);
        }
    };

    const handleZoneChange = (option: any) => {
        if (option) {
            setZone(option);
            setSelectedZone(option.value as string);
            setSelectedDistrict("");
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
                    Affiliation: props.selectedAffiliation || "",
                    State: state.value || "",
                    Zone: zone.value || "",
                    District: district.value || ""
                   
                }}
                validationSchema={Yup.object({
                    Name: Yup.string()
                        .max(120, "Must be 120 characters or less")
                        .required("Required"),
                    Code: Yup.string()
                        .max(30, "Must be 30 characters or less")
                        .required("Required"),
                    Country: Yup.string().required("Required"),
                    State: Yup.string().required("Required"),
                    Zone: Yup.string().required("Required"),
                    District: Yup.string().required("Required"),
                    Affiliation: Yup.string().required("Required")
                })}
                onSubmit={values => {
                    setIsLoading(true);
                    
                    handleSubmit(values.Name, values.Code);
                }}
            >
                <Form className={orgStyles.popupDropdownContainer}>
                    <div className={orgStyles.inputFieldContainer}>
                        <FormikTextInput
                            label={`${props.activeItem} Name`}
                            name="Name"
                            type="text"
                            placeholder="Enter a name"
                        />
                    </div>
                    <div className={orgStyles.inputFieldContainer}>
                        <FormikTextInput
                            label="Code"
                            name="Code"
                            type="text"
                            placeholder="Enter Code"
                        />
                    </div>
                    {props.activeItem === "College" ? (
                        <div className={orgStyles.inputFieldContainer}>
                            <p>Affiliated University</p>
                            <Select
                                value={affiliationData?.find(
                                    affiliation =>
                                        affiliation.value ===
                                        selectedAffiliation
                                )}
                                name="Affiliation"
                                onChange={handleAffiliationChange}
                                options={affiliationData}
                                required
                            />
                        </div>
                    ) : null}
                    <div className={orgStyles.inputFieldContainer}>
                        <p>Country</p>
                        <Select
                            value={countryData?.find(
                                country =>
                                    country.value ===
                                    selectedCountry.toLowerCase()
                            )}
                            name="Country"
                            onChange={handleCountryChange}
                            options={countryData}
                            required
                        />
                    </div>
                    <div className={orgStyles.inputFieldContainer}>
                        <p>State</p>
                        <Select
                            value={statesData?.find(
                                state =>
                                    state.value === selectedState.toLowerCase()
                            )}
                            name="State"
                            onChange={handleStateChange}
                            options={statesData}
                            required
                           
                        />
                    </div>
                    <div className={orgStyles.inputFieldContainer}>
                        <p>Zone</p>
                        <Select
                            value={
                                selectedZone.length > 0 &&
                                zonesData?.find(
                                    zone =>
                                        zone.value ===
                                        selectedZone.toLowerCase()
                                )
                            }
                            name="Zone"
                            onChange={handleZoneChange}
                            options={zonesData}
                            required
                        />
                    </div>
                    <div className={orgStyles.inputFieldContainer}>
                        <p>District</p>
                        <Select
                            value={
                                selectedDistrict.length > 0 &&
                                districtsData?.find(
                                    district =>
                                        district.value ===
                                        selectedDistrict.toLowerCase()
                                )
                            }
                            name="District"
                            onChange={handleDistrictChange}
                            options={districtsData}
                            required
                        />
                    </div>
                    <div
                        className={`${orgStyles.inputFieldContainer} grid-container`}
                    >
                        <PowerfulButton
                            type="button"
                            className="btn light-btn"
                            onClick={() => {
                                navigate("/dashboard/organizations");
                            }}
                        >Decline</PowerfulButton>
                        <button
                            type="submit"
                            className="btn blue-btn"
                            disabled={isDisabled}
                        >
                            Submit
                            {isLoading ? (
                                <ClipLoader
                                    size={20}
                                    color="#fff"
                                    className={orgStyles.btnLoader}
                                />
                            ) : null}
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    );
};

function sleep(arg0: number) {
    throw new Error("Function not implemented.");
}
export default FormData;
