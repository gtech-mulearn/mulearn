import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./Hackathon.module.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import FormikReactSelect, {
    FormikTextAreaWhite,
    FormikTextInputWhite,
    Option
} from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { useEffect, useState } from "react";
import {
    createHackathon,
    editHackathon,
    getAllDistricts,
    getAllInstitutions,
    getFormFields,
    getHackDetails
} from "../services/HackathonApis";
import { FiUploadCloud } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { useToast } from "@chakra-ui/react";
import { HackList } from "../services/HackathonInterfaces";
import { convertDateToYYYYMMDD } from "../../../utils/common";

/**
 * TODO: Move YUP Validations to another file.
 * TODO: Make the form things json and iterate and display, store the jsons in a separate file.
 */
const options = [
    { label: "Offline", value: "offline" },
    { label: "Online", value: "online" },
];

const HackathonCreate = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const [formData, setFormData] = useState("");
    const [temp, setTemp] = useState(false);
    const [edit, setEdit] = useState(false);
    const [data, setData] = useState<HackList>();
    const [district, setDistrict] = useState<Option[]>([]);
    const [institutions, setInstitutions] = useState<Option[]>([]);
    const [institutionsChunks, setInstitutionsChunks] = useState<Option[][]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
    const { id } = useParams();
    const toast = useToast()
    const navigate = useNavigate()

    useEffect(() => {
        if (id !== undefined) {
            getHackDetails(setData, id);
            setTimeout(() => {
                setTemp(true)
            }, 3000);
			setEdit(true);
        }
        else {
            setTemp(true)
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
        console.log(institutions)
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
        tagline: Yup.string()
            .min(2, "Too Short!")
            .max(100, "Too Long!"),
        // .required("Required"),
        orgId: Yup.string().min(2, "Too Short!"),
        place: Yup.string().min(2, "Too Short!"),
        districtId: Yup.string().min(2, "Too Short!"),
        type: Yup.string().min(2, "Too Short!"),
        isOpenToAll: Yup.boolean(),
        description: Yup.string().min(5, "Too Short!"),
        eventStart: Yup.date(),
        eventEnd: Yup.date(),
        applicationStart: Yup.date(),
        applicationEnds: Yup.date(),
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

    const handleSubmit = (values: any, { resetForm }: any) => {
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

        let a = values.applicationStart
            ? `${values.applicationStart}T00:00:00Z`
            : "";
        let b = values.applicationEnds
            ? `${values.applicationEnds}T00:00:00Z`
            : "";
        let c = values.eventStart ? `${values.eventStart}T00:00:00Z` : "";
        let d = values.eventEnd ? `${values.eventEnd}T00:00:00Z` : "";

        console.log(selectedFields);

        // Convert selectedFields object to a JSON string and then parse it to get the desired format
        const formattedFormFields = JSON.stringify(selectedFields);
        console.log(formattedFormFields);

        {edit
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
				toast,
            )}
        resetForm();
        setTimeout(() => {
            navigate("/hackathon");
        }, 2000);
    };

    return (
        <>
            {temp ? (
                <div className={styles.container}>
                    <div className={styles.topText}>
                        <h1 className={styles.dashLine}>Lets Get Started</h1>
                        <button
                            type="submit"
                            form="hackathon"
                            className={styles.btn}
                        >
                            Save & Finish later
                        </button>
                    </div>

                    <div>
                        <div className={styles.hackNav}>
                            <div className={styles.starImg}>
                                <img
                                    src="/src/modules/Dashboard/modules/Hackathon/Assets/Star 1.png"
                                    alt=""
                                />
                                <img
                                    src="/src/modules/Dashboard/modules/Hackathon/Assets/Star 2.png"
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
                                    eventStart: convertDateToYYYYMMDD(String(data?.event_start)) || "",
                                    eventEnd: convertDateToYYYYMMDD(String(data?.event_end)) || "",
                                    applicationStart:
                                        convertDateToYYYYMMDD(String(data?.application_start)) || "",
                                    applicationEnds:
                                        convertDateToYYYYMMDD(String(data?.application_ends)) || "",
                                    orgId: data?.organisation || "",
                                    place: data?.place || "",
                                    districtId: data?.district || "",
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
                                                <TabPanel className={styles.formGroupStart}>
                                                    <div className={styles.formGroupInitial}>
                                                        <FormikTextInputWhite
                                                            label="Name"
                                                            name="title"
                                                            type="text"
                                                            className={
                                                                styles.placeholder
                                                            }
                                                            placeholder="what you are calling your hackathon"
                                                        />
                                                        <FormikTextInputWhite
                                                            label="Tagline"
                                                            name="tagline"
                                                            type="text"
                                                            className={
                                                                styles.placeholder
                                                            }
                                                            placeholder="eg: worlds realest hackathon"
                                                        />
                                                        <FormikTextInputWhite
                                                            label="Approx. Participants"
                                                            name="participantCount"
                                                            type="number"
                                                            className={
                                                                styles.placeholder
                                                            }
                                                            placeholder="eg: 250."
                                                        />
                                                    </div>
                                                    <FormikTextAreaWhite
                                                        label="About"
                                                        name="description"
                                                        className={
                                                            styles.hackTectArea
                                                        }
                                                        placeholder="explain something"
                                                    />
                                                </TabPanel>

                                                <TabPanel
                                                    className={styles.formGroup}
                                                >
                                                    <FormikTextInputWhite
                                                        label="Registration Start Date"
                                                        name="applicationStart"
                                                        className={
                                                            styles.placeholder
                                                        }
                                                        type="date"
                                                    />
                                                    <FormikTextInputWhite
                                                        label="Registration End Date"
                                                        name="applicationEnds"
                                                        className={
                                                            styles.placeholder
                                                        }
                                                        type="date"
                                                    />
                                                    <FormikTextInputWhite
                                                        label="Hackathon Start Date"
                                                        name="eventStart"
                                                        className={
                                                            styles.placeholder
                                                        }
                                                        type="date"
                                                    />
                                                    <FormikTextInputWhite
                                                        label="Hackathon End Date"
                                                        name="eventEnd"
                                                        className={
                                                            styles.placeholder
                                                        }
                                                        type="date"
                                                    />
                                                </TabPanel>

                                                <TabPanel
                                                    className={styles.formGroup}
                                                >
                                                    <FormikReactSelect
                                                        name="orgId"
                                                        options={institutions}
                                                        label={"Organization"}
                                                        isClearable
                                                        isSearchable
                                                    />
                                                    <FormikReactSelect
                                                        name="districtId"
                                                        options={district}
                                                        label={"District"}
                                                        isClearable
                                                        isSearchable
                                                    />
                                                    <FormikTextInputWhite
                                                        label="Place"
                                                        name="place"
                                                        placeholder="location of the hackathon"
                                                        type="text"
                                                    />
                                                    <FormikTextInputWhite
                                                        label="Website"
                                                        name="website"
                                                        placeholder="link for the event website"
                                                        type="text"
                                                    />
                                                    <FormikReactSelect
                                                        name="type"
                                                        options={options}
                                                        label={"Hackathon Type"}
                                                    />
                                                </TabPanel>

                                                <TabPanel>
                                                    <div className={styles.formGroupLogo}>
                                                        <div className={styles.InputSet}>
                                                            <label
                                                                className={styles.formLabel}
                                                            >
                                                                Banner
                                                            </label>
                                                            <div
                                                                className={
                                                                    styles.upload_area
                                                                }
                                                            >
                                                                <label
                                                                    htmlFor="file-upload1-input1"
                                                                    className={
                                                                        styles.upload_button
                                                                    }
                                                                >
                                                                    <FiUploadCloud
                                                                        className={
                                                                            styles.icon
                                                                        }
                                                                    />
                                                                    <p
                                                                        className={
                                                                            styles.text
                                                                        }
                                                                    >
                                                                        Click to choose
                                                                    </p>
                                                                    <span
                                                                        className={
                                                                            styles.text1
                                                                        }
                                                                    >
                                                                        60x12 .png or .jpeg
                                                                        5MB max
                                                                    </span>
                                                                </label>
                                                                <input
                                                                    id="file-upload1-input1"
                                                                    type="file"
                                                                    accept=".png,.jepg,.jpg"
                                                                    name="banner"
                                                                    onChange={(
                                                                        event: any
                                                                    ) => {
                                                                        if (
                                                                            event.target
                                                                                .files
                                                                        ) {
                                                                            setFieldValue(
                                                                                "banner",
                                                                                event.target
                                                                                    .files[0]
                                                                            );
                                                                        }
                                                                        setSelectedFiles(
                                                                            event.target
                                                                                .files[0]
                                                                        );
                                                                    }}
                                                                    style={{
                                                                        opacity: 0,
                                                                        position:
                                                                            "absolute",
                                                                        top: 100,
                                                                        left: 0
                                                                    }}
                                                                />
                                                            </div>
                                                            {errors.banner && (
                                                                <div
                                                                    className={styles.error}
                                                                >
                                                                    {errors.banner}
                                                                </div>
                                                            )}
                                                            {selectedFiles && (
                                                                <div
                                                                    className={
                                                                        styles.fileInfo
                                                                    }
                                                                >
                                                                    <span>
                                                                        {selectedFiles.name}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className={styles.InputSet}>
                                                            <label
                                                                className={styles.formLabel}
                                                            >
                                                                Event Logo
                                                            </label>
                                                            <div
                                                                className={
                                                                    styles.upload_area
                                                                }
                                                            >
                                                                <label
                                                                    htmlFor="file-upload1-input"
                                                                    className={
                                                                        styles.upload_button
                                                                    }
                                                                >
                                                                    <FiUploadCloud
                                                                        className={
                                                                            styles.icon
                                                                        }
                                                                    />
                                                                    <p
                                                                        className={
                                                                            styles.text
                                                                        }
                                                                    >
                                                                        Click to choose
                                                                    </p>
                                                                    <span
                                                                        className={
                                                                            styles.text1
                                                                        }
                                                                    >
                                                                        300x124 .png or
                                                                        .jpeg 10MB max
                                                                    </span>
                                                                </label>
                                                                <input
                                                                    id="file-upload1-input"
                                                                    type="file"
                                                                    accept=".png,.jepg,.jpg"
                                                                    name="event_logo"
                                                                    onChange={(
                                                                        event: any
                                                                    ) => {
                                                                        if (
                                                                            event.target
                                                                                .files
                                                                        ) {
                                                                            setFieldValue(
                                                                                "event_logo",
                                                                                event.target
                                                                                    .files[0]
                                                                            );
                                                                        }
                                                                        setSelectedFile(
                                                                            event.target
                                                                                .files[0]
                                                                        );
                                                                    }}
                                                                    style={{
                                                                        opacity: 0,
                                                                        position:
                                                                            "absolute",
                                                                        top: 100,
                                                                        left: 0
                                                                    }}
                                                                />
                                                            </div>
                                                            {errors.event_logo && (
                                                                <div
                                                                    className={styles.error}
                                                                >
                                                                    {errors.event_logo}
                                                                </div>
                                                            )}
                                                            {selectedFile && (
                                                                <div
                                                                    className={
                                                                        styles.fileInfo
                                                                    }
                                                                >
                                                                    <span>
                                                                        {selectedFile.name}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className={styles.checker}>
                                                        <label className={styles.formLabel}>
                                                            Hackathon Open to all ?
                                                        </label>
                                                        <div className={styles.checkerInput}>
                                                            <input
                                                                type="checkbox"
                                                                name="isOpenToAll"
                                                            />
                                                        </div>
                                                    </div>
                                                </TabPanel>

                                                <TabPanel
                                                    className={styles.formGroupField}
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
                                                                    className={`${styles.checkBoxContainer
                                                                        } ${values.formFields.includes(
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
                </div >
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
