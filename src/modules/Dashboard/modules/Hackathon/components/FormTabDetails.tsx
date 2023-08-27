import FormikReactSelect, {
    FormikTextInputWhite
} from "@/MuLearnComponents/FormikComponents/FormikComponents";

import { Option } from "@/MuLearnComponents/FormikComponents/FormikComponents";

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
        <>
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
        </>
    );
};
