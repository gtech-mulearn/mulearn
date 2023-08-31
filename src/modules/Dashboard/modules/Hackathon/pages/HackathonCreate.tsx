import { Form, Formik } from "formik";
import styles from "./HackathonCreate.module.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Option } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { useEffect, useState } from "react";
import {
    createHackathon,
    editHackathon,
    getAllDistricts,
    getAllInstitutions,
    getFormFields,
    getHackDetails,
    publishHackathon
} from "../services/HackathonApis";
import { FiUploadCloud } from "react-icons/fi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { background, useToast } from "@chakra-ui/react";
import {
    convertDateToYYYYMMDD,
    getLocationIdByName
} from "../../../utils/common";
import HackathonImagePreview from "../components/HackathonImagePreview";
import { HackList } from "../services/HackathonInterfaces";
import { FormTabBasics } from "../components/FormTabBasics";
import { FormTabDates } from "../components/FormTabDates";
import { FormTabDetails } from "../components/FormTabDetails";
import { FormTabAdvanced } from "../components/FormTabAdvanced";
import { FormTabApplication } from "../components/FormTabApplication";

import { hackathonSchema } from "../utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

/**
 * TODO: Make the form things json and iterate and display, store the jsons in a separate file.
 */

const HackathonCreate = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [formData, setFormData] = useState("");
    const [temp, setTemp] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState<HackList>();
    const [district, setDistrict] = useState<Option[]>([]);
    const [institutions, setInstitutions] = useState<Option[]>([]);
    const [institutionsChunks, setInstitutionsChunks] = useState<Option[][]>(
        []
    );

    const [isPublishing, setIsPublishing] = useState(false);

    const [isCreatePage, setIsCreatePage] = useState(false);
    const [openImagePreview, setOpenImagePreview] = useState(false);
    const [prevImgUrl, setPreviewImgUrl] = useState("");
    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (id !== undefined) {
            getHackDetails(setData, id);
            setTimeout(() => {
                setTemp(true);
            }, 3000);
            setIsEdit(true);
        } else {
            setTemp(true);
        }
        if (formData === "") {
            getFormFields(setFormData);
            getAllDistricts(setDistrict);
            getAllInstitutions(setInstitutionsChunks);
        }
    }, []);

    useEffect(() => {
        // Flatten the chunks into a single array when the chunks change
        const flattenedInstitutions = institutionsChunks.reduce(
            (accumulator, currentChunk) => accumulator.concat(currentChunk),
            []
        );
        setInstitutions(flattenedInstitutions);
    }, [institutionsChunks]);

    function handleNext() {
        setTabIndex(tabIndex === 4 ? 4 : tabIndex + 1);
    }

    function handleBack() {
        setTabIndex(tabIndex === 0 ? 0 : tabIndex - 1);
    }

    function isDetailsComplete(hackathon: HackList): boolean {
        let returnVal = true;
        let fieldsToFix: string[] = [];
        Object.entries(hackathon).forEach(([key, value]) => {
            if (value === null || value === "") {
                returnVal = false;
                fieldsToFix.push(
                    key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")
                );
            }
        });
        if (!returnVal) {
            const fieldsText = fieldsToFix.join(", ");

            toast({
                title: "Cannot publish",
                description: `Please fill the following fields: ${fieldsText}`,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right"
            });
        }
        return returnVal;
    }

    const handleSubmit = (values: any, { resetForm }: any) => {
        const fields: { [key: string]: string } = {
            bio: "system",
            college: "system",
            email: "system",
            experience: "input",
            gender: "system",
            github: "input",
            linkedin: "input",
            mobile: "system",
            name: "system"
        };

        const selectedFields: { [key: string]: string } = {};

        values.formFields.forEach((field: string) => {
            if (fields.hasOwnProperty(field)) {
                selectedFields[field] = fields[field];
            }
        });

        const formatDate = (date: any): string => {
            if (
                date === "undefined" ||
                date === null ||
                date === undefined ||
                date === "null" ||
                date === ""
            ) {
                return "";
            }
            return new Date(date).toISOString().split("T")[0];
        };

        const applicationStartDate = formatDate(values.applicationStart);
        const applicationEndsDate = formatDate(values.applicationEnds);
        const eventStartDate = formatDate(values.eventStart);
        const eventEndDate = formatDate(values.eventEnd);

        // Convert selectedFields object to a JSON string and then parse it to get the desired format
        const formattedFormFields = JSON.stringify(selectedFields);

        const publish = (hackathon: HackList): boolean => {
            let returnVal = false;
            if (isPublishing) {
                if (isDetailsComplete(hackathon)) {
                    publishHackathon(hackathon.id, hackathon.status, toast);
                    returnVal = true;
                } else {
                    setIsPublishing(false);
                }
            }
            return returnVal;
        };

        const hackathon: HackList = {
            id: id || "",
            title: values.title,
            type: values.type,
            tagline: values.tagline,
            event_logo: values.event_logo,
            banner: values.banner,
            website: values.website,
            place: values.place,
            event_start: eventStartDate,
            event_end: eventEndDate,
            application_start: applicationStartDate,
            application_ends: applicationEndsDate,
            description: values.description,
            participant_count: values.participantCount,
            district: values.districtId,
            organisation: values.orgId,
            district_id: values.districtId,
            org_id: values.orgId,
            editable: true,
            is_open_to_all: values.isOpenToAll,
            status: "Draft"
        };

        isEdit
            ? editHackathon(hackathon, formattedFormFields, toast)
				.then(() => (isPublishing ? publish(hackathon) : true))
				.then(res => res && navigate("/dashboard/hackathon"))
            : createHackathon(hackathon, formattedFormFields, toast)
				.then(id => {
					setIsEdit(true);
					return isPublishing
						? publish({ ...hackathon, id: id || "" })
						: true;
				})
				.then(
					res =>
						res &&
						setTimeout(
							() => navigate("/dashboard/hackathon"),
							1000
						)
				);
    };

    useEffect(() => {
        if (location.pathname === "/dashboard/hackathon/create") {
            setIsCreatePage(true);
        }
    }, [location]);

    const handleCloseModal = () => {
        setOpenImagePreview(false);
    };

    const initialValues = {
        title: data?.title || "",
        tagline: data?.tagline || "",
        description: data?.description || "",
        participantCount: data?.participant_count || "",
        eventStart: convertDateToYYYYMMDD(String(data?.event_start)) || null,
        eventEnd: convertDateToYYYYMMDD(String(data?.event_end)) || null,
        applicationStart:
            convertDateToYYYYMMDD(String(data?.application_start)) || null,
        applicationEnds:
            convertDateToYYYYMMDD(String(data?.application_ends)) || null,
        orgId: data?.org_id || "",
        place: data?.place || "",
        districtId: getLocationIdByName(district, String(data?.district)) || "",
        isOpenToAll: data?.is_open_to_all || false,
        formFields: [],
        event_logo: "",
        banner: "",
        website: data?.website || "",
        type: data?.type || ""
    };

    return (
        <>
            {temp ? (
                <div className={styles.container}>
                    <div className={styles.topText}>
                        <h1 className={styles.dashLine}>Lets Get Started</h1>
                        <div className={styles.topBarButtons}>
                            <button
                                type="submit"
                                form="hackathon"
                                className={styles.btn}
                            >
                                Save & Finish later
                            </button>
                            <button
                                type="submit"
                                form="hackathon"
                                className={styles.btn}
                                onClick={() => setIsPublishing(true)}
                                style={{
                                    backgroundColor: "#456ff6",
                                    color: "#fff"
                                }}
                            >
                                Publish Now
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className={styles.hackNav}>
                            <div className={styles.starImg}>
                                <img
                                    src="/src/modules/Dashboard/modules/Hackathon/Assets/Star 1.webp"
                                    alt=""
                                />
                                <img
                                    src="/src/modules/Dashboard/modules/Hackathon/Assets/Star 2.webp"
                                    alt=""
                                />
                            </div>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={hackathonSchema}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    handleChange,
                                    setFieldValue,
                                    errors
                                }) => (
                                    <Form id="hackathon">
                                        <Tabs
                                            selectedTabClassName={
                                                styles.selectedTab
                                            }
                                            selectedIndex={tabIndex}
                                            onSelect={index =>
                                                setTabIndex(index)
                                            }
                                        >
                                            <TabList>
                                                <Tab>Basics</Tab>
                                                <Tab>Dates</Tab>
                                                <Tab>Details</Tab>
                                                <Tab>Advanced</Tab>
                                                <Tab>Application</Tab>
                                                <span></span>
                                                {/* <Tab>Organizers</Tab> */}
                                                {/* <Tab>FAQs</Tab> */}
                                            </TabList>
                                            <div className={styles.form}>
                                                <TabPanel
                                                    className={
                                                        styles.formGroupStart
                                                    }
                                                >
                                                    <FormTabBasics />
                                                </TabPanel>
                                                <TabPanel
                                                    className={styles.formGroup}
                                                >
                                                    <FormTabDates />
                                                </TabPanel>

                                                <TabPanel
                                                    className={styles.formGroup}
                                                >
                                                    <FormTabDetails
                                                        institutions={
                                                            institutions
                                                        }
                                                        district={district}
                                                    />
                                                </TabPanel>

                                                <TabPanel>
                                                    <FormTabAdvanced
                                                        data={data}
                                                        errors={errors}
                                                        setFieldValue={
                                                            setFieldValue
                                                        }
                                                    />
                                                </TabPanel>

                                                <TabPanel
                                                    className={
                                                        styles.formGroupField
                                                    }
                                                >
                                                    <FormTabApplication
                                                        values={values}
                                                        handleChange={
                                                            handleChange
                                                        }
                                                        formData={formData}
                                                    />
                                                </TabPanel>
                                            </div>
                                            <div className={styles.btns}>
                                                {tabIndex > 0 && (
                                                    <button
                                                        onClick={handleBack}
                                                        className={styles.btn}
                                                        type="button"
                                                    >
                                                        <FaArrowLeft />
                                                        Go back
                                                    </button>
                                                )}
                                                {tabIndex !== 4 && (
                                                    <button
                                                        onClick={handleNext}
                                                        className={styles.btn}
                                                        type="button"
                                                    >
                                                        Next
                                                        <FaArrowRight />
                                                    </button>
                                                )}
                                            </div>
                                        </Tabs>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.spinner_container}>
                    <div className={styles.spinner}>
                        <MuLoader />{" "}
                    </div>
                </div>
            )}
        </>
    );
};

export default HackathonCreate;
