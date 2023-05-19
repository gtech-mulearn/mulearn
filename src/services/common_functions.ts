// check if user is admin and return true or false
export const isAdmin = () => {
    let result = false;
    if (localStorage.getItem("userInfo")) {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        if (userInfo.roles.includes("Admins")) {
            result = true;
        }
    }
    return result;
};
