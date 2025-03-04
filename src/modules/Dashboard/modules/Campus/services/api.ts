import { AxiosError } from "axios";
import { publicGateway } from "@/MuLearnServices/apiGateways"; 
import { dashboardRoutes } from "@/MuLearnServices/urls"; 

interface Campus {
  id: string;
  title: string;
  code: string;
  affiliation?: string;
  district: string;
  zone: string;
  state: string;
  country: string;
  user_count: number;
}

interface Pagination {
  count: number;
  totalPages: number;
  isNext: boolean;
  isPrev: boolean;
  nextPage: number;
}

interface ApiResponseData {
  data: Campus[];
  pagination: Pagination;
}

interface ApiResponse {
  hasError: boolean;
  statusCode: number;
  message: {
    general: string[];
  };
  response: ApiResponseData;
}

interface GetCampusParams {
  search?: string;
  pageIndex?: number;
  perPage?: number;
  type?: string;
}


const getCollegeList = async ({
  search = "",
  pageIndex = 1,
  perPage,
}: Omit<GetCampusParams, "type">): Promise<ApiResponseData> => {
  try {
    const response = await publicGateway.get<ApiResponse>(dashboardRoutes.getCollegeList, {
      params: {
        search: search.trim(),
        pageIndex,
        perPage: perPage || 10,
      },
    });

    const responseData = response.data;

    if (responseData.hasError) {
      throw new Error(
        responseData.message.general[0] || "Unknown error occurred while fetching colleges"
      );
    }

    if (!responseData.response?.data || !responseData.response?.pagination) {
      throw new Error("Invalid response format from server");
    }

    return responseData.response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;

    console.error("Failed to fetch colleges:", {
      message: error instanceof Error ? error.message : "Unknown error",
      status: axiosError?.response?.status,
      responseData: axiosError?.response?.data,
      params: { search, pageIndex, perPage },
    });

    if (axiosError.response) {
      const status = axiosError.response.status;
      const apiError = axiosError.response.data;

      if (status === 400) {
        throw new Error(apiError?.message.general[0] || "Invalid request parameters");
      }
      if (status === 401) {
        throw new Error("Authentication required to fetch colleges");
      }
      if (status === 403) {
        throw new Error("Insufficient permissions to access college data");
      }

      throw new Error(
        apiError?.message.general[0] || `Failed to fetch colleges: Server error ${status}`
      );
    }

    throw new Error("Network error occurred while fetching colleges");
  }
};


const getSchoolList = async ({
  search = "",
  pageIndex = 1,
  perPage,
}: Omit<GetCampusParams, "type">): Promise<ApiResponseData> => {
  try {
    const response = await publicGateway.get<ApiResponse>(dashboardRoutes.getSchoolList, {
      params: {
        search: search.trim(),
        pageIndex,
        perPage: perPage || 10,
      },
    });

    const responseData = response.data;

    if (responseData.hasError) {
      throw new Error(
        responseData.message.general[0] || "Unknown error occurred while fetching schools"
      );
    }

    if (!responseData.response?.data || !responseData.response?.pagination) {
      throw new Error("Invalid response format from server");
    }

    return responseData.response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;

    console.error("Failed to fetch schools:", {
      message: error instanceof Error ? error.message : "Unknown error",
      status: axiosError?.response?.status,
      responseData: axiosError?.response?.data,
      params: { search, pageIndex, perPage },
    });

    if (axiosError.response) {
      const status = axiosError.response.status;
      const apiError = axiosError.response.data;

      if (status === 400) {
        throw new Error(apiError?.message.general[0] || "Invalid request parameters");
      }
      if (status === 401) {
        throw new Error("Authentication required to fetch schools");
      }
      if (status === 403) {
        throw new Error("Insufficient permissions to access school data");
      }

      throw new Error(
        apiError?.message.general[0] || `Failed to fetch schools: Server error ${status}`
      );
    }

    throw new Error("Network error occurred while fetching schools");
  }
};


export const getCampuses = async ({
  search = "",
  pageIndex = 1,
  perPage,
  type = "college",
}: GetCampusParams): Promise<ApiResponseData> => {
  try {
    if (type === "all") {
      const [collegeData, schoolData] = await Promise.all([
        getCollegeList({ search, pageIndex, perPage }),
        getSchoolList({ search, pageIndex, perPage }),
      ]);

      const combinedData = [...collegeData.data, ...schoolData.data];

      const totalCount = collegeData.pagination.count + schoolData.pagination.count;
      const effectivePerPage = perPage || 10;
      const totalPages = Math.ceil(totalCount / effectivePerPage);
      const isNext = pageIndex < totalPages;
      const isPrev = pageIndex > 1;

      return {
        data: combinedData.slice(0, effectivePerPage), 
        pagination: {
          count: totalCount,
          totalPages,
          isNext,
          isPrev,
          nextPage: isNext ? pageIndex + 1 : pageIndex,
        },
      };
    } else if (type === "college") {
      return getCollegeList({ search, pageIndex, perPage });
    } else if (type === "school") {
      return getSchoolList({ search, pageIndex, perPage });
    } else {
      throw new Error("Invalid type parameter. Use 'college', 'school', or 'all'.");
    }
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;

    console.error("Failed to fetch campuses:", {
      message: error instanceof Error ? error.message : "Unknown error",
      status: axiosError?.response?.status,
      responseData: axiosError?.response?.data,
      params: { search, pageIndex, perPage, type },
    });

    throw error;
  }
};

