import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {
    allowedRoles: string[];
};

export const RoleChecker = ({ allowedRoles }: Props) => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const userRolesString = localStorage.getItem("roles");
        const userRoles = userRolesString ? JSON.parse(userRolesString) : [];

        // Check if any of the user's roles are in the allowedRoles
        const userHasAllowedRole = userRoles.some((role: string) =>
            allowedRoles.includes(role)
        );

        if (!userHasAllowedRole) {
            if (window.location.pathname !== "/") {
                navigate("/");
                toast.error("You don't have permission to access this page");
            }
        } else {
            setIsAuthorized(true);
        }
    }, [navigate, allowedRoles]);

    if (!isAuthorized) {
        // Optionally, you can render a loading spinner or a blank page here
        return null; // or <LoadingSpinner />;
    }

    return <Outlet />;
};

type RoleCheckerProps = {
    roles: string[];
    children: ReactNode;
};

export const RoleCheckerFunction: React.FC<RoleCheckerProps> = ({
    roles,
    children,
}) => {
    if (roles.length > 0) {
        const currentUserRolesString = localStorage.getItem("roles");
        const currentUserRoles = currentUserRolesString
            ? JSON.parse(currentUserRolesString)
            : [];

        const userHasRole = roles.some((role) =>
            currentUserRoles.includes(role)
        );

        if (userHasRole) {
            return <>{children}</>;
        } else {
            // Redirect or display a message could also be handled here
            return null;
        }
    }

    return <>{children}</>;
};