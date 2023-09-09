import { FC } from "react";
import { Navigate, redirect } from "react-router-dom";
import { fetchLocalStorage } from "./common_functions";

interface AuthRoutesProps {
    redirectPath?: JSX.Element;
    children: JSX.Element;
    roles: Role[];
}

let localRoles = [] as Role[];

export const refreshRoles = () => {
    localRoles = fetchLocalStorage<UserInfo>("userInfo")?.roles || [];
    return localRoles;
};
function SecureAuthRoutes() {
    const hasRoleNoFetch = (roles: Role[]) => {
        localRoles = refreshRoles();
        let result = roles.some(role => localRoles.includes(role));
        return result;
    };
    const func: FC<AuthRoutesProps> = ({
        redirectPath,
        children,
        roles
    }): JSX.Element => {
        console.log("redirectPath:", redirectPath); // Log the redirectPath
        if (hasRoleNoFetch(roles)) {
            return children;
        } else {
            return redirectPath ? (
                redirectPath
            ) : (
                <Navigate to="/dashboard/profile" replace />
            );
        }
    };

    return func;
}
export default SecureAuthRoutes;
