import { Role } from "./types";

export const hasRole = (roles: Role[]) => {

    const localRoles = fetchLocalStorage<UserInfo>('userInfo')?.roles || []
    let result = roles.some(role => localRoles.includes(role))
    
    return result
};

export const fetchLocalStorage = <T>(key: string) => {
    if (typeof window === "undefined") return null

    const item = localStorage.getItem(key)
    const result = item ? JSON.parse(item) : null

    return result as T
}


export type UserInfo = {
    muid        : string,
    first_name   : string,
    last_Name    : string,
    email       : string,
    mobile      : string,
    gender      : null,
    dob         : null,
    active      : boolean,
    exist_in_guild: boolean,
    joined      : string,
    roles       : Role[], 
    cipher?: string,
    profile_pic?: string,
}