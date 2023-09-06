import { privateGateway } from "@/MuLearnServices/apiGateways";
import { NotificationRoutes, dashboardRoutes } from "@/MuLearnServices/urls";

export type Notification = {
    [K in "id" | "url" | "title" | "button" | "created_at" | "description"|"created_by"]: string;
};

export function getNotifications(setResponse: UseStateFunc<Notification[]>,props: any) {
    privateGateway.get(NotificationRoutes.getNotification)
        .then(response => {
            setResponse((response.data.response as []).reverse());
        })
        .catch((err) => {
            props.toast({
                title: "Error",
                description: err.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
            console.error(err)
        })
}
export async function  clearAllNotifications(props: any) {
    return await privateGateway.delete(NotificationRoutes.deleteAllNotification)
    .then(response => {})
    .catch(err => {
        props.toast({
            title: "Error",
            description: err.response.data.response,
            status: "error",
            duration: 3000,
            isClosable: true
        })})
}
export async function clearNotification(id: string,props: any) {
    return await privateGateway.delete(`${NotificationRoutes.deleteNotification}${id}/`)
        .then(response => {})
        .catch(err =>{
            props.toast({
                title: "Error",
                description: err.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
            console.error(err)})
}
export const requestApproval = (id:string,url: string,created_by: string, is_accepted: boolean,update: () => void,props: any) => {
    const lcId=url.split('/')[7],userId=created_by
    const newUrl=`${dashboardRoutes.getCampusLearningCircles}${lcId}/${userId}/`
    privateGateway.patch(newUrl, { is_accepted: is_accepted ? '1' : '0' })
    .then((res) => {
        clearNotification(id,props.toast)
        .then(() => update())
    })
};