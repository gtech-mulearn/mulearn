import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "../../utils/modalForm.module.css";

import toast from "react-hot-toast";
import useLocationData from "@/MuLearnComponents/CascadingSelects/useLocationData";
import {
    editManageUsers,
    getCollegeOptions,
    getCommunities,
    getInterests,
    getManageUsersDetails,
    getRoles
} from "./apis";
import CountryStateDistrict from "@/MuLearnComponents/CascadingSelects/CountryStateDistrict";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";
import { getColleges } from "src/modules/Common/Authentication/services/onboardingApis";

type Props = { id: string };

type InitialLocationData = {
    country: { label: string; value: string };
    state: { label: string; value: string };
    district: { label: string; value: string };
} | null;

const UserForm = forwardRef(
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

        const [data, setData] = useState<UserData>({
            first_name: "",
            last_name: "",
            email: "",
            mobile: "",
            discord_id: "",
            organizations: [],
            department: "",
            roles: [],
            interest_groups: []
        });

        const [errors, setErrors] = useState<OrgFormErrors>({});

        //Fetch the initial data if in edit mode
        useEffect(() => {
            // Replace this with your actual API call
            getManageUsersDetails(props.id).then(
                (data: UserDataFromBackend) => {
                    // const initialData: InitialLocationData = {
                    //     country: {
                    //         label: data.country_name,
                    //         value: data.country_uuid
                    //     },
                    //     state: {
                    //         label: data.state_name,
                    //         value: data.state_uuid
                    //     },
                    //     district: {
                    //         label: data.district_name,
                    //         value: data.district_uuid
                    //     }
                    // };
                    // setInitialData(initialData);
                    setData({
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                        mobile: data.mobile,
                        discord_id: data.discord_id,
                        organizations: data.organizations,
                        department: "",
                        roles: data.role,
                        interest_groups: data.interest_groups
                    });
                }
            );
        }, [props.id]);

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

        const fetchData = async () => {
            try {
                const communities = await getCommunities();
                setSelectData(prevState => ({
                    ...prevState,
                    community: communities.map(community => ({
                        label: community.title,
                        value: community.id
                    }))
                }));
                const roles = await getRoles();
                setSelectData(prevState => ({
                    ...prevState,
                    roles: roles.map(roles => ({
                        label: roles.title,
                        value: roles.id
                    }))
                }));
                console.log(selectData.roles)
                const interestGroups = await getInterests();
                console.log(interestGroups);

                setIg(
                    interestGroups
                );
                console.log(ig);
            } catch (error) {
                // Handle error here
            }
        };

        const [college, setCollege] = useState<AffiliationOption[]>([]);
        const [department, setDepartment] = useState<AffiliationOption[]>([]);
        const [ig,setIg] = useState<AffiliationOption[]>([]);

        const [selectData, setSelectData] = useState({
            community: [] as AffiliationOption[],
            selectedCommunity: [] as AffiliationOption[],
            roles: [] as AffiliationOption[],
            selectedRoles: [] as AffiliationOption[],
            // interestGroups: [] as AffiliationOption[],
            selectedInterestGroups: [] as AffiliationOption[],
            selectedCollege: [] as AffiliationOption[],
            selectedDepartment: [] as AffiliationOption[],
            blurStatus: {
                community: false,
                roles: false,
                interestGroups: false,
                college: false,
                department: false,
            }
        });
        // Add this state for blur status

        useEffect(() => {
            fetchData();
        }, []);

        useEffect(() => {
            getCollegeOptions(
                setCollege,
                setDepartment,
                locationData.selectedDistrict?.value as string
            );
        }, [locationData]);

        useEffect(() => {
            console.log(selectData.roles)
        }, [selectData.roles]);

        //! useImperativeHandle for triggering submit from MuModal button
        useImperativeHandle(ref, () => ({
            handleSubmitExternally: handleSubmit
        }));

        const handleSubmit = (e?: React.FormEvent) => {
            e?.preventDefault();

            const updatedData = {
                ...data,
                // affiliation: String(selectedAffiliation?.value),
                country: String(locationData.selectedCountry?.value),
                state: String(locationData.selectedState?.value),
                district: String(locationData.selectedDistrict?.value)
            };

            console.log(updatedData);

            // Validate form data
            let isValid = true;
            for (const key in updatedData) {
                if (
                    updatedData[key as keyof UserData] === "" ||
                    updatedData[key as keyof UserData] === "undefined"
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

                // toast.promise(editManageUsers(updatedData), {
                //     loading: "Saving...",
                //     success: () => {
                //         props.closeModal();
                //         return <b>Organization added</b>;
                //     },
                //     error: <b>Failed to add new organization</b>
                // });
            }
        };

        return (
            <div className={styles.container}>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="FirstName"
                            placeholder="First Name"
                            value={data.first_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.first_name && (
                            <div style={{ color: "red" }}>
                                {errors.first_name}
                            </div>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="LastName"
                            placeholder="Last Name"
                            value={data.last_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.last_name && (
                            <div style={{ color: "red" }}>
                                {errors.last_name}
                            </div>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="Email"
                            placeholder="Email"
                            value={data.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && (
                            <div style={{ color: "red" }}>{errors.email}</div>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="Mobile"
                            placeholder="Mobile"
                            value={data.mobile}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.mobile && (
                            <div style={{ color: "red" }}>{errors.mobile}</div>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            name="DiscordId"
                            placeholder="DiscordId"
                            value={data.discord_id as string}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.discord_id && (
                            <div style={{ color: "red" }}>
                                {errors.discord_id}
                            </div>
                        )}
                    </div>

                    <div className={styles.inputContainer}>
                        <Select
                            styles={customReactSelectStyles}
                            options={selectData.community}
                            isClearable
                            isMulti
                            placeholder="Community"
                            isLoading={!selectData.community.length}
                            value={selectData.selectedCommunity}
                            onChange={(selectedOptions: any) => {
                                setSelectData(prevState => ({
                                    ...prevState,
                                    selectedCommunity: selectedOptions
                                }));
                            }}
                            onBlur={() => {
                                setSelectData(prev => ({
                                    ...prev,
                                    blurStatus: {
                                        ...prev.blurStatus,
                                        community: true
                                    }
                                }));
                            }}
                        />
                        {selectData.blurStatus.community &&
                            !selectData.selectedCommunity && (
                                <div style={{ color: "red" }}>
                                    Community is Required
                                </div>
                            )}
                    </div>

                    <div className={styles.inputContainer}>
                        <Select
                            styles={customReactSelectStyles}
                            options={selectData.roles}
                            isClearable
                            isMulti
                            placeholder="Roles"
                            isLoading={!selectData.roles.length}
                            value={selectData.selectedRoles}
                            onChange={(selectedOptions: any) => {
                                setSelectData(prevState => ({
                                    ...prevState,
                                    selectedroles: selectedOptions
                                }));
                            }}
                            onBlur={() => {
                                setSelectData(prev => ({
                                    ...prev,
                                    blurStatus: {
                                        ...prev.blurStatus,
                                        roles: true
                                    }
                                }));
                            }}
                        />
                        {selectData.blurStatus.roles &&
                            !selectData.selectedRoles && (
                                <div style={{ color: "red" }}>
                                    Roles is Required
                                </div>
                            )}
                    </div>

                    <div className={styles.inputContainer}>
                        <Select
                            styles={customReactSelectStyles}
                            options={ig}
                            isClearable
                            isMulti
                            placeholder="Interest Groups"
                            isLoading={ig.length? false : true}
                            value={selectData.selectedInterestGroups}
                            onChange={(selectedOptions: any) => {
                                setSelectData(prevState => ({
                                    ...prevState,
                                    selectedinterest_groups: selectedOptions
                                }));
                            }}
                            onBlur={() => {
                                setSelectData(prev => ({
                                    ...prev,
                                    blurStatus: {
                                        ...prev.blurStatus,
                                        interest_groups: true
                                    }
                                }));
                            }}
                        />
                        {selectData.blurStatus.interestGroups &&
                            !selectData.selectedInterestGroups && (
                                <div style={{ color: "red" }}>
                                    IG is Required
                                </div>
                            )}
                    </div>

                    <div className={styles.inputContainer}>
                        <Select
                            styles={customReactSelectStyles}
                            options={college}
                            isClearable
                            placeholder="College"
                            isLoading={!college.length}
                            value={selectData.selectedCollege}
                            onChange={(selectedOptions: any) => {
                                setSelectData(prevState => ({
                                    ...prevState,
                                    selectedCollege: selectedOptions
                                }));
                            }}
                            onBlur={() => {
                                setSelectData(prev => ({
                                    ...prev,
                                    blurStatus: {
                                        ...prev.blurStatus,
                                        college: true
                                    }
                                }));
                            }}
                        />
                        {selectData.blurStatus.college &&
                            !selectData.selectedCollege && (
                                <div style={{ color: "red" }}>
                                    College is Required
                                </div>
                            )}
                    </div>

                    <div className={styles.inputContainer}>
                        <Select
                            styles={customReactSelectStyles}
                            options={department}
                            isClearable
                            placeholder="Department"
                            isLoading={!department.length}
                            value={selectData.selectedDepartment}
                            onChange={(selectedOptions: any) => {
                                setSelectData(prevState => ({
                                    ...prevState,
                                    selectedDepartment: selectedOptions
                                }));
                            }}
                            onBlur={() => {
                                setSelectData(prev => ({
                                    ...prev,
                                    blurStatus: {
                                        ...prev.blurStatus,
                                        department: true
                                    }
                                }));
                            }}
                        />
                        {selectData.blurStatus.department &&
                            !selectData.selectedDepartment && (
                                <div style={{ color: "red" }}>
                                    Department is Required
                                </div>
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

export default UserForm;
