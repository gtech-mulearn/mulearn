import { AxiosError } from "axios";
import { privateGateway, publicGateway } from "../../../../../services/apiGateways";
import { dashboardRoutes, onboardingRoutes } from "../../../../../services/urls";
import { HackList } from "../User/Hackathon";
import { SetStateAction } from "react";
import { ToastId, UseToastOptions, useToast } from "@chakra-ui/react";

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

export const getHackDetails = async (
    setEditData: React.Dispatch<SetStateAction<HackList | undefined>>,
    id: string | undefined
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getHackathons + id
        );
        const defaultForm: any = response?.data;
        setEditData(defaultForm.response);
		console.log(defaultForm.response);
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
	formFields: any,
	logo: any,
    banner:any,
    type:string,
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.createHackathon,
            {
                title: title,
                tagline: tagline,
                description: description,
                participant_count: participantCount,
                org_id: orgId,
                districtId: districtId,
                place: place,
                is_open_to_all: isOpenToAll,
                application_start: applicationStart,
                application_ends: applicationEnds,
                event_start: eventStart,
                event_end: eventEnd,
                status: "Draft",
                form_fields: formFields,
                event_logo: logo,
                banner: banner,
                type: type,
            },
            {
                maxBodyLength: Infinity,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
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

export const getDistrict = (
    setDistrict: any,
    state: any
) => {
    publicGateway
        .post(onboardingRoutes.districtList, state)
        .then(response => {
            setDistrict(
                response.data.response.districts
                    .sort((a: any, b: any) => a.name.localeCompare(b.name))
                    .map((sate: any) => ({
                        value: sate.id,
                        label: sate.name
                    }))
            );
        })
        .catch(error => {
            console.log(error.response);
        });
};

export const deleteHackathon = async (
    id: string,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        const response = await privateGateway.delete(
            dashboardRoutes.deleteHackathon + id + "/"
        );
        const message: any = response?.data;
        console.log(message);
        toast({
            title: "Delete Successful",
            description: "Hackathon has been deleted",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const addOrganizer = async (
    id: string | undefined,
    muid: string,
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.addOrganizer + id + "/",
            {
                mu_id: muid,
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