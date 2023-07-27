import { FC } from "react";
import { Navigate } from "react-router-dom";
import { UserInfo, fetchLocalStorage, hasRole } from './common_functions'
import { Role } from "./types";

interface AuthRoutesProps {
    Children: JSX.Element
    roles: Role[]
}

let localRoles = [] as Role[]

export const refreshRoles = () => {
     localRoles = fetchLocalStorage<UserInfo>('userInfo')?.roles || []
     console.log("refreshRoles", localRoles)
    }

function SecureAuthRoutes(){
    refreshRoles()

    const hasRoleNoFetch = (roles: Role[]) => {
        let x = roles.some(role => localRoles.includes(role))
        console.log(x)
        return x

    }
    const func: FC<AuthRoutesProps> = ({Children, roles}) : JSX.Element => {
        if (hasRoleNoFetch(roles)) return Children

        return <Navigate to="/404" replace />
    }

    return func
}
export default SecureAuthRoutes;