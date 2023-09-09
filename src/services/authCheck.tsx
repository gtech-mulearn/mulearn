import { FC, useEffect } from "react";
import { Navigate, redirect } from "react-router-dom";
import { fetchLocalStorage } from "./common_functions";
import { useToast } from "@chakra-ui/react";

interface AuthRoutesProps {
    redirectPath?: JSX.Element;
    children: JSX.Element;
    roles: Role[];
	toastTitle?: string;
	toastDescription?: string;
}

let localRoles = [] as Role[];

export const refreshRoles = () => {
    localRoles = fetchLocalStorage<UserInfo>("userInfo")?.roles || [];
    return localRoles;
};
function SecureAuthRoutes() {
    const hasRoleNoFetch = (roles: Role[]) => {
        localRoles = refreshRoles();
        return roles.some(role => localRoles.includes(role));
    };
    const func: FC<AuthRoutesProps> = ({
        redirectPath,
        children,
        roles,
		toastTitle,
		toastDescription
    }): JSX.Element => {
        console.log("redirectPath:", redirectPath); // Log the redirectPath
        if (hasRoleNoFetch(roles)) {
            return children;
        } else {
			const toast = useToast();

            useEffect(() => {
				if(toast){
					toast({
						title: `${toastTitle}`,
						description: `${toastDescription}`,
						status: "error",
						duration: 3000,
						isClosable: true
					});
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
