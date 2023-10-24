import FormikReactSelect, {
    FormikTextInputWhite
} from "@/MuLearnComponents/FormikComponents/FormikComponents";

import { Option } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import {motion} from "framer-motion"
import { slideLeft } from "@/AnimatedComponents/slider";
import styles from "../pages/HackathonCreate.module.css";

type FormTabDetailsProps = {
    institutions: Option[];
    district: Option[];
};

const options = [
    { label: "Offline", value: "offline" },
    { label: "Online", value: "online" }
];

export const FormTabDetails = ({
    institutions,
    district
}: FormTabDetailsProps) => {
    return (
        <motion.div {...slideLeft} className={styles.formGroup}>
            <FormikReactSelect
                label={<span className="requiredLabel">Organization</span> as unknown as string}
                name="orgId"
                options={institutions}
                isClearable
                isSearchable
            />
            <FormikReactSelect
                label={<span className="requiredLabel">District</span> as unknown as string}
                name="districtId"
                options={district}
                isClearable
                isSearchable
            />
            <FormikTextInputWhite
                label={<span className="requiredLabel">Place</span> as unknown as string}
                name="place"
                placeholder="location of the hackathon"
                type="text"
            />
            <FormikTextInputWhite
                label={<span className="requiredLabel">Website</span>}
                name="website"
                placeholder="link for the event website"
                type="text"
            />
            <FormikReactSelect
                label={<span className="requiredLabel">Hackathon Type</span> as unknown as string}
                name="type"
                options={options}
            />
        </motion.div>
    );
};
