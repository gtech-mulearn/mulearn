import { AxiosError } from "axios";
import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, onboardingRoutes } from "@/MuLearnServices/urls";
import { HackList } from "../User/Hackathon";
import { SetStateAction } from "react";
import { ToastId, UseToastOptions, useToast } from "@chakra-ui/react";
import { Option } from "@/MuLearnComponents/FormikComponents/FormikComponents";

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
            dashboardRoutes.getHackathonInfo + id
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
	website: string,
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.createHackathon,
            {
                title: title,
                tagline: tagline,
                description: description,
                participant_count: participantCount,
                organisation: orgId,
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
				website: website,
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

export const getAllDistricts = (
    setDistrict: React.Dispatch<React.SetStateAction<Option[]>>
) => {
    privateGateway
        .get(dashboardRoutes.getAllDistricts)
        .then(response => {
            console.log(response.data.response);
            setDistrict(
                response.data.response
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

export const getAllInstitutions = (
    setInstitutions: React.Dispatch<React.SetStateAction<Option[][]>>
) => {
    privateGateway
        .get(dashboardRoutes.getAllOrganisations)
        .then(response => {
            console.log(response.data.response);
            setInstitutions(
                response.data.response
                    .map((sate: any) => ({
                        value: sate.id,
                        label: sate.title
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

export const publishHackathon = async (
    id: string,
	status: string,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
	let a = status === "Draft" ? "Published" : "Draft";
    try {
        const response = await privateGateway.put(
            dashboardRoutes.publishHackathon + id + "/", {
				status: a
			}
        );
        const message: any = response?.data;
        console.log(message);
        toast({
            title: "Change Successful",
            description: "Hackathon status has been changed.",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
			toast({
                title: "Failed to make changes",
                description: "Make sure all fields are filled.",
                status: "error",
                duration: 5000,
                isClosable: true
            });
            console.log(error.response);
        }
    }
};

export const getApplicationForm = async (
    id: string | undefined,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getApplicationForm + id + "/"
        );
        const message: any = response?.data;
        console.log(message);
        toast({
            title: "Change Successful",
            description: "Hackathon status has been changed.",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            toast({
                title: "Failed to make changes",
                description: "Make sure all fields are filled.",
                status: "error",
                duration: 5000,
                isClosable: true
            });
            console.log(error.response);
        }
    }
};