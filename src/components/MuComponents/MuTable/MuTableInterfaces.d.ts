interface TableHeader {
    column: string;
    label: string;
    isSortable: boolean;
}

interface TableDataBackendResponse {
    data: {
        [key: string]: string | number | boolean | null | undefined;
    }[];
    pagination: {
        count: number;
        totalPages: number;
        isNext: boolean;
        isPrev: boolean;
        nextPage: number;
    };
}
