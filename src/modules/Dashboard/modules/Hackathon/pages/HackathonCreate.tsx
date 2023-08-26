import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
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
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { FormTabBasics } from "../components/FormTabBasics";
import { FormTabDates } from "../components/FormTabDates";
import { FormTabDetails } from "../components/FormTabDetails";
import { FormTabAdvanced } from "../components/FormTabAdvanced";

/**
 * TODO: Move YUP Validations to another file.
 * TODO: Make the form things json and iterate and display, store the jsons in a separate file.
 */

const HackathonCreate = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [formData, setFormData] = useState("");
    const [temp, setTemp] = useState(false);
    const [edit, setEdit] = useState(false);
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
            setEdit(true);
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
        if (tabIndex === 4) {
            setTabIndex(4);
        } else {
            setTabIndex(tabIndex + 1);
        }
        // console.log(getLocationIdByName(district, String(data?.district)));
        console.log(String(data?.district));
    }

    function handleBack() {
        if (tabIndex === 0) {
            setTabIndex(0);
        } else {
            setTabIndex(tabIndex - 1);
        }
    }

    const hackathonSchema = Yup.object().shape({
        title: Yup.string()
            .required("Required")
            .min(2, "Too Short!")
            .max(50, "Too Long!"),
        tagline: Yup.string().min(2, "Too Short!").max(100, "Too Long!"),
        // .required("Required"),
        orgId: Yup.string().min(2, "Too Short!"),
        place: Yup.string().min(2, "Too Short!"),
        districtId: Yup.string().min(2, "Too Short!"),
        type: Yup.string().min(2, "Too Short!"),
        isOpenToAll: Yup.boolean(),
        description: Yup.string().min(5, "Too Short!"),
        // eventStart: Yup.date(),
        // eventEnd: Yup.date(),
        // applicationStart: Yup.date(),
        // applicationEnds: Yup.date(),
        participantCount: Yup.number()
            .positive("Number of users should be a positive value")
            .min(10, "Needs to be at least 2 digits.")
            .max(999999, "Should not exceed 6 digits")
            .truncate(),
        website: Yup.string().min(3, "Too Short!").max(200, "Too Long!"),
        event_logo: Yup.mixed()
            .test(
                "fileSize",
                "File size is too large, maximum size is 10MB",
                (value: any) => {
                    if (value) {
                        const maxSize = 10 * 1024 * 1024; // 10MB
                        return value.size <= maxSize;
                    }
                    return true; // No file selected, so it passes validation
                }
            )
            .test(
                "fileType",
                "Invalid file format, only image formats are supported",
                (value: any) => {
                    if (value) {
                        const supportedFormats = [
                            "image/jpeg",
                            "image/png",
                            "image/gif"
                        ];
                        return supportedFormats.includes(value.type);
                    }
                    return true; // No file selected, so it passes validation
                }
            ),

        banner: Yup.mixed()
            .test(
                "fileSize",
                "File size is too large, maximum size is 20MB",
                (value: any) => {
                    if (value) {
                        const maxSize = 20 * 1024 * 1024; // 20MB
                        return value.size <= maxSize;
                    }
                    return true; // No file selected, so it passes validation
                }
            )
            .test(
                "fileType",
                "Invalid file format, only image formats are supported",
                (value: any) => {
                    if (value) {
                        const supportedFormats = [
                            "image/jpeg",
                            "image/png",
                            "image/gif"
                        ];
                        return supportedFormats.includes(value.type);
                    }
                    return true; // No file selected, so it passes validation
                }
            )
    });

    function isDetailsComplete(hackathon: HackList): boolean {
        if (
            hackathon.id &&
            hackathon.title &&
            hackathon.type &&
            hackathon.tagline &&
            hackathon.event_logo &&
            hackathon.banner &&
            hackathon.website &&
            hackathon.place &&
            hackathon.event_start &&
            hackathon.event_end &&
            hackathon.application_start &&
            hackathon.application_ends &&
            hackathon.description &&
            hackathon.participant_count !== null &&
            hackathon.district &&
            hackathon.organisation &&
            hackathon.district_id &&
            hackathon.org_id !== null &&
            hackathon.editable !== null
        ) {
            return true;
        }
        return false;
    }

    const handleSubmit = async (values: any, { resetForm }: any) => {
        console.log(values);

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

        let a =
            values.applicationStart !== "undefined" &&
            values.applicationStart !== "" &&
            values.applicationStart !== "null" &&
            values.applicationStart !== null
                ? `${values.applicationStart}T00:00:00Z`
                : "";
        let b =
            values.applicationEnds !== "undefined" &&
            values.applicationEnds !== "" &&
            values.applicationEnds !== "null" &&
            values.applicationEnds !== null
                ? `${values.applicationEnds}T00:00:00Z`
                : "";
        let c =
            values.eventStart !== "undefined" &&
            values.eventStart !== "" &&
            values.eventStart !== "null" &&
            values.eventStart !== null
                ? `${values.eventStart}T00:00:00Z`
                : "";
        let d =
            values.eventEnd !== "undefined" &&
            values.eventEnd !== "" &&
            values.eventEnd !== "null" &&
            values.eventEnd !== null
                ? `${values.eventEnd}T00:00:00Z`
                : "";

        console.log(selectedFields);

        // Convert selectedFields object to a JSON string and then parse it to get the desired format
        const formattedFormFields = JSON.stringify(selectedFields);
        console.log(formattedFormFields);

        function pulish(hackathonId: string): boolean {
            let returnVal = false;
            if (isPublishing) {
                const hackathon: HackList = {
                    id: hackathonId,
                    title: values.title,
                    type: values.type,
                    tagline: values.tagline,
                    event_logo: values.event_logo,
                    banner: values.banner,
                    website: values.website,
                    place: values.place,
                    event_start: c,
                    event_end: d,
                    application_start: a,
                    application_ends: b,
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

                if (isDetailsComplete(hackathon)) {
                    publishHackathon(hackathon.id, hackathon.status, toast);
                    returnVal = true;
                } else {
                    toast({
                        title: "Cannot publish",
                        description: "Please fill all the details",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                        position: "top-right"
                    });
                    setIsPublishing(false);
                }
            }
            return returnVal;
        }

        edit
            ? editHackathon(
                  values.title,
                  values.tagline,
                  values.description,
                  values.participantCount,
                  values.orgId,
                  values.districtId,
                  values.place,
                  values.isOpenToAll,
                  a,
                  b,
                  c,
                  d,
                  formattedFormFields,
                  values.event_logo,
                  values.banner,
                  values.type,
                  values.website,
                  toast,
                  id
              )
                  .then(() => (isPublishing ? pulish(id!) : true))
                  .then(res => res && navigate("/dashboard/hackathon"))
            : createHackathon(
                  values.title,
                  values.tagline,
                  values.description,
                  values.participantCount,
                  values.orgId,
                  values.districtId,
                  values.place,
                  values.isOpenToAll,
                  a,
                  b,
                  c,
                  d,
                  formattedFormFields,
                  values.event_logo,
                  values.banner,
                  values.type,
                  values.website,
                  toast
              )
                  .then(id => (isPublishing ? pulish(id) : true))
                  .then(
                      res =>
                          res &&
                          setTimeout(
                              () => navigate("/dashboard/hackathon"),
                              1000
                          )
                  );

        // resetForm();
    };

    useEffect(() => {
        if (location.pathname === "/dashboard/hackathon/create") {
            setIsCreatePage(true);
        }
    }, [location]);

    const handleCloseModal = () => {
        setOpenImagePreview(false);
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
                                initialValues={{
                                    title: data?.title || "",
                                    tagline: data?.tagline || "",
                                    description: data?.description || "",
                                    participantCount:
                                        data?.participant_count || "",
                                    eventStart:
                                        convertDateToYYYYMMDD(
                                            String(data?.event_start)
                                        ) || null,
                                    eventEnd:
                                        convertDateToYYYYMMDD(
                                            String(data?.event_end)
                                        ) || null,
                                    applicationStart:
                                        convertDateToYYYYMMDD(
                                            String(data?.application_start)
                                        ) || null,
                                    applicationEnds:
                                        convertDateToYYYYMMDD(
                                            String(data?.application_ends)
                                        ) || null,
                                    orgId: data?.org_id || "",
                                    place: data?.place || "",
                                    districtId:
                                        getLocationIdByName(
                                            district,
                                            String(data?.district)
                                        ) || "",
                                    isOpenToAll: data?.is_open_to_all || false,
                                    formFields: [],
                                    event_logo: "",
                                    banner: "",
                                    website: data?.website || "",
                                    type: data?.type || ""
                                }}
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
                                                    <div
                                                        id="checkbox"
                                                        className={
                                                            styles.InputSet
                                                        }
                                                    >
                                                        <label
                                                            className={
                                                                styles.formLabel
                                                            }
                                                        >
                                                            Select fields for
                                                            application form
                                                        </label>
                                                    </div>
                                                    <div
                                                        role="group"
                                                        aria-labelledby="checkbox-group"
                                                        className={
                                                            styles.checkboxOuter
                                                        }
                                                    >
                                                        {Object.entries(
                                                            formData
                                                        ).map(
                                                            ([key, value]) => (
                                                                <label
                                                                    key={key}
                                                                    className={`${
                                                                        styles.checkBoxContainer
                                                                    } ${
                                                                        values.formFields.includes(
                                                                            key as never
                                                                        )
                                                                            ? styles.checked
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    <Field
                                                                        type="checkbox"
                                                                        name="formFields"
                                                                        className={
                                                                            styles.formCheckbox
                                                                        }
                                                                        style={{
                                                                            display:
                                                                                "none"
                                                                        }}
                                                                        value={
                                                                            key
                                                                        }
                                                                        checked={values.formFields.includes(
                                                                            key as never
                                                                        )}
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                    />
                                                                    {key}
                                                                </label>
                                                            )
                                                        )}
                                                    </div>
                                                </TabPanel>

                                                <TabPanel
                                                    className={styles.formGroup}
                                                ></TabPanel>

                                                <TabPanel
                                                    className={styles.formGroup}
                                                ></TabPanel>
                                            </div>
                                            <div className={styles.btns}>
                                                <button
                                                    onClick={handleBack}
                                                    className={styles.btn}
                                                    type="button"
                                                >
                                                    Go back
                                                </button>
                                                <button
                                                    onClick={handleNext}
                                                    className={styles.btn}
                                                    type="button"
                                                >
                                                    Next
                                                </button>
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
