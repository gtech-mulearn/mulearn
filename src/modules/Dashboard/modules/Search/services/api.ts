import { publicGateway } from "@/MuLearnServices/apiGateways"
import { dashboardRoutes } from "@/MuLearnServices/urls"
import { AxiosError } from 'axios';

interface Organization {
  id: string;
  title: string;
  code: string;
  org_type: 'College' | 'Community' | 'Company';
}

interface InterestGroup {
  id: string;
  name: string;
}

interface User {
  full_name: string;
  muid: string;
  interest_groups: InterestGroup[];
  organizations: Organization[];
  profile_pic: string | null;
  karma: string;
}

interface Pagination {
  count: number;
  totalPages: number;
  isNext: boolean;
  isPrev: boolean;
  nextPage: number;
}

interface ApiResponseData {
  data: User[];
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

interface GetUsersParams {
  search?: string;
  role?: string;
  pageIndex?: number;
  perPage?: number;
}


export const getUsers = async ({
  search = '',
  role = '',
  pageIndex = 1,
  perPage,
}: GetUsersParams): Promise<ApiResponseData> => {
  try {
    const response = await publicGateway.get<ApiResponse>(dashboardRoutes.getUserList, {
      params: {
        search: search.trim(),
        role,
        pageIndex: pageIndex,
        perPage: perPage || 9,
      },
    });

    const responseData = response.data;

    if (responseData.hasError) {
      throw new Error(
        responseData.message.general[0] || 'Unknown error occurred while fetching users'
      );
    }

    if (!responseData.response?.data || !responseData.response?.pagination) {
      throw new Error('Invalid response format from server');
    }
    console.log(responseData.response);

    return responseData.response;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    
    // Detailed error logging
    console.error('Failed to fetch users:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      status: axiosError?.response?.status,
      responseData: axiosError?.response?.data,
      params: { search, role, pageIndex, perPage },
    });

    if (axiosError.response) {
      const status = axiosError.response.status;
      const apiError = axiosError.response.data;

      if (status === 400) {
        throw new Error(apiError?.message.general[0] || 'Invalid request parameters');
      }
      if (status === 401) {
        throw new Error('Authentication required to fetch users');
      }
      if (status === 403) {
        throw new Error('Insufficient permissions to access user data');
      }

      throw new Error(
        apiError?.message.general[0] ||
        `Failed to fetch users: Server error ${status}`
      );
    }

    throw new Error('Network error occurred while fetching users');
  }
};

