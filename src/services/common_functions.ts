import toast from "react-hot-toast";

export const hasRole = (roles: Role[]) => {
    const localRoles = fetchLocalStorage<UserInfo>("userInfo")?.roles || [];
    let result = roles.some(role => localRoles.includes(role));

    return result;
};

//This function should only be used if value is a json.
export const fetchLocalStorage = <T>(key: string) => {
    // if (typeof window === "undefined") return null

    const item = localStorage.getItem(key);
    const result = item ? JSON.parse(item) : null;

    return result as T;
};

export const showToasts = ({ messages }: { messages: any }) => {
    Object.entries(messages).forEach(([fieldName, errorMessage]) => {
        if (Array.isArray(errorMessage)) {
            toast.error(errorMessage?.join(", ") || "");
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            Object.entries(errorMessage).forEach(([key, value]) => {
                toast.error(value);
            });
        }
    });
};

export function isDev() {
    return (
        !!import.meta.env.VITE_SERVER && import.meta.env.VITE_SERVER === "dev"
    );
}
