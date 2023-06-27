import { AxiosError } from "axios";
import { privateGateway } from "../../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../../services/urls";

export const getFormFields = async (
    setFormData: React.Dispatch<React.SetStateAction<string>>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getHackathonFormData,
        );
        const defaultForm: any = response?.data;
        setFormData(defaultForm.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const createHackathon = async (
    title: string,
    tagline: string,
    description: string,
    participantCount: number,
    orgId: string,
	districtId: string,
	place: string,
	isOpenToAll: boolean,
	applicationStart: string,
	applicationEnds: string,
	eventStart: string,
	eventEnd: string,
	formFields: any
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.createHackathon,
            {
                title: title,
                tagline: tagline,
                description: description,
                participantCount: participantCount,
                orgId: orgId,
                districtId: districtId,
                place: place,
                isOpenToAll: isOpenToAll,
                applicationStart: applicationStart,
                applicationEnds: applicationEnds,
                eventStart: eventStart,
                eventEnd: eventEnd,
                status: "Draft",
                formFields: formFields
            }
        );
        const message: any = response?.data;
        console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
