import { useEffect, useState } from 'react';
import './Notification.css';
import { clearAllNotifications, clearNotification, getNotifications, Notification as NotificationProps, requestApproval } from './api';
import { IoIosClose } from 'react-icons/io';
import dpm from '../assets/images/dpm.webp';
import { filterNotification, getTimeAgo, isRequest } from './utils';
import { useToast } from '@chakra-ui/react'

interface NotificationComponentProps {
    notificationList: NotificationProps[];
    setNotificationList: React.Dispatch<React.SetStateAction<NotificationProps[]>>;
}


const NotificationMessage = ({ profile, title, created_at, description, clear, id, url, update ,created_by}: NotificationMessageProps) => {
    const toast=useToast();
    const props={toast:toast};
    return (
        <div className="notiMessageTab">
            <img src={profile || dpm} alt="" />
            <div className="notiMessageProfile">
                <b>{title}</b>  
                <span className="blueDot" onClick={() => {
                    clear()
                    clearNotification(id,props)
                    update()
                }}>
                    <IoIosClose size={'18px'} />
                </span>
                <div className="day">
                    {new Date(created_at).toLocaleDateString('en-US', { day: 'numeric', weekday: 'long', hour12: true, hour: 'numeric', minute: 'numeric' })}
                    <b>{getTimeAgo(created_at, new Date())}</b>
                </div>
                <p>{description}</p>
                {isRequest(title) &&
                    <div className="btns">
                        <button onClick={() => { 
                            requestApproval(id,url,created_by, false,update,props); 
                            update() 
                            clear()
                            requestApproval(id,url,created_by, false,update,props);  
                            }}>Decline</button>
                        &nbsp;
                        <button className="accept" onClick={() => {
                            clear()
                            requestApproval(id,url,created_by, true, update,props)
                            }}>Accept</button>
                    </div>
                }
            </div>
        </div>
    );
};

const NotificationTab = ({notificationList,setNotificationList}: NotificationComponentProps) => {
    const [active, setActive] = useState(0);
    const toast=useToast();
    const props={toast:toast};
    const links = [
        { title: 'View All', count: notificationList.length },
        { title: 'Requests', count: notificationList.filter((item: NotificationProps) => isRequest(item.title)).length },
        // { title: 'Followers', count: 0 },
    ];

    const filteredNotification = filterNotification(active, notificationList);

    const clearElement = (cleared: number) => {
        setNotificationList(list => list.filter((_, index) => index !== cleared));
    };

    const clearAll = () => {
        setNotificationList([]);
        clearAllNotifications(props);
    }

    return (
        <div className="yourNotification">
            <div className="notiTop">
                <b>Your Notification</b>
                <div className='clearAll' onClick={clearAll}>✖ Clear all</div>
            </div>
            <div className="notiTabs">
                <ul>
                    {links.map((item, index) => (
                        <li key={index} className={active === index ? 'active' : 'inactive'} onClick={() => setActive(index)}>
                            <p>{item.title}</p>
                            <span>{item.count}</span>
                        </li>
                    ))}
                    <span className='glider' style={{ transform: `translateX(${active * 100}%)`, margin: `${active === 0 ? 0 : active === links.length - 1 ? 15 : 15}px` }}></span>
                </ul>
            </div>
            <div className="notiMessageContainer">
                {filteredNotification.length > 0 ? (
                    <div className="notiMessage">
                        {filteredNotification.map((item, index) => (
                            <div key={item.id}>
                                <NotificationMessage
                                    key={index}
                                    {...item}
                                    clear={() => clearElement(index)}
                                    update={() =>{
                                        getNotifications(setNotificationList,props)
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='nothing'>Nothing to show here</div>
                )}
            </div>
        </div>
    );
};

interface NotificationMessageProps extends NotificationProps {
    clear: () => void;
    profile?: string;
    update: () => void;
}

export default NotificationTab;
