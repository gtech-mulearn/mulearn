//Global type file, for most common types (no need to import types)

type UseStateFunc<T> = React.Dispatch<React.SetStateAction<T>>;
type FC<T> = React.FC<T>;

type Role =
    typeof import("./services/types").roles[keyof typeof import("./services/types").roles];

type ManagementTypes =
    typeof import("./services/types").managementTypes[keyof typeof import("./services/types").managementTypes];

type UserInfo = {
    muid: string;
    full_name: string;
    email: string;
    mobile: string;
    gender: null;
    dob: null;
    active: boolean;
    exist_in_guild: boolean;
    joined: string;
    roles: Role[];
    dynamic_type?: ManagementTypes[];
    cipher?: string;
    profile_pic?: string;
    interest_selected: string | null;
};

type ColOrder = { column: string; Label: string; isSortable: boolean };

// just pass json structure type as parameters
type APIResponse<R = {}, M = {}[]> = {
    data: {
        hasError: boolean;
        statusCode: number;
        response: R;
        message: {
            general: M;
        };
        roleVerified?: boolean; // used in registerUser() from onboardingApis.ts
    };
};

type APIError<M = {}> = {
    response: {
        status: number;
        data: {
            status: number;
            message: M;
        };
    };
};

type AllTokens = {
    accessToken: string;
    refreshToken: string;
};

// help me to fill this type (usefull in future)
type General =
    | "Invalid muid or email"
    | "Signature verification failed"
    | "Token Expired or Invalid";
