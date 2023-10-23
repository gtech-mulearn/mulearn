import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "../../utils/modalForm.module.css";
import useLocationData from "@/MuLearnComponents/CascadingSelects/useLocationData";
import CountryStateDistrict from "@/MuLearnComponents/CascadingSelects/CountryStateDistrict";
import toast from "react-hot-toast";
import { addNewOrganization, editOrganization, getAffiliation, getOrganizationDetails } from "./apis";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";

type Props = { type: string; isEditMode: boolean; itemId: string };

type InitialLocationData = {
    country: { label: string; value: string };
    state: { label: string; value: string };
    district: { label: string; value: string };
} | null;

const OrgForm = forwardRef(
    (props: Props & { closeModal: () => void }, ref: any) => {
        const [initialData, setInitialData] =
            useState<InitialLocationData>(null);

        const {
            locationData,
            loadingCountries,
            loadingStates,
            loadingDistricts,
            handleCountryChange,
            handleStateChange,
            handleDistrictChange
        } = useLocationData(initialData);

        const [data, setData] = useState<OrgFormData>({
            affiliation: "",
            code: "",
            country: initialData?.country.value || "",
            district: initialData?.district.value || "",
            org_type: props.type,
            state: initialData?.state.value || "",
            title: ""
        });

        const [errors, setErrors] = useState<OrgFormErrors>({});

        //Fetch the initial data if in edit mode
        useEffect(() => {
            if (props.isEditMode) {
                // Replace this with your actual API call
                getOrganizationDetails(props.itemId).then(
                    (data: OrgInfo) => {
                        const initialData: InitialLocationData = {
                            country: {
                                label: data.country_name,
                                value: data.country_uuid
                            },
                            state: {
                                label: data.state_name,
                                value: data.state_uuid
                            },
                            district: {
                                label: data.district_name,
                                value: data.district_uuid
                            }
                        };
                        setInitialData(initialData);
						setData({
                            affiliation: data.affiliation_uuid,
                            code: data.code,
                            country: data.country_uuid,
                            district: data.district_uuid,
                            org_type: props.type,
                            state: data.state_uuid,
                            title: data.title
                        });
						setSelectedAffiliation({
							label: data.affiliation_name,
							value: data.affiliation_uuid
						})
                    }
                );
            }
        }, [props.isEditMode, props.itemId]);

        // //If initialData is null (not fetched yet), we can show a loading state
        // if (props.isEditMode && !initialData) {
        //     return <p>Loading...</p>;
        // }

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setData(prevData => ({ ...prevData, [name]: value }));
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            if (!value.trim()) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    [name]: `${
                        name.charAt(0).toUpperCase() + name.slice(1)
                    } is required`
                }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
            }
        };

        const [affiliations, setAffiliations] = useState<any[]>([]); // Add this state for fetched affiliations
        const [selectedAffiliation, setSelectedAffiliation] =
            useState<AffiliationOption | null>(null);
        const [blurStatus, setBlurStatus] = useState({ affiliation: false }); // Add this state for blur status

        useEffect(() => {
            getAffiliation(setAffiliations);
        }, []);

        //! useImperativeHandle for triggering submit from MuModal button
        useImperativeHandle(ref, () => ({
            handleSubmitExternally: handleSubmit
        }));

        const handleSubmit = (e?: React.FormEvent) => {
            e?.preventDefault();

            const updatedData = {
                ...data,
                affiliation: String(selectedAffiliation?.value),
                country: String(locationData.selectedCountry?.value),
                state: String(locationData.selectedState?.value),
                district: String(locationData.selectedDistrict?.value)
            };

            console.log(updatedData);

            // Validate form data
            let isValid = true;
            for (const key in updatedData) {
                if (
                    updatedData[key as keyof OrgFormData] === "" ||
                    updatedData[key as keyof OrgFormData] === "undefined"
                ) {
                    isValid = false;
                    setErrors(prevErrors => ({
                        ...prevErrors,
                        [key]: `${
                            key.charAt(0).toUpperCase() + key.slice(1)
                        } is required`
                    }));
                    toast.error(`Error: ${key} is required`);
                }
            }

            if (isValid) {
                console.log(updatedData);
                if (props.isEditMode) {
                    toast.promise(editOrganization(updatedData), {
                        loading: "Saving...",
                        success: () => {
                            props.closeModal();
                            return <b>Organization edited.</b>;
                        },
                        error: <b>Failed to edit organization</b>
                    });
                } else {
                    toast.promise(addNewOrganization(updatedData), {
                        loading: "Saving...",
                        success: () => {
                            props.closeModal();
                            return <b>Organization added</b>;
                        },
                        error: <b>Failed to add new organization</b>
                    });
                }
            }
        };

        return (
            <div className={styles.container}>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={data.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.title && (
                            <div style={{ color: "red" }}>{errors.title}</div>
                        )}
                    </div>

                    <div className={styles.inputContainer}>
                        <Select
                            styles={customReactSelectStyles}
                            options={affiliations}
                            isClearable
                            placeholder="Affiliation"
                            isLoading={!affiliations.length}
                            value={selectedAffiliation}
                            onChange={value => setSelectedAffiliation(value)}
                            onBlur={() => {
                                setBlurStatus(prev => ({
                                    ...prev,
                                    affiliation: true
                                }));
                            }}
                        />
                        {blurStatus.affiliation && !selectedAffiliation && (
                            <div style={{ color: "red" }}>
                                Affiliation is Required
                            </div>
                        )}
                    </div>

                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="code"
                            placeholder="Code"
                            value={data.code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.code && (
                            <div style={{ color: "red" }}>{errors.code}</div>
                        )}
                    </div>

                    <CountryStateDistrict
                        countries={locationData.countries}
                        states={locationData.states}
                        districts={locationData.districts}
                        selectedCountry={locationData.selectedCountry}
                        selectedState={locationData.selectedState}
                        selectedDistrict={locationData.selectedDistrict}
                        loadingCountries={loadingCountries}
                        loadingStates={loadingStates}
                        loadingDistricts={loadingDistricts}
                        onCountryChange={handleCountryChange}
                        onStateChange={handleStateChange}
                        onDistrictChange={handleDistrictChange}
                    />
                </form>
            </div>
        );
    }
);

export default OrgForm;
