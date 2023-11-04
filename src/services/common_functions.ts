import { ToastId, UseToastOptions } from "@chakra-ui/react";

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

export const showToasts = ({
    toast,
    messages,
    status = "success"
}: {
    toast: (options?: UseToastOptions | undefined) => ToastId;
    messages: any;
    status?: "success" | "error";
}) => {
    Object.entries(messages).forEach(([fieldName, errorMessage]) => {
        console.log("showToasts - errorMessage", errorMessage);
        if (Array.isArray(errorMessage)) {
            console.log(errorMessage);
            toast({
                title: errorMessage?.join(", ") || "",
                status: status,
                isClosable: true
            });
        } else if (typeof errorMessage === "object" && errorMessage !== null) {
            Object.entries(errorMessage).forEach(([key, value]) => {
                toast({
                    title: value as string,
                    status: status,
                    isClosable: true
                });
            });
        }
    });
};
