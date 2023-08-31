import { privateGateway } from "@/MuLearnServices/apiGateways";
import { NotificationRoutes, dashboardRoutes } from "@/MuLearnServices/urls";

export type Notification = {
    [K in "id" | "url" | "title" | "button" | "created_at" | "description"|"created_by"]: string;
};

export function getNotifications(setResponse: UseStateFunc<Notification[]>) {
    privateGateway.get(NotificationRoutes.getNotification)
        .then(response => {
            setResponse((response.data.response as []).reverse());
        })
        .catch((err) => {
            console.error(err)
        })
}
export function clearAllNotifications() {
    privateGateway.delete(NotificationRoutes.deleteAllNotification)
        .then(response => {
            console.log(response)
        })
        .catch((err) => {
            console.error(err)
        })
}
export function clearNotification(id: string) {
    privateGateway.delete(`${NotificationRoutes.deleteNotification}${id}/`)
        .then(response => {
            console.log(response)
        })
        .catch((err) => {
            console.error(err)
        })
}
export const requestApproval = (id:string,url: string,created_by: string, is_accepted: boolean) => {
    const lcId=url.split('/')[7],userId=created_by
    const newUrl=`${dashboardRoutes.getCampusLearningCircles}${lcId}/${userId}/`
    privateGateway.patch(newUrl, { is_accepted: is_accepted ? '1' : '0' })
    clearNotification(id)
};