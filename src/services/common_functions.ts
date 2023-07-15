
export const hasRole = (roles: string[]) => {
    let result = false;
    if (localStorage.getItem("userInfo")) {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        roles.forEach(role => {
            if (userInfo.roles.includes(role)) {
                result = true;
            }
        });
    }
    return result;
};
