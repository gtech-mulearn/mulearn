import { Formik } from "formik";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import styles from "./UserEndgoals.module.css";
import { Form } from "react-router-dom";
import { useState } from "react";
import muBrand from "/src/modules/Common/Authentication/assets/µLearn.png";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

export default function UserEndgoal() {
    const [initialValues, setInitialValues] = useState({
        endGoal: ""
    });
    const onSubmit = async (values: any) => {
        console.log("values", values);
    };
    const [selectedEndgoal, setSelectedEndgoal] = useState<string>("");
    const endgoalOptions = [
        {
            title: "Job",
            value: "job"
        },
        {
            title: "Higher Education",
            value: "higher_education"
        },
        {
            title: "Entrepreneurship",
            value: "enterpreneurship"
        },
        {
            title: "Gig Works",
            value: "gig"
        },
        {
            title: "Other",
            value: "other"
        }
    ];

    return <></>;
}
