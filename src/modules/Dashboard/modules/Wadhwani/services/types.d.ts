interface WadhwaniTokenResponse {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string;
    "not-before-policy": number;
    scope: string;
}

interface wadhwaniCourseResponse {
    courseId: string;
    courseName: string;
    servingMode: string[];
    courseRootId: string;
    description: string;
    version: string;
    thumbnail: string;
    language: string;
    enrollStatus: boolean;
}

interface wadhwaniCourseRedirectResponse {
    status: string;
    data: any;
}