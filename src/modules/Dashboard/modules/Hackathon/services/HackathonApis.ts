import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { HackList, HackathonApplication } from "./HackathonInterfaces";
import { SetStateAction } from "react";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { Option } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { Data } from "@/MuLearnComponents/Table/Table";

export const getHackathons = async (
    setData: React.Dispatch<SetStateAction<HackList[]>>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getHackathons
        );
        const defaultForm: any = response?.data;
        setData(defaultForm.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

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
    banner: any,
    type: string,
    website: string,
    toast: (options?: UseToastOptions | undefined) => ToastId
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
                district_id: districtId,
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
                website: website
            },
            {
                maxBodyLength: Infinity,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
		toast({
            title: "Success",
            description: "Hackathon created.",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
			toast({
                title: "Error",
                description: "Failed to create new Hackathon.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            console.log(error.response);
        }
    }
};

export const editHackathon = async (
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
    banner: any,
    type: string,
    website: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    id: string | undefined
) => {
    try {
        const response = await privateGateway.put(
            dashboardRoutes.editHackathon + id + '/',
            {
                title: title,
                tagline: tagline,
                description: description,
                participant_count: participantCount,
                org_id: orgId,
                district_id: districtId,
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
                website: website
            },
            {
                maxBodyLength: Infinity,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        toast({
            title: "Success",
            description: "Hackathon updated.",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            toast({
                title: "Error",
                description: "Failed to update Hackathon.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
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
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.addOrganizer + id + "/",
            {
                mu_id: muid
            }
        );
        const message: any = response?.data;
        console.log(message);
		toast({
            title: "Success",
            description: "Organizer added successfully",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
			toast({
                title: "Error",
                description: "Failed to add new organizer.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
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
	setData: React.Dispatch<SetStateAction<HackathonApplication[]>>,
    id: string | undefined,
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getApplicationForm + id + "/"
        );
        const message: any = response?.data;
        console.log(message.response);
		setData(message.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const submitHackApplication = async (
	data: {
		name: string,
		gender: string,
		email: string,
		mobile: number,
		bio: string,
		college: string,
		experience: string,
		github: string,
		linkedin: string
	},
	id: string | undefined,
) => {
	try {
		if (!id) {
			throw new Error('id parameter is undefined');
		}
		return await privateGateway.post(
			dashboardRoutes.submitApplication,
			{
				hackathon_id: id,
				data: data
			}
		);
	} catch (err: unknown) {
		const error = err as AxiosError;
		if (error?.response) {
			throw error;
		}
	}
};

export const getOrganizers = async (
    setData: React.Dispatch<SetStateAction<Data[]>>,
    id: string | undefined
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getOrganizers + id + "/"
        );
        const message: any = response?.data;
        setData(message.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getParticipants = async (
    setData: React.Dispatch<SetStateAction<Data[]>>,
    id: string | undefined
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getApplicants + id + "/"
        );
        const message: any = response?.data;
        setData(message.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};       