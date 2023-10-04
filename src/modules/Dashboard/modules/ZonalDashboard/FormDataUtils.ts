import { hasRole } from "@/MuLearnServices/common_functions";
import { roles } from "@/MuLearnServices/types";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    getCountry,
    getAffiliation,
    getStates,
    getZones,
    getDistricts
} from "./apis";

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

const useFormData = (props: CollegeFormProps) => {
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
            toast: ToastAsPara;
        }

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
        };

        SelectBody(orgType);
        navigate("/district-dashboard");
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

    const formStructure: Array<{
        element: string;
        content: string;
        inputType?: string;
        setInput?: any;
        input?: string;
        options?: any[];
        onChange?: any;
        value?: any;
    } | null> = [
        {
            element: "input",
            content: `${props.activeItem} Name`,
            inputType: "text",
            setInput: setInputName,
            input: inputName
        },
        {
            element: "input",
            content: `Code`,
            inputType: "text",
            setInput: setInputCode,
            input: inputCode
        },
        props.activeItem === "College"
            ? {
                  element: "select",
                  content: "Affiliated University",
                  options: affiliationData,
                  onChange: handleAffiliationChange,
                  value: affiliationData.find(
                      afl => afl.value === selectedAffiliation
                  )
              }
            : null,
        {
            element: "select",
            content: "Country",
            options: countryData,
            onChange: handleCountryChange,
            value: countryData.find(cntry => cntry.value === selectedCountry)
        },
        {
            element: "select",
            content: "State",
            options: statesData,
            onChange: handleStateChange,
            value: statesData.find(st => st.value === selectedState)
        },
        {
            element: "select",
            content: "Zone",
            options: zonesData,
            onChange: handleZoneChange,
            value: zonesData.find(zn => zn.value === selectedZone)
        },
        {
            element: "select",
            content: "District",
            options: districtsData,
            onChange: handleDistrictChange,
            value: districtsData.find(dist => dist.value === selectedDistrict)
        }
    ];

    return { resetStates, handleSubmit, formStructure };
};

export { useFormData };
