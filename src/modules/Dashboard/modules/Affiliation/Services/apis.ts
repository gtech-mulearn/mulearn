import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";

type affiliationData = UseStateFunc<any>;
type hasValidationError = UseStateFunc<{
    error: boolean;
    message: string;
}>;

export const getAffiliation = (
    setAffiliationData: affiliationData,
    page: number,
    selectedValue: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string,
    setLoading?: UseStateFunc<boolean>
) => {
    setLoading && setLoading(true);
    privateGateway
        .get(dashboardRoutes.getAffiliation, {
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID
            }
        })
        .then(
            (
                response: APIResponse<{
                    data: any[];
                    pagination: { totalPages: number };
                }>
            ) => {
                const affiliationData = response.data.response.data;
                setAffiliationData(affiliationData);
                if (setTotalPages)
                    setTotalPages(response.data.response.pagination.totalPages);
            }
        )
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setLoading && setLoading(false);
        });
};

export const createAffiliation = (
    affiliationData: any,
    formik: any
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        privateGateway
            .post(dashboardRoutes.createAffiliation, affiliationData)
            .then(response => {
                resolve(true);
                toast.success("Affiliation Created Successfully");
            })
            .catch((error: APIError<{ general: string[] }>) => {
                reject(false);
                error?.response?.data?.message?.general?.length != 0 &&
                    toast.error(error.response.data.message.general[0]);
                if (
                    error.response.data.message &&
                    Object.keys(error.response.data.message).length > 0
                ) {
                    Object.entries(error.response.data.message).forEach(
                        ([fieldName, errorMessage]) => {
                            if (Array.isArray(errorMessage)) {
                                formik.setFieldError(
                                    fieldName,
                                    errorMessage?.join(", ") || ""
                                );
                            }
                        }
                    );
                }
            });
    });
};

export const editAffiliation = (
    id: string,
    affiliationEditedData: any,
    formik: any
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        privateGateway
            .put(
                dashboardRoutes.editAffiliation.replace("${affiliationId}", id),
                affiliationEditedData
            )
            .then(response => {
                resolve(true);

                toast.success("Affiliation Edited Successfully");
            })
            .catch(error => {
                reject(false);
                if (
                    error.response.data.message &&
                    Object.keys(error.response.data.message).length > 0
                ) {
                    Object.entries(error.response.data.message).forEach(
                        ([fieldName, errorMessage]) => {
                            if (Array.isArray(errorMessage)) {
                                formik.setFieldError(
                                    fieldName,
                                    errorMessage?.join(", ") || ""
                                );
                            }
                        }
                    );
                }
                error.response.data.message.general.length != 0 &&
                    toast.error(error.response.data.message.general[0]);
            });
    });
};

export const deleteAffiliation = (id: string) => {
    privateGateway
        .delete(
            dashboardRoutes.deleteAffiliation.replace("${affiliationId}", id)
        )
        .then(response => {
            toast.success("Affiliation Deleted Successfully");
        })
        .catch(error => {
            toast.error("Affiliation Not Deleted");
        });
};
