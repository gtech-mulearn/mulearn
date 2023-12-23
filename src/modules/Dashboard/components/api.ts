import { privateGateway } from "@/MuLearnServices/apiGateways";
import { NotificationRoutes, dashboardRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";

export type Notification = {
    [K in
        | "id"
        | "url"
        | "title"
        | "button"
        | "created_at"
        | "description"
        | "created_by"]: string;
};

export function getNotifications(setResponse: UseStateFunc<Notification[]>) {
    privateGateway
        .get(NotificationRoutes.getNotification)
        .then(response => {
            setResponse((response.data.response as []).reverse());
        })
        .catch(err => {
            toast.error(err.response.data.message);
        });
}

export function clearAllNotifications(props: any) {
    const { setNotificationList } = props;
    privateGateway
        .delete(NotificationRoutes.deleteAllNotification)
        .then(() => {
            toast.success("All notifications cleared");
        })
        .catch(err => {
            getNotifications(setNotificationList);

            toast.error(err.response.data.message);
        });
}
export async function clearNotification(id: string, props: any) {
    const { clearElementFromView, updateList } = props;
    clearElementFromView();
    return await privateGateway
        .delete(`${NotificationRoutes.deleteNotification}${id}/`)
        .catch(err => {
            toast.error(err.response.data.message.general);
        })
        .finally(() => updateList());
}
export const requestApproval = (
    id: string,
    url: string,
    created_by: string,
    is_accepted: boolean,
    props: any
) => {
    const { updateList, clearElementFromView } = props;

    const lcId = url.split("/")[7],
        userId = created_by;
    const newUrl = `${dashboardRoutes.getCampusLearningCircles}${lcId}/user-accept-reject/${userId}/`;
    privateGateway
        .patch(newUrl, { is_accepted: is_accepted ? "1" : "0" })
        .then(() => {
            toast.success("Request Approved");
            clearNotification(id, {
                updateList: updateList,
                clearElementFromView: clearElementFromView
            });
        })
        .catch(err => {
            updateList();

            toast.error(err.response.data.message.general);
        });
};
