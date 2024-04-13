import { FC, useEffect } from "react";
import { Navigate, redirect } from "react-router-dom";
import { fetchLocalStorage } from "./common_functions";
import toast from "react-hot-toast";

interface AuthRoutesProps {
    redirectPath?: JSX.Element;
    children: JSX.Element;
    dynamicType?: ManagementTypes[];
    roles?: Role[];
    toastTitle?: string;
    toastDescription?: string;
}

let localRoles = [] as Role[];
let localDynamicTypes = [] as ManagementTypes[];

export const refreshRoles = () => {
    localRoles = fetchLocalStorage<UserInfo>("userInfo")?.roles || [];
    return localRoles;
};

export const refreshDynamicTypes = () => {
    localDynamicTypes = fetchLocalStorage<UserInfo>("userInfo")?.dynamic_type || [];
    return localDynamicTypes;
}

function SecureAuthRoutes() {
    const hasRoleNoFetch = (roles?: Role[], dynamicType?: ManagementTypes[]) => {
        localRoles = refreshRoles();
        localDynamicTypes = refreshDynamicTypes();
        return roles?.some(role => localRoles.includes(role)) || dynamicType?.some(type => localDynamicTypes.includes(type));
    };
    const func: FC<AuthRoutesProps> = ({
        redirectPath,
        children,
        dynamicType,
        roles,
        toastTitle,
        toastDescription
    }): JSX.Element => {
        console.log("redirectPath:", redirectPath); // Log the redirectPath
        if (hasRoleNoFetch(roles, dynamicType)) {
            return children;
        } else {
            useEffect(() => {
                if (toast) {
                    toast.error(`${toastDescription}`);
                }
            }, [toast]);

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
