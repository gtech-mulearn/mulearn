import { Notification as NotificationProps } from "./api";
export const getTimeAgo = (inputDate: string, currentDate: Date) => {
    // const currentDate = new Date();
    const startDate = new Date(inputDate);
    const timeDifference = currentDate.getTime() - startDate.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = currentDate.getMonth() - startDate.getMonth() + (currentDate.getFullYear() - startDate.getFullYear()) * 12;

    if (months > 0) {
        return `${months} ${months > 1 ? 'months' : 'month'} Ago`;
    } else if (days > 0) {
        return `${days} ${days > 1 ? 'days' : 'day'} Ago`;
    } else if (hours > 0) {
        return `${hours} ${hours > 1 ? 'hours' : 'hour'} Ago`;
    } else if (minutes > 0) {
        return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} Ago`;
    } else {
        return `${seconds} ${seconds > 1 ? 'seconds' : 'second'} Ago`;
    }
};
export const isRequest = (item: string) => item.includes('Member Request');

export const filterNotification = (selection: number, list: NotificationProps[]) => {
    switch (selection) {
        case 0: return list;
        case 1: return list.filter((item: NotificationProps) => isRequest(item.title));
        case 2: return []
        default: return [];
    }
};