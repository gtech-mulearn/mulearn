import React, { useState } from 'react'
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Link } from "react-router-dom";

const Notification = () => {
    TimeAgo.setDefaultLocale(en.locale);
    TimeAgo.addLocale(en);
    // ./data/notifications.json
    const [seenAll] = useState(false);
    let notifications = require("../../Pages/Notifications/data/notifications.json");
    return (
        <>
            <div className=" px-5 py-4 bg-white/90 text-orange-500/70 text-sm">This Week</div>
            <div className=" overflow-y-hidden">
                {notifications &&
                    notifications.new.map((notification) => (
                        <div
                            className={`px-5 py-2 capitalize ${seenAll ? "text-orange-500/70" : ""
                                } border-b`}
                        >
                            <a href={notification.url}>
                                <div className="py-2 text-md  decoration text-black font-bold">
                                    {notification.title}
                                </div>
                                <p className="py-2 text-justify  text-xs text-gray-600 truncate">
                                    {notification.description}
                                </p>
                                <div className="text-right text-xs">
                                    <ReactTimeAgo date={notification.date} locale="en-US" />
                                </div>
                            </a>
                        </div>
                    ))}
            </div>
            <Link to="/notifications">
                <div className=" px-5 py-3 border-y text-orange-500 text-sm bg-[rgba(255,255,255,.2)] text-center select-none ">
                    View All
                </div>
            </Link>
        </>
    );
};

export default Notification
