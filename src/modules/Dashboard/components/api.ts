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

export function  clearAllNotifications(props:any) {
    const {toast,setNotificationList}=props
    privateGateway.delete(NotificationRoutes.deleteAllNotification)
    .then(() => {
        props.toast({
            title: "Success",
            description: "All notifications cleared",
            status: "success",
            duration: 3000,
            isClosable: true
        })
    })
    .catch(err => {
        getNotifications(setNotificationList,{toast})
        toast({
            title: "Error",
            description: err.response.data.response,
            status: "error",
            duration: 3000,
            isClosable: true
        })})
}
export async function clearNotification(id: string,props: any) {
    const {clearElementFromView,toast,updateList}=props
    clearElementFromView()
    return await privateGateway.delete(`${NotificationRoutes.deleteNotification}${id}/`)
        .catch(err =>{
            toast({
                title: "Error",
                description: err.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
            console.error(err)
        })
        .finally(() => updateList())
}
export const requestApproval = (id:string,url: string,created_by: string, is_accepted: boolean,props: any) => {
    const {toast,updateList,clearElementFromView}=props

    const lcId=url.split('/')[7],userId=created_by
    const newUrl=`${dashboardRoutes.getCampusLearningCircles}${lcId}/${userId}/`
    privateGateway.patch(newUrl, { is_accepted: is_accepted ? '1' : '0' })
    .then(() => {
        toast({
            title: "Success",
            description: "Request Approved",
            status: "success",
            duration: 3000,
            isClosable: true
        })
        clearNotification(id,{toast:toast,updateList:updateList,clearElementFromView:clearElementFromView})
    })
    .catch(err => {
        updateList()
        toast({
            title: "Error",
            description: err.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true
        })
    })
};