import axios, { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { UseToastOptions, createStandaloneToast } from "@chakra-ui/react";
import { Option } from "@/MuLearnComponents/FormikComponents/FormikComponents";
import { Data } from "@/MuLearnComponents/Table/Table";
import { NavigateFunction } from "react-router-dom";
import {
    ColumnDefinition,
    HackList,
    HackathonApplication
} from "./HackathonInterfaces";
import { formatErrorMessage, transformData } from "./HackathonUtils";

const { toast } = createStandaloneToast();

export const getHackathons = async (setData: UseStateFunc<HackList[]>) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getHackathons
        );
        const defaultForm: any = response?.data;
        setData(defaultForm.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export const getFormFields = async (setFormData: UseStateFunc<string>) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getHackathonFormData
        );
        const defaultForm: any = response?.data;
        setFormData(defaultForm.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export function getHackDetails(id: string): Promise<HackList> {
    return new Promise(async (resolve, reject) => {
        try {
            const response = (await privateGateway.get(
                dashboardRoutes.getHackathonInfo + id
            )) as APIResponse<HackList>;
            resolve(response.data.response);
            // setEditData(data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                reject(err.message);
            } else {
                const mess = err as APIError<string>;
                reject(mess?.response?.data?.message || "Something went wrong");
            }
        }
    });
}

export function createHackathon(
    hackathonData: HackList,
    formFields: any
): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            // Check each property in hackathonData and set it to null if it's an empty string
            for (const key in hackathonData) {
                if ((hackathonData as any)[key] === " ") {
                    (hackathonData as any)[key] = null;
                }
            }

            const response = (await privateGateway.post(
                dashboardRoutes.createHackathon,
                {
                    title: hackathonData.title,
                    tagline: hackathonData.tagline,
                    description: hackathonData.description,
                    participant_count: hackathonData.participant_count,
                    org_id: hackathonData.org_id,
                    district_id: hackathonData.district_id,
                    place: hackathonData.place,
                    is_open_to_all: hackathonData.is_open_to_all,
                    application_start: hackathonData.application_start,
                    application_ends: hackathonData.application_ends,
                    event_start: hackathonData.event_start,
                    event_end: hackathonData.event_end,
                    status: "Draft",
                    event_logo: hackathonData.event_logo,
                    banner: hackathonData.banner,
                    type: hackathonData.type,
                    website: hackathonData.website,
                    form_fields: formFields
                },
                {
                    maxBodyLength: Infinity,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )) as APIResponse<{ hackathon_id: string }, { general: string[] }>;

            resolve(response.data.response.hackathon_id);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                reject(err.message);
            } else {
                const mess = err as APIError<string>;
                reject(mess?.response?.data?.message || "Something went wrong");
            }
        }
    });
}

export function editHackathon(
    hackathonData: HackList,
    formFields: any
): Promise<string> {
    return new Promise(async (resolve, reject) => {
		if(hackathonData.tagline === ""){
			hackathonData.tagline = null;
		}
        try {
            (await privateGateway.put(
                dashboardRoutes.editHackathon + hackathonData.id + "/",
                {
                    title: hackathonData.title,
                    tagline: hackathonData.tagline,
                    description: hackathonData.description,
                    participant_count: hackathonData.participant_count,
                    org_id: hackathonData.org_id,
                    district_id: hackathonData.district_id,
                    place: hackathonData.place,
                    is_open_to_all: hackathonData.is_open_to_all,
                    application_start: hackathonData.application_start,
                    application_ends: hackathonData.application_ends,
                    event_start: hackathonData.event_start,
                    event_end: hackathonData.event_end,
                    status: hackathonData.status,
                    event_logo: hackathonData.event_logo,
                    banner: hackathonData.banner,
                    type: hackathonData.type,
                    website: hackathonData.website,
                    form_fields: formFields
                },
                {
                    maxBodyLength: Infinity,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            )) as APIResponse<{}, { general: string[] }>;

            resolve(hackathonData.id!);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                reject(err.message);
            } else {
                const mess = err as APIError<string[]>;
                reject(
                    mess?.response?.data?.message[0] || "Something went wrong"
                );
            }
        }
    });
}

export const getAllDistricts = (setDistrict: UseStateFunc<Option[]>) => {
    privateGateway
        .get(dashboardRoutes.getAllDistricts)
        .then(response => {
            setDistrict(
                response.data.response
                    .sort((a: any, b: any) => a.name.localeCompare(b.name))
                    .map((sate: any) => ({
                        value: sate.id,
                        label: sate.name
                    }))
            );
        })
        .catch(error => {});
};

export const getAllInstitutions = (
    setInstitutions: UseStateFunc<Option[][]>
) => {
    privateGateway
        .get(dashboardRoutes.getAllOrganisations)
        .then(response => {
            setInstitutions(
                response.data.response.map((sate: any) => ({
                    value: sate.id,
                    label: sate.title
                }))
            );
        })
        .catch(error => {});
};

export const deleteHackathon = async (id: string) => {
    try {
        const response = await privateGateway.delete(
            dashboardRoutes.deleteHackathon + id + "/"
        );
        const message: any = response?.data;
        toast({
            title: "Delete Successful",
            description: "Hackathon has been deleted",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export const addOrganizer = async (id: string | undefined, muid: string) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.addOrganizer + id + "/",
            {
                mu_id: muid
            }
        );
        const message: any = response?.data;
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
        }
    }
};

export const publishHackathon = async (id: string, status: string, toast: (options?: UseToastOptions | undefined) => any) => {
    let a = status === "Draft" ? "Published" : "Draft";

    try {
            const response = await privateGateway.put(
                dashboardRoutes.publishHackathon + id + "/",
                { status: a }
            );
            const data: any = response?.data;
        } catch (err: unknown) {
            const error:any = err as AxiosError;
			let msg =
                error?.response?.data?.message.non_field_errors[0] ||
                "Make sure all fields are filled";
			toast({
				title: "Error",
				description: formatErrorMessage(msg),
				status: "error",
				duration: 5000,
				isClosable: true
			})
        }
}  
export const getApplicationForm = async (
    setData: UseStateFunc<HackathonApplication[]>,
    id: string | undefined
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getApplicationForm + id + "/"
        );
        const message: any = response?.data;
        setData(message.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export const submitHackApplication = async (
    data: {
        name: string;
        gender: string;
        email: string;
        mobile: number;
        bio: string;
        college: string;
        experience: string;
        github: string;
        linkedin: string;
    },
    id: string | undefined,
    navigate: NavigateFunction,
) => {
    try {
        if (!id) {
            throw new Error("id parameter is undefined");
        }
        const response = await privateGateway.post(
            dashboardRoutes.submitApplication,
            {
                hackathon_id: id,
                data: data
            }
        );

        // Display a success toast
        navigate("/dashboard/hackathon");
        toast({
            title: "Submitted Successfully",
            description:
                "Hackathon application has been successfully submitted.",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        return response; // You might want to return the response from the API call
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response?.status === 400) {
            navigate("/dashboard/hackathon");
        }
        if (error?.response) {
            toast({
                title: "Something went wrong",
                description: "",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            throw error;
        }
    }
};

export const getOrganizers = async (
    setData: UseStateFunc<Data[]>,
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
    }
};

export const getParticipants = async (
    setData: UseStateFunc<Data[]>,
    setColumnHead: UseStateFunc<ColumnDefinition[]>,
    id: string | undefined
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getApplicants + id + "/"
        );
        const message: any = response?.data;
        const { transformedData, columnOrder } = transformData(
            message.response
        );
        setData(transformedData);
        setColumnHead(columnOrder);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};
