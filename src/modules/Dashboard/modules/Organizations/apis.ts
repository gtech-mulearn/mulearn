import { privateGateway } from "@/MuLearnServices/apiGateways";
import { organizationRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { AxiosError } from "axios";

const ccc = ["College", "Company", "Community"] as const;

export const getOrganizations = async (
    activeTab: (typeof ccc)[number],
    setData: UseStateFunc<any>,
    page: number,
    selectedValue: number,
    setIsLoading: UseStateFunc<boolean>,
    setTotalPages?: UseStateFunc<any>,
    search?: string,
    sortID?: string
) => {
    setIsLoading(true);
    try {
        type CCC = Lowercase<(typeof ccc)[number]>;
        type resData = {
            response: {
                data: {
                    [T in `${CCC}`]: any;
                };
                pagination: {
                    [T in `${CCC}`]: {
                        totalPages: string;
                    };
                };
            };
        };

        const data = (
            await privateGateway.get(
                organizationRoutes.getOrganizationsAll + `${activeTab}/`,
                {
                    params: {
                        perPage: selectedValue,
                        pageIndex: page,
                        search: search,
                        sortBy: sortID,
                        org_type: activeTab
                    }
                }
            )
        ).data.response;

        setIsLoading(false);
        if (setTotalPages) setTotalPages(data.pagination.totalPages);
        setData(data.data);
    } catch (err: unknown) {
        setIsLoading(false);
    }
};

interface CountryProps {
    id: string;
    name: string;
    updated_at: string;
    created_at: string;
    updated_by: string;
    created_by: string;
}

export const getAffiliation = async (setAffiliationData: any) => {
    try {
        await privateGateway
            .get(organizationRoutes.getAffiliation)
            .then(response => {
                return response.data;
            })
            .then(data => {
                const affiliation: CountryProps[] = data.response.data;
                setAffiliationData(affiliation);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};
export const getCountry = async (setCountryData: any) => {
    try {
        await privateGateway
            .get(organizationRoutes.getLocation + "/countries/")
            .then(response => {
                return response.data;
            })
            .then(data => {
                const countries: CountryProps[] = data.response.data;
                setCountryData(countries);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export const getStates = async (
    country: string,
    setStatesData: any,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        await privateGateway
            .get(`${organizationRoutes.getLocation}/states/${country}/`)
            .then(response => {
                return response.data;
            })
            .then(data => {
                const states: CountryProps[] = data.response.data;

                setStatesData(states);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            const errorMsg = "Something went wrong!";
            toast({
                title: `Error`,
                description: errorMsg,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    }
};

export const getZones = async (
    country: string,
    state: string,
    setZonesData: any,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        await privateGateway
            .get(`${organizationRoutes.getLocation}/zones/${state}/`)
            .then(response => {
                return response.data;
            })
            .then(data => {
                const states: CountryProps[] = data.response.data;

                setZonesData(states);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            const errorMsg = "Something went wrong!";
            toast({
                title: `Error`,
                description: errorMsg,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    }
};

export const getDistricts = async (
    country: string,
    state: string,
    zone: string,
    setDistrictsData: any,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        await privateGateway
            .get(`${organizationRoutes.getLocation}/districts/${zone}/`)
            .then(response => {
                return response.data;
            })
            .then(data => {
                const districts: CountryProps[] = data.response.data;
                setDistrictsData(districts);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            const errorMsg = "Something went wrong!";
            toast({
                title: `Error`,
                description: errorMsg,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    }
};

export const createOrganization = async (
    title: string,
    code: string,
    country: string,
    state: string,
    zone: string,
    district: string,
    org_type: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    affiliation?: string,
    setIsSuccess?: any,
    setIsLoading?: any
) => {
    const addDataProps = () => {
        if (org_type === "College") {
            return {
                title: title,
                code: code,
                state: state,
                zone: zone,
                district: district,
                country: country,
                affiliation: affiliation,
                org_type: org_type
            };
        } else {
            return {
                title: title,
                code: code,
                state: state,
                zone: zone,
                district: district,
                country: country,
                org_type: org_type
            };
        }
    };

    try {
        setIsLoading(true);
        const response = await privateGateway.post(
            organizationRoutes.postAddOrganization,
            addDataProps()
        );
        toast({
            title: "Organizations created",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        const message: any = response?.data;
        setIsSuccess(true);
        setIsLoading(false);
    } catch (error: any) {
        setIsLoading(true);
        setTimeout(function () {
            setIsLoading(false);
        }, 2000);
        if (error.response) {
            const errorMsg =
                error.response.data.message.general[0].code[0] ||
                "Something went wrong!";
            toast({
                title: `Error`,
                description: errorMsg,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        } else {
            //   toast({
            //     title: "Error occurred",
            //     description: error.message,
            //     status: "error",
            //     duration: 3000,
            //     isClosable: true,
            //   });
        }
    }
};
// const navigate = useNavigate()

export const updateOrganization = async (
    title: string,
    code: string,
    oldCode: string,
    district: string,
    org_type: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    affiliation?: string,
    setIsSuccess?: any,
    setIsLoading?: any
) => {
    // const addDataProps = () => {
    //     if (org_type === "College") {
    //         return {
    //             title: title,
    //             code: code,
    //             state: state,
    //             zone: zone,
    //             district: district,
    //             country: country,
    //             affiliation: affiliation,
    //             org_type: org_type
    //         };
    //     } else {
    //         return {
    //             title: title,
    //             code: code,
    //             state: state,
    //             zone: zone,
    //             district: district,
    //             country: country,
    //             org_type: org_type
    //         };
    //     }
    // };

    try {
        setIsLoading(true);
        const response = await privateGateway.put(
            `${organizationRoutes.putUpdateOrganization}${oldCode}/`,
            {
                title: title,
                code: code,
                district: district,
                affiliation: affiliation,
                org_type: org_type
            }
        );

        if (response.status === 200) {
            toast({
                title: "Organizations Updated",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            setIsSuccess(true);
            setIsLoading(false);
        }
    } catch (error: any) {
        setIsLoading(true);
        setTimeout(function () {
            setIsLoading(false);
        }, 1000);
        if (error.response) {
            const errorMsg =
                error.response.data.message.general[0] ||
                "Something went wrong!";
            toast({
                title: `Error`,
                description: errorMsg,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        } else {
            toast({
                title: "Error occurred",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    }
};

export const deleteOrganization = async (
    code: any,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        const response = await privateGateway.delete(
            `${organizationRoutes.deleteOrgnaization}${code}`
        );
        const message: any = response?.data;
        toast({
            title: "Organizations Deleted",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export const getInfo = async (code: string) => {
    try {
        const response = await privateGateway.get(
            `${organizationRoutes.postGetInfo}${code}/`
        );
        // console.log("api", response.data.response[0]);
        return response.data.response[0];
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};
