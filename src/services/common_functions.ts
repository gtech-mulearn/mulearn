import { Role } from "./types";

export const hasRole = (roles: Role[]) => {
    let result = false;
    if (localStorage.getItem("userInfo")) {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        result = roles.some(role => userInfo.roles?.includes(role));
    }
    return result;
};
