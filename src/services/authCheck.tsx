import { FC } from "react";
import { Navigate } from "react-router-dom";
import { fetchLocalStorage } from './common_functions'

interface AuthRoutesProps {
    children: JSX.Element
    roles: Role[]
}

let localRoles = [] as Role[]

export const refreshRoles = () => {
     localRoles = fetchLocalStorage<UserInfo>('userInfo')?.roles || []

    }

function SecureAuthRoutes(){
    refreshRoles()

    const hasRoleNoFetch = (roles: Role[]) => {
        let result = roles.some(role => localRoles.includes(role))
        return result

    }
    const func: FC<AuthRoutesProps> = ({children, roles}) : JSX.Element => {
        if (hasRoleNoFetch(roles)) return children

        return <Navigate to="/404" replace />
    }

    return func
}
export default SecureAuthRoutes;