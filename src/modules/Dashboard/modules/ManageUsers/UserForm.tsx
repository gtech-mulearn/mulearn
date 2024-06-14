import {
    ChangeEvent,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState
} from "react";
import styles from "../../utils/modalForm.module.css";

import toast from "react-hot-toast";
import useLocationData from "@/MuLearnComponents/CascadingSelects/useLocationData";
import {
    editManageUsers,
    editUsers,
    getCollegeOptions,
    getCommunities,
    getInterests,
    getManageUsersDetails,
    getRoles,
    getLocations
} from "./apis";
import CountryStateDistrict from "@/MuLearnComponents/CascadingSelects/CountryStateDistrict";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";

import makeAnimated from "react-select/animated";
import { getColleges } from "src/modules/Common/Authentication/services/onboardingApis";

type Props = { id: string };

type InitialLocationData = {
    country: { label: string; value: string };
    state: { label: string; value: string };
    district: { label: string; value: string };
} | null;
const requiredFields = ["full_name", "email"];
const UserForm = forwardRef(
    (props: Props & { closeModal: () => void }, ref: any) => {
        const [initialData, setInitialData] =
            useState<InitialLocationData>(null);
        const animatedComponents = makeAnimated();
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
            full_name: "",
            email: "",
            mobile: "",
            discord_id: "",
            organizations: [],
            department: "",
            role: [],
            interest_groups: [],
            graduation_year: null,
            district: ""
        });

        const [errors, setErrors] = useState<OrgFormErrors>({});

        //Fetch the initial data if in edit mode
        useEffect(() => {
            // Replace this with your actual API call
            getManageUsersDetails(props.id).then(
                (data: UserDataFromBackend) => {
                    console.log(data.organizations);
                    if (data.organizations) {
                        const college = data.organizations!.filter(
                            org =>
                                org.org_type === "College" ||
                                org.org_type === "School"
                        )[0];
                        if (college) {
                            setInitialData({
                                country: {
                                    label: "",
                                    value: college.country
                                },
                                state: {
                                    label: "",
                                    value: college.state
                                },
                                district: {
                                    label: "",
                                    value: college.district
                                }
                            });
                        }

                        setSelectData(selectData => ({
                            ...selectData,
                            selectedCommunity: data.organizations
                                ? data.organizations
                                      .filter(
                                          org => org.org_type === "Community"
                                      )
                                      .map(org => org.org)
                                : [],
                            selectedInterestGroups: data.interest_groups
                                ? data.interest_groups
                                : [],
                            selectedRoles: data.role ? data.role : [],
                            selectedCollege: college ? college.org : "",
                            selectedDepartment: college
                                ? college.department
                                : "",
                            selectedLocation: data.district
                        }));
                    }
                    setData({
                        full_name: data.full_name,
                        email: data.email,
                        mobile: data.mobile,
                        discord_id: data.discord_id,
                        organizations: !data.organizations
                            ? []
                            : data.organizations!.map(org => org.org),
                        department: "",
                        role: data.role,
                        interest_groups: data.interest_groups,
                        graduation_year:
                            data.organizations
                                ?.filter(
                                    org =>
                                        org.org_type === "College" ||
                                        org.org_type === "School"
                                )
                                .map(org => org.graduation_year)[0] || null,
                        district: data.district
                    });
                }
            );
            console.log(selectData.selectedLocation);
        }, [props.id]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;

            if (name === "mobile" && value && !/^\+?\d{0,12}$/.test(value.trim())) {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    mobile: "Invalid format"
                }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, mobile: undefined }));
                setData(prevData => ({ ...prevData, [name]: value.trim() || " " }));
            }
        };

        const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            if (value.length > 4) return;
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

                const interestGroups = await getInterests();
                setSelectData(prevState => ({
                    ...prevState,
                    intersetGroups: interestGroups.map(ig => ({
                        label: ig.name,
                        value: ig.id
                    }))
                }));
                setIg(interestGroups);
            } catch (error) {
                // Handle error here
            }
        };

        const [location, setLocation] = useState<AffiliationOption[]>([]);
        const [college, setCollege] = useState<AffiliationOption[]>([]);
        const [department, setDepartment] = useState<AffiliationOption[]>([]);
        const [ig, setIg] = useState<AffiliationOption[]>([]);
        const [selectedIg, setSelectedIg] = useState<AffiliationOption[]>([]);
        const [selectedRoles, setSelectedRoles] = useState<AffiliationOption[]>(
            []
        );
        const [locationParam, setLocationParam] = useState("india");
        const [locationDatas, setLocationDatas] = useState([
            { id: "", location: "" }
        ]);
        const [isApiCalled, setIsApiCalled] = useState(false);
        const [selectData, setSelectData] = useState({
            community: [] as AffiliationOption[],
            selectedCommunity: [] as string[],
            roles: [] as AffiliationOption[],
            selectedRoles: [] as string[],
            // interestGroups: [] as AffiliationOption[],
            selectedInterestGroups: [] as string[],
            selectedCollege: "",
            selectedLocation: "",
            selectedDepartment: "",
            blurStatus: {
                community: false,
                roles: false,
                interestGroups: false,
                college: false,
                department: false
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

        useEffect(() => {}, [selectData.roles]);

        useEffect(() => {
            if (!isApiCalled) {
                handleGetLocation();
            }
        }, [locationParam]);

        const handleGetLocation = async () => {
            getLocations(locationParam, setLocationDatas, setIsApiCalled);
        };

        const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
            console.log(e);
            const data = e;
            if (data) {
                // Use a type assertion to specify the correct type
                const id = (data as any).value;
                console.log(data);

                // Update the "district" state variable
                setLocation(id);
                console.log();
            }
        };

        //! useImperativeHandle for triggering submit from MuModal button
        useImperativeHandle(ref, () => ({
            handleSubmitExternally: handleSubmit
        }));
        const handleSubmit = (e?: React.FormEvent) => {
            e?.preventDefault();
            const convertedRoles = selectedRoles.map(option => option?.value);
            const updatedData = {
                ...data,
                // affiliation: String(selectedAffiliation??.value),
                // country: (locationData.selectedCountry?.value),
                // state: (locationData.selectedState?.value),
                district: selectData.selectedLocation,
                roles: selectData.selectedRoles,
                interest_groups: selectData.selectedInterestGroups,
                organizations: [
                    selectData.selectedCollege,
                    ...selectData.selectedCommunity
                ],
                department: selectData.selectedDepartment,
                community: selectData.selectedCommunity
            };
            console.log(
                selectData.selectedLocation,
                selectData.selectedDepartment
            );
            for (const key in updatedData) {
                if (
                    updatedData[key as keyof typeof updatedData] ===
                        undefined ||
                    updatedData[key as keyof typeof updatedData] === null ||
                    updatedData[key as keyof typeof updatedData] === "" ||
                    updatedData[key as keyof typeof updatedData] === "undefined"
                ) {
                    delete updatedData[key as keyof typeof updatedData];
                }
            }

            // Validate form data
            let isValid = true;
            for (const key of requiredFields) {
                if (!updatedData[key as keyof UserData]) {
                    console.log(key);
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
                toast.promise(editUsers(props.id, updatedData), {
                    loading: "Saving...",
                    success: () => {
                        props.closeModal();
                        return <b>User edited</b>;
                    },
                    error: <b>Failed to edit user</b>
                });
            }
        };

        return (
            <div className={styles.container}>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    {<p className={styles.formHeader}>BASIC INFO</p>}
                    <div className={styles.formContainer}>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="full_name"
                                placeholder="Full Name"
                                value={data.full_name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.full_name && (
                                <div style={{ color: "red" }}>
                                    {errors.full_name}
                                </div>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && (
                                <div style={{ color: "red" }}>
                                    {errors.email}
                                </div>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Mobile"
                                value={data.mobile}
                                onChange={handleChange}
                                
                            />
                            {errors.mobile && (
                                <div style={{ color: "red" }}>
                                    {errors.mobile}
                                </div>
                            )}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                name="discord_id"
                                placeholder="DiscordId"
                                value={data.discord_id as string}
                                onChange={handleChange}
                                // onBlur={handleBlur}
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
                                placeholder="Select your location"
                                onChange={(selectedOptions: any) => {
                                    setSelectData(prevState => ({
                                        ...prevState,
                                        selectedLocation: selectedOptions?.value
                                    }));
                                }}
                                value={locationDatas
                                    .map(location => {
                                        return {
                                            value: location.id,
                                            label: location.location
                                        };
                                    })
                                    .filter(
                                        loc =>
                                            (loc?.value as any) ===
                                            selectData.selectedLocation
                                    )}
                                components={animatedComponents}
                                isClearable
                                // isMulti
                                filterOption={(option, inputValue) => {
                                    if (inputValue === "") {
                                        setLocationParam("india");
                                    }
                                    setLocationParam(inputValue);
                                    return option.label
                                        .toLowerCase()
                                        .includes(inputValue.toLowerCase());
                                }}
                                options={locationDatas.map(location => {
                                    return {
                                        value: location.id,
                                        label: location.location
                                    };
                                })}
                            />
                        </div>

                        <div className={styles.inputContainer}>
                            <Select
                                styles={customReactSelectStyles}
                                options={selectData.community}
                                isClearable
                                isMulti
                                placeholder="Community"
                                isLoading={!selectData.community.length}
                                value={selectData.community.filter(comm =>
                                    selectData.selectedCommunity.includes(
                                        comm?.value
                                    )
                                )}
                                onChange={(selectedOptions: any) => {
                                    setSelectData(prevState => ({
                                        ...prevState,
                                        selectedCommunity: selectedOptions.map(
                                            (opt: any) => opt?.value
                                        )
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
                            {/* {selectData.blurStatus.community &&
                            !selectData.selectedCommunity && (
                                <div style={{ color: "red" }}>
                                    Community is Required
                                </div>
                            )} */}
                        </div>

                        <div className={styles.inputContainer}>
                            <Select
                                styles={customReactSelectStyles}
                                options={selectData.roles}
                                isClearable
                                isMulti
                                placeholder="Roles"
                                isLoading={!selectData.roles.length}
                                value={selectData.roles.filter(roles =>
                                    selectData.selectedRoles.includes(
                                        roles?.value
                                    )
                                )}
                                onChange={(selectedOptions: any) => {
                                    setSelectData(selectData => ({
                                        ...selectData,
                                        selectedRoles: selectedOptions.map(
                                            (opt: any) => opt?.value
                                        )
                                    }));
                                    // setSelectedRoles(selectedOptions);
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
                            {/* {selectData.blurStatus.roles &&
                            !selectData.selectedRoles && (
                                <div style={{ color: "red" }}>
                                    Roles is Required
                                </div>
                            )} */}
                        </div>

                        <div className={styles.inputContainer}>
                            <Select
                                styles={customReactSelectStyles}
                                options={ig}
                                isClearable
                                isMulti
                                placeholder="Interest Groups"
                                isLoading={ig.length ? false : true}
                                value={ig.filter(intg =>
                                    selectData.selectedInterestGroups.includes(
                                        intg?.value
                                    )
                                )}
                                onChange={(selectedOptions: any) => {
                                    setSelectData(prevState => ({
                                        ...prevState,
                                        selectedInterestGroups:
                                            selectedOptions.map(
                                                (opt: any) => opt?.value
                                            )
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
                                // value={selectedIg}
                            />
                            {/* {selectData.blurStatus.interestGroups &&
                            !selectData.selectedInterestGroups && (
                                <div style={{ color: "red" }}>
                                    IG is Required
                                </div>
                            )} */}
                        </div>
                    </div>
                    <hr
                        style={{
                            width: "50%",
                            textAlign: "left",
                            marginLeft: 0,
                            display: "none"
                        }}
                    />
                    {<p className={styles.formHeader}>COLLEGE / SCHOOL</p>}
                    <div className={styles.formContainer}>
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
                            notRequired={true}
                        />

                        <div className={styles.inputContainer}>
                            <Select
                                styles={customReactSelectStyles}
                                options={college}
                                isClearable
                                placeholder="College / School"
                                isLoading={!college.length}
                                value={college.filter(
                                    college =>
                                        college?.value ===
                                        selectData.selectedCollege
                                )}
                                onChange={(selectedOptions: any) => {
                                    setSelectData(prevState => ({
                                        ...prevState,
                                        selectedCollege: selectedOptions?.value
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
                            {/* {selectData.blurStatus.college &&
                            !selectData.selectedCollege && (
                                <div style={{ color: "red" }}>
                                    College is Required
                                </div>
                            )} */}
                        </div>

                        <div className={styles.inputContainer}>
                            <Select
                                styles={customReactSelectStyles}
                                options={department}
                                isClearable
                                placeholder="Department"
                                isLoading={!department.length}
                                value={department.filter(
                                    dep =>
                                        (dep?.value as any) ===
                                        selectData.selectedDepartment
                                )}
                                onChange={(selectedOptions: any) => {
                                    setSelectData(prevState => ({
                                        ...prevState,
                                        selectedDepartment:
                                            selectedOptions?.value
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
                            {/* {selectData.blurStatus.department &&
                            !selectData.selectedDepartment && (
                                <div style={{ color: "red" }}>
                                    Department is Required
                                </div>
                            )} */}
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                name="graduation_year"
                                placeholder="Year"
                                value={data.graduation_year as number}
                                onChange={handleYearChange}
                                onBlur={handleBlur}
                            />
                            {errors.email && (
                                <div style={{ color: "red" }}>
                                    {errors.email}
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
);

export default UserForm;
