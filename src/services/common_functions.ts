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