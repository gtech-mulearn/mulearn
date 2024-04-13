interface TestData {
    perPage: number;
    pageIndex: number;
    search: string;
    sortBy: string;
}

interface TestDataBackendResponse {
    data: TestResponse[];
    pagination: {
        count: number;
        totalPages: number;
        isNext: boolean;
        isPrev: boolean;
        nextPage: number;
    };
}

interface TestResponse {
    [key: string]: string | number | boolean | null | undefined;
    id: string;
    name: string;
    icon: string;
    code: string;
    members: number;
    updated_by: string;
    updated_at: string;
    created_by: string;
    created_at: string;
}
