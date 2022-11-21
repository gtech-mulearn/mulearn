import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import NavLinks from "./NavLinks";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  return (
    <nav className="bg-white ">
      <div className="flex items-center font-medium justify-around">
        <div className={`z-30 p-5 mt-1 bg-white lg:w-auto w-full flex justify-between ${open ? "fixed top-1" : ""}`}>
          <Link to="/">
            <img
              src="/assets/navbar/µLearn.webp"
              alt="logo"
              className="lg:cursor-pointer h-8"
            />
          </Link>
          <div className="flex justify-between">
            {/* Notification */}
            <div className={`group lg:hidden text-black  inline-block  pr-5 `}
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setOpen(false);
              }}>

              <div className={`text-3xl ${notificationOpen ? ' text-orange-400' : 'text-black'}`}>
                <ion-icon name="notifications-circle-outline"></ion-icon>
              </div>
              {/* Notification menu */}
              <div className={` absolute w-[300px] bg-[#3c3e48]  
              border-0 rounded-md overflow-y-scroll text-xs  left-8 mt-3  h-4/5 special ${notificationOpen ? 'block' : 'hidden'}`}>
                <NotificationNav />
              </div>

            </div >
            {/* Menu */}
            <div className="text-3xl lg:hidden" onClick={() => { setOpen(!open); setNotificationOpen(false) }}>
              <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
            </div>
          </div>
        </div>
        <ul className="lg:flex hidden uppercase items-center gap-8 font-[Poppins]">
          <NavLinks Open={open} />

          <Link
            to="/careers"
            className="text-black py-7 px-3 inline-block hover:text-orange-500"
          >
            Careers
          </Link>
          <div className="group text-black py-7 px-3 inline-block hover:text-orange-500">
            <div className="text-3xl ">
              <ion-icon name="notifications-circle-outline"></ion-icon>
            </div>
            <div className={`hidden group-hover:lg:block hover:lg:block absolute w-[300px] bg-[#3c3e48]  
              border-0 rounded-md overflow-y-scroll text-xs  mt-3  h-4/5 special ${notificationOpen ? 'block' : ''}`}>
              <NotificationNav />
            </div>
          </div >
        </ul>
        <div className="lg:block hidden">
          <a
            href="https://discord.mulearn.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="py-7 px-3 inline-block"
          >
            <button className="bg-orange-400 text-white  px-6 py-2 rounded-md">
              Join Discord
            </button>
          </a>
        </div>
        {/* Mobile nav */}
        <ul
          className={`
    lg:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 
    duration-500 ${open ? "left-0" : "left-[-100%]"}
    `}
        >
          <NavLinks />
          <li>
            <Link
              to="/careers"
              className="py-7 px-7 inline-block uppercase hover:text-orange-500"
            >
              Career
            </Link>
          </li>

          <div className="grid justify-items-center">
            <a
              href="https://discord.mulearn.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="py-7 px-28 "
            >
              <button className="bg-orange-400 text-white  px-6 py-2 rounded-md " >
                Join Discord
              </button>
            </a>
          </div>
        </ul>
      </div>
    </nav >
  );
};

const NotificationNav = () => {
  TimeAgo.setDefaultLocale(en.locale);
  TimeAgo.addLocale(en);
  // ./data/notifications.json
  let notifications = require("../../Pages/Notifications/data/notifications.json");
  return (
    <>
      <div className=" px-3 py-4 text-white  bg-[#4c4f57] text-sm">This Week</div>
      <div className=" px-3 py-2 text-white bg-[rgba(0,0,0,.2)] text-[9px] text-center capitalize select-none ">
        <li>Mark all as seen</li>
      </div>
      <div className=" overflow-y-hidden">
        {notifications && notifications.new.map((notification) => (
          <div className=' px-5 py-2 capitalize text-white border-b '>
            <a href={notification.url} >
              <div className="py-2 ">{notification.title}</div>
              <p className="py-2 text-justify disabled:decoration-current text-[10px] ">{notification.description}</p>
              <div className="text-right text-[8px]"><ReactTimeAgo date={notification.date} locale="en-US" /></div>
            </a>
          </div>
        ))}
        {notifications && notifications.old.map((notification) => (
          <div className=' px-5 py-2 capitalize text-white/50 border-b  '>
            <a href={notification.url} >
              <div className="py-2 ">{notification.title}</div>
              <p className="py-2 text-justify disabled:decoration-current text-[10px] ">{notification.description}</p>
              <div className="text-right text-[8px]"><ReactTimeAgo date={notification.date} locale="en-US" /></div>
            </a>
          </div>
        ))}
      </div>
      <Link to='/notifications'>
        <div className=" px-3 py-3 text-white text-sm bg-[rgba(0,0,0,.2)] text-[10px] text-center select-none ">
          View All
        </div>
      </Link>
    </>
  )
}
export default Navbar;
