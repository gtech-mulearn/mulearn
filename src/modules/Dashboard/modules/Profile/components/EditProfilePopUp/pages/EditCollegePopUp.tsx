import { useEffect, useState } from "react";
import styles from "./EditCollegePopUp.module.css";
import { getCollegeOptions, getLocations } from "../services/api";
import CountryStateDistrict from "@/MuLearnComponents/CascadingSelects/CountryStateDistrict";
import useLocationData from "@/MuLearnComponents/CascadingSelects/useLocationData";
import Select from "react-select";
import toast from "react-hot-toast";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { customReactSelectStyles } from "@/modules/Dashboard/utils/common";
import { dashboardRoutes } from "@/MuLearnServices/urls";

type Props = {
    openCollegeEdit: boolean;
    setOpenCollegeEdit: (value: boolean) => void;
    id: string;
    triggerUpdateProfile: () => void;
};

type InitialLocationData = {
    country: { label: string; value: string };
    state: { label: string; value: string };
    district: { label: string; value: string };
} | null;

const EditCollegePopUp = ({ openCollegeEdit, setOpenCollegeEdit, id, triggerUpdateProfile }: Props) => {
    const [initialData, setInitialData] = useState<InitialLocationData>(null);
    const [college, setCollege] = useState<any[]>([]);
    const [department, setDepartment] = useState<any[]>([]);
    const [selectData, setSelectData] = useState({
        selectedCollege: "",
        selectedDepartment: "",
        selectedGraduationYear: ""
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    
    const {
        locationData,
        loadingCountries,
        loadingStates,
        loadingDistricts,
        handleCountryChange,
        handleStateChange,
        handleDistrictChange
    } = useLocationData(initialData);

    // Function to load current user data
    const loadCurrentUserData = async () => {
        try {
            setLoading(true);
            const response = await privateGateway.get(dashboardRoutes.getUserProfile);
            const userData = response.data.response;
            
            // Set current college information if available
            if (userData.college_id) {
                setSelectData(prev => ({
                    ...prev,
                    selectedCollege: userData.college_id,
                }));
            }
            
            // If we have college location data, we could set initial location
            // This would require additional API calls to get the district/state/country from college
            
        } catch (error) {
            console.error("Error loading user data:", error);
            toast.error("Failed to load current college information");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && openCollegeEdit) {
                handleClose();
            }
        };

        if (openCollegeEdit) {
            window.history.pushState(null, "", window.location.href);
            
            const handlePopState = () => {
                setOpenCollegeEdit(false);
            };
            
            window.addEventListener("popstate", handlePopState);
            window.addEventListener("keydown", handleEscapeKey);
            
            // Load current user data when modal opens
            loadCurrentUserData();

            // Cleanup function
            return () => {
                window.removeEventListener("popstate", handlePopState);
                window.removeEventListener("keydown", handleEscapeKey);
            };
        }
    }, [openCollegeEdit]);

    useEffect(() => {
        if (openCollegeEdit && locationData.selectedDistrict?.value) {
            getCollegeOptions(
                setCollege,
                setDepartment,
                locationData.selectedDistrict.value
            );
        }
    }, [locationData.selectedDistrict, openCollegeEdit]);

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (value.length > 4) return;
        setSelectData(prev => ({ ...prev, selectedGraduationYear: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData: any = {
            org_id: selectData.selectedCollege,
        };

        // Only include department_id if it has a value
        if (selectData.selectedDepartment && selectData.selectedDepartment.trim() !== '') {
            updatedData.department_id = selectData.selectedDepartment;
        }

        // Validate form data
        let isValid = true;
        const newErrors: { [key: string]: string } = {};
        
        if (!selectData.selectedCollege) {
            newErrors.college = "College is required";
            isValid = false;
        }
        if (!locationData.selectedDistrict?.value) {
            newErrors.district = "District is required";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            try {
                setLoading(true);
                await privateGateway.patch(
                    dashboardRoutes.changeUserCollege,
                    updatedData
                );
                toast.success("College details updated successfully");
                triggerUpdateProfile();
                handleClose();
            } catch (error) {
                console.error("Error updating college:", error);
                toast.error("Failed to update college details");
            } finally {
                setLoading(false);
            }
        } else {
            Object.values(newErrors).forEach(error => toast.error(error));
        }
    };

    const handleClose = () => {
        // Reset form data when closing
        setSelectData({
            selectedCollege: "",
            selectedDepartment: "",
            selectedGraduationYear: ""
        });
        setErrors({});
        setCollege([]);
        setDepartment([]);
        setOpenCollegeEdit(false);
    };

    return (
        <div
            className={styles.edit_profile_container}
            style={
                openCollegeEdit
                    ? { transform: "scale(1)" }
                    : { transform: "scale(0)" }
            }
            onClick={handleClose}
        >
            <div className={styles.edit_profile}>
                <div
                    className={styles.edit_profile_contents}
                    tabIndex={1}
                    onClick={e => e.stopPropagation()}
                >
                    <h2>Edit College Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="location-row">
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
                            notRequired={false}
                        />
                        {errors.district && (
                            <div className={styles.error_message}>
                                {errors.district}
                            </div>
                        )}
                        </div>

                        <div className={styles.input_field}>
                            <label className={styles.label}>College / School</label>
                            <div className={styles.inputBox}>
                                <Select
                                    styles={customReactSelectStyles}
                                    options={college}
                                    isClearable
                                    placeholder="Select College / School"
                                    isLoading={!college.length && !!locationData.selectedDistrict?.value}
                                    isDisabled={loading}
                                    value={college.find(
                                        c => c.value === selectData.selectedCollege
                                    )}
                                    onChange={(selectedOption: any) => {
                                        setSelectData(prev => ({
                                            ...prev,
                                            selectedCollege: selectedOption?.value || ""
                                        }));
                                        // Clear error when user selects a college
                                        if (selectedOption && errors.college) {
                                            setErrors(prev => ({ ...prev, college: "" }));
                                        }
                                    }}
                                />
                                {errors.college && (
                                    <div className={styles.error_message}>
                                        {errors.college}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={styles.input_field}>
                            <label className={styles.label}>Department</label>
                            <div className={styles.inputBox}>
                                <Select
                                    styles={customReactSelectStyles}
                                    options={department}
                                    isClearable
                                    placeholder="Select Department"
                                    isLoading={!department.length && !!locationData.selectedDistrict?.value}
                                    isDisabled={loading}
                                    value={department.find(
                                        d => d.value === selectData.selectedDepartment
                                    )}
                                    onChange={(selectedOption: any) => {
                                        setSelectData(prev => ({
                                            ...prev,
                                            selectedDepartment: selectedOption?.value || ""
                                        }));
                                    }}
                                />
                            </div>
                        </div>

                        

                        <div className={styles.btn_container}>
                            <PowerfulButton
                                type="submit"
                                disabled={loading}
                                style={{
                                    background: loading ? "#ccc" : "#456FF6",
                                    color: "#fff",
                                    margin: "0px 0px 4px 0px",
                                    display: "flex",
                                    justifyContent: "center",
                                  
                                    cursor: loading ? "not-allowed" : "pointer"
                                }}
                            >
                                {loading ? "Updating..." : "Update College"}
                            </PowerfulButton>
                            <PowerfulButton
                                type="button"
                                variant="outline"
                                disabled={loading}
                                onClick={handleClose}
                            >
                                Cancel
                            </PowerfulButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCollegePopUp;