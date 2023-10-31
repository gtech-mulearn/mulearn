import React, { useEffect, useState } from "react";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { getCommunities, getLocations } from "../../../services/onboardingApis";
import { validate } from "../../../services/newOnboardingApis";
import { Form, Formik } from "formik";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import styles from "../AccountCreation/AccountCreation.module.css";
import { FormikTextInputWithoutLabel as SimpleInput } from "@/MuLearnComponents/FormikComponents/FormikComponents";

export default function CommunityPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [communitiesList, setCommunitiesList] = useState([
        { id: "", title: "" }
    ]);
    const navigate = useNavigate();
    // const toast = useToast();
    const location = useLocation();
    let userData = location.state;
    const animatedComponents = makeAnimated();
    const urlParams = new URLSearchParams(window.location.search);
    const [locationParam, setLocationParam] = useState("india");
    const [locationData, setLocationData] = useState([
        { id: "", location: "" }
    ])
    const [isApiCalled, setIsApiCalled] = useState(false);
    const param = urlParams.get("param");
    const toast = useToast();
    useEffect(() => {
        if (userData === undefined || userData === null) {
            navigate("/register", { replace: true });
        }
        setIsLoading(true);
        getCommunities({
            setCommunityAPI: setCommunitiesList,
            setIsLoading: setIsLoading
        });
        getLocations(locationParam, setLocationData, setIsApiCalled)
        setIsLoading(false);
    }, []);
    const handleSubmit = async (values: any) => {
        if (values.communities) userData.communities = values.communities;
        if (values.district) userData.district = values.district;
        if (values.referral) userData.referral = { muid: values.referral };
        const isSuccess = await validate({
            userData: userData,
            setIsSubmitting: setIsLoading,
            toast: toast
        });
        if (isSuccess) navigate("/register/select-role", { state: userData });
    };

    const handleGetLocation = async () => {
        getLocations(locationParam, setLocationData, setIsApiCalled)
    }
    useEffect(() => {
        if (!isApiCalled) {
            handleGetLocation()
        }
    }, [locationParam])
    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"Your Communities"}
                desc={"Select Communities you're part of"}
            />
            <Formik
                initialValues={{
                    communities: [],
                    referral: userData?.referral?.muid || ""
                }}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <Form>
                        <div className={styles.accountCreationContainer}>
                            <div className={styles.accountCreationInputs}>
                                <div>
                                    <Select
                                        name="District"
                                        placeholder="Select District"
                                        onChange={(data) => {
                                            if (data) {
                                                // Use a type assertion to specify the correct type
                                                const id = (data as any).value;
                                                console.log(id);
                                                formik.setFieldValue(
                                                    "district",
                                                    id
                                                );
                                            }
                                        }}

                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isClearable
                                        // isMulti
                                        filterOption={(option, inputValue) => {
                                            if (inputValue === "") {
                                                setLocationParam("india")
                                            }
                                            setLocationParam(inputValue)
                                            return option.label.toLowerCase().includes(inputValue.toLowerCase());
                                        }}
                                        options={locationData.map(
                                            location => {
                                                return {
                                                    value: location.id,
                                                    label: location.location
                                                };
                                            }
                                        )}
                                    />
                                </div>
                                <div>
                                    <Select
                                        name="communities"
                                        placeholder="Select Communities"
                                        onChange={OnChangeValue => {
                                            const ids = OnChangeValue.map(
                                                (e: any) => e.value
                                            );
                                            formik.setFieldValue(
                                                "communities",
                                                ids
                                            );
                                        }}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isClearable
                                        defaultValue={
                                            param
                                                ? {
                                                    value: "ebb42790-571e-4d9e-b65e-d367faad5746",
                                                    label: "KKEM"
                                                }
                                                : null
                                        }
                                        isMulti
                                        options={communitiesList.map(
                                            company => {
                                                return {
                                                    value: company.id,
                                                    label: company.title
                                                };
                                            }
                                        )}
                                    />
                                </div>
                                <div className={styles.inputBox}>
                                    <SimpleInput
                                        name={"referral"}
                                        value={formik.values.referral}
                                        type="text"
                                        placeholder="Referral MuID (Optional)"
                                        disabled={isLoading}
                                    />
                                </div>

                                <PowerfulButton
                                    type="submit"
                                    style={{ marginTop: "10px" }}
                                    isLoading={isLoading}
                                >
                                    {isLoading ? "Validating..." : "Next Step"}
                                </PowerfulButton>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </OnboardingTemplate>
    );
}
