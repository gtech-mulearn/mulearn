interface TaskEditInterface {
    hashtag?: string;
    title?: string;
    karma?: string;
    active?: string;
    variable_karma?: string;
    usage_count?: string;
    description?: string,
    channel?: string,
    type?: string,
    level?: string,
    org?: string,
    ig?: string,
    updated_at?: Date,
    updated_by?: string,
    created_by?: string,
    created_at?:Date
}

type uuidType = {
    level: { id: string; name: string }[];
    ig: { id: string; name: string }[];
    organization: { id: string; title: string }[];
    channel: { id: string; name: string }[];
    type: { id: string; title: string }[];
};
