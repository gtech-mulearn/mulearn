import { useState, useEffect } from "react";
import {
    getCountryOptions,
    getDistrictOptions,
    getStateOptions
} from "./LocationApi";

interface LocationData {
    countries: Array<{ label: string; value: string }>;
    states: Array<{ label: string; value: string }>;
    districts: Array<{ label: string; value: string }>;
    selectedCountry: { label: string; value: string } | null;
    selectedState: { label: string; value: string } | null;
    selectedDistrict: { label: string; value: string } | null;
}

type InitialLocationData = {
    country: { label: string; value: string };
    state: { label: string; value: string };
    district: { label: string; value: string };
} | null;

const useLocationData = (initialData: InitialLocationData = null) => {
    const [locationData, setLocationData] = useState<LocationData>({
        countries: [],
        states: [],
        districts: [],
        selectedCountry: null,
        selectedState: null,
        selectedDistrict: null
    });

    const [loadingCountries, setLoadingCountries] = useState(true);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingDistricts, setLoadingDistricts] = useState(false);

    useEffect(() => {
        // Prefill countries (they are always fetched)
        if (!loadingCountries && initialData?.country) {
            handleCountryChange(initialData.country);
        }
    }, [loadingCountries, initialData?.country]);

    useEffect(() => {
        // Prefill states if country is already selected
        if (
            !loadingStates &&
            locationData.selectedCountry &&
            initialData?.state
        ) {
            handleStateChange(initialData.state);
        }
    }, [loadingStates, locationData.selectedCountry, initialData?.state]);

    useEffect(() => {
        // Prefill districts if state is already selected
        if (
            !loadingDistricts &&
            locationData.selectedState &&
            initialData?.district
        ) {
            handleDistrictChange(initialData.district);
        }
    }, [loadingDistricts, locationData.selectedState, initialData?.district]);

    useEffect(() => {
        // Fetch countries initially
        const loadCountries = async () => {
            try {
                const countries = await getCountryOptions();
                setLocationData(prev => ({ ...prev, countries }));
            } catch (error) {
                console.error("Failed to fetch countries", error);
            } finally {
                setLoadingCountries(false);
            }
        };

        loadCountries();
    }, []);

    const handleCountryChange = async (
        value: { label: string; value: string } | null
    ) => {
        setLocationData(prev => ({
            ...prev,
            selectedCountry: value,
            states: [],
            selectedState: null,
            districts: [],
            selectedDistrict: null
        }));

        if (value) {
            setLoadingStates(true);
            try {
                const states = await getStateOptions(value.value);
                setLocationData(prev => ({ ...prev, states }));
            } catch (error) {
                console.error("Failed to fetch states", error);
            } finally {
                setLoadingStates(false);
            }
        }
    };

    const handleStateChange = async (
        value: { label: string; value: string } | null
    ) => {
        setLocationData(prev => ({
            ...prev,
            selectedState: value,
            districts: [],
            selectedDistrict: null
        }));

        if (value) {
            setLoadingDistricts(true);
            try {
                const districts = await getDistrictOptions(value.value);
                setLocationData(prev => ({ ...prev, districts }));
            } catch (error) {
                console.error("Failed to fetch districts", error);
            } finally {
                setLoadingDistricts(false);
            }
        }
    };

    const handleDistrictChange = (
        value: { label: string; value: string } | null
    ) => {
        setLocationData(prev => ({ ...prev, selectedDistrict: value }));
    };

    return {
        locationData,
        loadingCountries,
        loadingStates,
        loadingDistricts,
        handleCountryChange,
        handleStateChange,
        handleDistrictChange
    };
};

export default useLocationData;
