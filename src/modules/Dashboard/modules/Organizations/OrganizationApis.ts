import { privateGateway } from "@/MuLearnServices/apiGateways";
import { organizationRoutes } from "@/MuLearnServices/urls";

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
        if (setTotalPages) {
            setTotalPages(data.pagination.totalPages);
        }
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
        throw err;
    }
};

export const addNewOrganization = async (data: {
    country: string;
    state: string;
    district: string;
    affiliation: string;
    code: string;
    org_type: string;
    title: string;
}) => {
    if (data.org_type !== "College") {
        delete (data as any).affiliation;
    }
	console.log(data);
    try {
        const response = await privateGateway.post(organizationRoutes.createOrganisation, data);
        return response?.data;

    } catch (err: any) {
        throw err.response.data;
    }
};

export const getOrganizationDetails = async (id: string) => {
    try {
        const response = await privateGateway.get(organizationRoutes.getOrganisationDetails + id + "/");
        console.log(response?.data.response[0]);
        return response?.data.response[0];
    } catch (err: any) {
        throw err.response.data;
    }
};

export const editOrganization = async (data: {
    country: string;
    state: string;
    district: string;
    affiliation: string;
    code: string;
    org_type: string;
    title: string;
}, code: string) => {
    if (data.org_type !== "College") {
        delete (data as any).affiliation;
    }
    try {
        const response = await privateGateway.put(
            organizationRoutes.editOrganisation + code + "/",
            data
        );
        return response?.data;
    } catch (err: any) {
        throw err.response.data;
    }
};

export const deleteOrganization = async (code: string) => {
    try {
        const response = await privateGateway.delete(
            `${organizationRoutes.deleteOrgnaization}${code}/`
        );
        const message: any = response?.data;
        return message;
    } catch (err: unknown) {
        throw err;
    }
};