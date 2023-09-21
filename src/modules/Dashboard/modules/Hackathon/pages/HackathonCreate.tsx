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
import { useNavigate, useParams } from "react-router-dom";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { useToast } from "@chakra-ui/react";
import {
    convertDateToYYYYMMDD,
    getLocationIdByName
} from "../../../utils/common";
import { HackList } from "../services/HackathonInterfaces";
import { FormTabBasics } from "../components/FormTabBasics";
import { FormTabDates } from "../components/FormTabDates";
import { FormTabDetails } from "../components/FormTabDetails";
import { FormTabAdvanced } from "../components/FormTabAdvanced";
import { FormTabApplication } from "../components/FormTabApplication";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

/**
 * TODO: Make the form things json and iterate and display, store the jsons in a separate file.
 */

const formatDate = (date: any): [string, number] => {
    if (
        date === "undefined" ||
        date === null ||
        date === undefined ||
        date === "null" ||
        date === ""
    ) {
        return ["", 0];
    }

    const x = new Date(date);
    const formattedDate = x.toISOString().split("T")[0];
    const unix = Math.floor(x.getTime() / 1000.0); // for unix timestamp comparison

    return [formattedDate, unix];
};

const HackathonCreate = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [formData, setFormData] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<HackList>();
    const [district, setDistrict] = useState<Option[]>([]);
    const [institutions, setInstitutions] = useState<Option[]>([]);
    const [institutionsChunks, setInstitutionsChunks] = useState<Option[][]>(
        []
    );
    const [isPublishing, setIsPublishing] = useState(false);
    const [id, setID] = useState(useParams().id);

    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getHackDetails(id)
                .then(res => {
                    setData(res);
                    setLoading(true);
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            setLoading(true);
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

        const [applicationStartDate, RSD] = formatDate(values.applicationStart);
        const [applicationEndsDate, RED] = formatDate(values.applicationEnds);
        const [eventStartDate, HSD] = formatDate(values.eventStart);
        const [eventEndDate, HED] = formatDate(values.eventEnd);

        if (isPublishing) {
            let checker = false;
            const runToast = (title: string, description: string) => {
                toast({
                    title,
                    description,
                    status: "error",
                    isClosable: true,
                    position: "top-right"
                });
            };

            if (RSD > RED) {
                runToast(
                    "Invalid Date",
                    "Registration Start date > Registration End date"
                );
                checker = true;
            }
            if (RED > HSD) {
                runToast(
                    "Invalid Date",
                    "Registration End > Hackathon Start date"
                );
                checker = true;
            }
            if (HSD > HED) {
                runToast(
                    "Invalid Date",
                    "Hackathon Start > Hackathon End date"
                );
                checker = true;
            }
            if (checker) {
                setIsPublishing(false);
                return;
            }
        }

        // Convert selectedFields object to a JSON string and then parse it to get the desired format
        const formattedFormFields = JSON.stringify(selectedFields);

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
            status: "Draft",
            form_fields: []
        };

        (async () => {
            try {
                if (id) {
                    await editHackathon(hackathon, formattedFormFields,navigate);
                } else {
                    setID(
                        await createHackathon(hackathon, formattedFormFields)
                    );
                }

                if (isPublishing && id) {
                    setIsPublishing(false);
                    publishHackathon(id, hackathon.status, toast);
                } else {
                    toast({
                        title: "Changes Saved",
                        description: "Change has been saved Successfully",
                        status: "success",
                        duration: 4000,
                        isClosable: true
                    });
                    navigate("/dashboard/hackathon");
                }
            } catch (err) {
                toast({
                    title: "Failed to make changes",
                    description: err as string,
                    status: "error",
                    duration: 5000,
                    isClosable: true
                });
            }
        })();
    };

    const initialValues = {
        title: data?.title || null,
        tagline: data?.tagline || null,
        description: data?.description || null,
        participantCount: data?.participant_count || null,
        eventStart: convertDateToYYYYMMDD(String(data?.event_start)) || null,
        eventEnd: convertDateToYYYYMMDD(String(data?.event_end)) || null,
        applicationStart:
            convertDateToYYYYMMDD(String(data?.application_start)) || null,
        applicationEnds:
            convertDateToYYYYMMDD(String(data?.application_ends)) || null,
        orgId: data?.org_id || null,
        place: data?.place || null,
        districtId: getLocationIdByName(district, String(data?.district)) || null,
        isOpenToAll: data?.is_open_to_all || false,
        formFields: data?.form_fields || [],
        event_logo: null,
        banner: null,
        website: data?.website || null,
        type: data?.type || null
    };

    return (
        <>
            {loading ? (
                <div className={styles.container}>
                    <div className={styles.topText}>
                        <h1 className={styles.dashLine}>Lets Get Started</h1>
                        <div className={styles.topBarButtons}>
                            <PowerfulButton
                                variant="ghost"
                                type="submit"
                                form="hackathon"
                                children="Save & Finish later"
                            />
                            <PowerfulButton
                                onClick={() => setIsPublishing(true)}
                                type="submit"
                                form="hackathon"
                                children="Publish Now"
                            />
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
                                // validationSchema={hackathonSchema}
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
                                                        initialFormFields={
                                                            data?.form_fields
                                                        }
                                                    />
                                                </TabPanel>
                                            </div>
                                            <div className={styles.btns}>
                                                {tabIndex > 0 && (
                                                    <PowerfulButton
                                                        onClick={handleBack}
                                                        type="button"
                                                    >
                                                        <FaArrowLeft />
                                                        Go back
                                                    </PowerfulButton>
                                                )}
                                                {tabIndex !== 4 && (
                                                    <PowerfulButton
                                                        onClick={handleNext}
                                                        type="button"
                                                    >
                                                        Next
                                                        <FaArrowRight />
                                                    </PowerfulButton>
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
                        <MuLoader />
                    </div>
                </div>
            )}
        </>
    );
};

export default HackathonCreate;
