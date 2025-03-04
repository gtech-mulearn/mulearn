import { privateGateway } from "@/MuLearnServices/apiGateways";
import { organizationRoutes } from "@/MuLearnServices/urls";

export const getUnverifiedOrganizations = async (
    setData: UseStateFunc<any>,
    setIsLoading: UseStateFunc<boolean>
) => {
    setIsLoading(true);
    try {
        const data = (
            await privateGateway.get(
                organizationRoutes.getUnverifiedOrganizations
            )
        ).data.response;
        setIsLoading(false);
        setData(data);
    } catch (err: unknown) {
        setIsLoading(false);
    }
};
