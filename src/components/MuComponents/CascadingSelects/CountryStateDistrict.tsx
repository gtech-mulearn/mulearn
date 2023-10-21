// CascadingSelects.tsx
import React from "react";
import Select from "react-select";

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
    onDistrictChange
}) => {
	const [blurStatus, setBlurStatus] = React.useState<BlurStatus>({
        country: false,
        state: false,
        district: false
    });
    return (
        <>
            <label>
                Country:
                <Select
                    options={countries}
                    isLoading={loadingCountries}
                    value={selectedCountry}
                    onChange={value => onCountryChange(value)}
                    onBlur={() => {
                        setBlurStatus(prev => ({ ...prev, country: true }));
                    }}
                />
                {blurStatus.country && !selectedCountry && (
                    <span style={{ color: "red" }}>Required</span>
                )}
            </label>

            <label>
                State:
                <Select
                    options={states}
                    isLoading={loadingStates}
                    value={selectedState}
                    onChange={value => onStateChange(value)}
                    onBlur={() => {
                        setBlurStatus(prev => ({ ...prev, state: true }));
                    }}
                />
                {blurStatus.state && !selectedState && (
                    <span style={{ color: "red" }}>Required</span>
                )}
            </label>

            <label>
                District:
                <Select
                    options={districts}
                    isLoading={loadingDistricts}
                    value={selectedDistrict}
                    onChange={value => onDistrictChange(value)}
                    onBlur={() => {
                        setBlurStatus(prev => ({ ...prev, district: true }));
                    }}
                />
                {blurStatus.district && !selectedDistrict && (
                    <span style={{ color: "red" }}>Required</span>
                )}
            </label>
        </>
    );
};

export default CountryStateDistrict;
