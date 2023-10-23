interface OrgFormData {
    affiliation: string;
    code: string;
    country: string;
    district: string;
    org_type: string;
    state: string;
    title: string;
}

interface OrgFormErrors {
    [key: string]: string | undefined;
}

interface AffiliationOption {
    label: string;
    value: string;
}

interface OrgInfo {
    affiliation_name: string;
    affiliation_uuid: string;
    code: string;
    country_name: string;
    country_uuid: string;
    district_name: string;
    district_uuid: string;
    id: string;
    karma: number;
    state_name: string;
    state_uuid: string;
    title: string;
    zone_name: string;
    zone_uuid: string;
}