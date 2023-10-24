import styles from "../../../modules/Dashboard/utils/modalForm.module.css";
import React from "react";
import Select from "react-select";
import { customReactSelectStyles } from "../../../modules/Dashboard/utils/common";

interface Props {
    countries: Array<{ label: string; value: string }>;
    states: Array<{ label: string; value: string }>;
    districts: Array<{ label: string; value: string }>;

    selectedCountry: { label: string; value: string } | null;
    selectedState: { label: string; value: string } | null;
    selectedDistrict: { label: string; value: string } | null;

    loadingCountries: boolean;
    loadingStates: boolean;
    loadingDistricts: boolean;

    onCountryChange: (value: { label: string; value: string } | null) => void;
    onStateChange: (value: { label: string; value: string } | null) => void;
    onDistrictChange: (value: { label: string; value: string } | null) => void;

	notRequired?: boolean;
}

interface BlurStatus {
    country: boolean;
    state: boolean;
    district: boolean;
}

const CountryStateDistrict: React.FC<Props> = ({
    countries,
    states,
    districts,
    selectedCountry,
    selectedState,
    selectedDistrict,
    loadingCountries,
    loadingStates,
    loadingDistricts,
    onCountryChange,
    onStateChange,
    onDistrictChange,
	notRequired = false
}) => {
    const [blurStatus, setBlurStatus] = React.useState<BlurStatus>({
        country: false,
        state: false,
        district: false
    });
    return (
        <>
            <div className={styles.inputContainer}>
                <Select
                    placeholder="Country"
                    options={countries}
                    styles={customReactSelectStyles}
                    isClearable
                    isLoading={loadingCountries}
                    value={selectedCountry}
                    onChange={value => onCountryChange(value)}
                    onBlur={() => {
                        setBlurStatus(prev => ({ ...prev, country: true }));
                    }}
                />
                {!notRequired && blurStatus.country && !selectedCountry && (
                    <div style={{ color: "red" }}>Country is Required</div>
                )}
            </div>

            <div className={styles.inputContainer}>
                <Select
                    placeholder="State"
                    styles={customReactSelectStyles}
                    isClearable
                    options={states}
                    isLoading={loadingStates}
                    value={selectedState}
                    onChange={value => onStateChange(value)}
                    onBlur={() => {
                        setBlurStatus(prev => ({ ...prev, state: true }));
                    }}
                />
                {!notRequired && blurStatus.state && !selectedState && (
                    <div style={{ color: "red" }}>State is Required</div>
                )}
            </div>

            <div className={styles.inputContainer}>
                <Select
                    placeholder="District"
                    styles={customReactSelectStyles}
                    isClearable
                    options={districts}
                    isLoading={loadingDistricts}
                    value={selectedDistrict}
                    onChange={value => onDistrictChange(value)}
                    onBlur={() => {
                        setBlurStatus(prev => ({ ...prev, district: true }));
                    }}
                />
                {!notRequired && blurStatus.district && !selectedDistrict && (
                    <div style={{ color: "red" }}>District is Required</div>
                )}
            </div>
        </>
    );
};

export default CountryStateDistrict;
