import { privateGateway } from "@/MuLearnServices/apiGateways";
import { NotificationRoutes, dashboardRoutes } from "@/MuLearnServices/urls";
import { useToast } from '@chakra-ui/react'
const toast = useToast();

export type Notification = {
    [K in "id" | "url" | "title" | "button" | "created_at" | "description"|"created_by"]: string;
};

export function getNotifications(setResponse: UseStateFunc<Notification[]>) {
    privateGateway.get(NotificationRoutes.getNotification)
        .then(response => {
            setResponse((response.data.response as []).reverse());
        })
        .catch((err) => {
            toast({
                title: "Error",
                description: err.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
            console.error(err)

        })
}
export function clearAllNotifications() {
    privateGateway.delete(NotificationRoutes.deleteAllNotification)
    .then(response => {})
    .catch(err => {
        toast({
            title: "Error",
            description: err.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true
        })
        console.error(err)})
}
export async function clearNotification(id: string) {
    return await privateGateway.delete(`${NotificationRoutes.deleteNotification}${id}/`)
        .then(response => {})
        .catch(err =>{
            toast({
                title: "Error",
                description: err.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
            console.error(err)})
}
export const requestApproval = (id:string,url: string,created_by: string, is_accepted: boolean,update: () => void) => {
    const lcId=url.split('/')[7],userId=created_by
    const newUrl=`${dashboardRoutes.getCampusLearningCircles}${lcId}/${userId}/`
    privateGateway.patch(newUrl, { is_accepted: is_accepted ? '1' : '0' })
    .then((res) => {
        clearNotification(id)
        .then(() => update())
    })
};