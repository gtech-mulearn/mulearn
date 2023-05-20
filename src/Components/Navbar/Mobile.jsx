import React from "react";
import NavLinks from "./NavLinks";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import { links } from "./Mylinks";
import SearchBar from "./SearchBar";
import { useState } from "react";
export const MobileTopBar = ({
  setNotificationOpen,
  notificationOpen,
  handleScrolling,
  setOpen,
  open,
}) => {
  function menuCloseEvent() {
    setOpen(!open);
    setNotificationOpen(false);
    handleScrolling(open);
  }
  function notificationOpenClose() {
    setOpen(false);
    setNotificationOpen(!notificationOpen);
    handleScrolling(true);
  }

  return (
    <div className="flex justify-between">
      <div
        className={`group lg:hidden text-black  inline-block  pr-5 `}
        onClick={() => notificationOpenClose()}
      >
        <div
          className={`text-3xl ${
            notificationOpen ? " text-orange-500" : "text-black"
          }`}
        >
          <ion-icon name="notifications-circle-outline"></ion-icon>
        </div>
        <div
          className={` absolute w-[300px] bg-white text-orange-500 border-orange-600/20 border rounded-md text-[13px]  left-8 mt-3  ${
            notificationOpen ? "block" : "hidden"
          }`}
        >
          <Notification />
        </div>
      </div>
      <div className="text-3xl lg:hidden" onClick={() => menuCloseEvent()}>
        <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
      </div>
    </div>
  );
};

export const MobileMenu = ({
  setNotificationOpen,
  setOpen,
  handleScrolling,
  open,
}) => {
  return (
    <ul
      className={`
      lg:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 
      duration-500 setIndex ${open ? "left-0" : "left-[-100%]"}
      `}
    >
      <NavLinks />

      <Link
        to="/careers"
        className="py-4 px-7 inline-block uppercase hover:text-orange-500 text-[13px]"
        onClick={() => {
          setOpen(false);
          setNotificationOpen(false);
          handleScrolling(true);
        }}
      >
        Career
      </Link>

      <div className="grid justify-items-center">
        <a
          href="https://app.mulearn.org/user/register"
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-28 "
        >
          <button className="bg-orange-400 text-white  px-6 py-2 rounded-md ">
            Join Discord
          </button>
        </a>
        <a
          href="http://mulearn.org/magazine"
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-3 inline-block"
        >
          <button className="border-2 border-orange-400 text-orange-400 px-6 py-2 rounded-md">
            Magazine
          </button>
        </a>
      </div>
    </ul>
  );
};

export const MobileView = ({
  visible,
  setVisibility,
  prev,
  setPrev,
  currentLink,
  setCurrent,
}) => {
  function test1(link) {
    setVisibility(true);
    setCurrent(link);
    setPrev(link);
  }
  const [isVisible, setVisibile] = useState(false);
  function changeVisibility(visiblityShaft) {
    setVisibile(visiblityShaft);
  }
  return (
    <div
      className="lg:hidden uppercase border-t"
      onClick={() => changeVisibility(false)}
    >
      <SearchBar changeVisibility={changeVisibility} isVisible={isVisible} />
      <MobileNavHeader visible={visible} test1={test1} />
      <MobileNavLinks
        visible={visible}
        setVisibility={setVisibility}
        prev={prev}
        setPrev={setPrev}
        currentLink={currentLink}
        setCurrent={setCurrent}
      />
    </div>
  );
};
export const MobileNavHeader = ({ visible, test1 }) => {
  return (
    <>
      {!visible &&
        links.map((link) => (
          <div
            className={`px-7 py-5 text-left flex justify-between items-center }`}
            onClick={() => {
              test1(link);
            }}
          >
            <h1 className="text-[13px]">{link.name}</h1>
            <span
              className="text-[13px] flex items-center"
              onClick={() => {
                test1(link);
              }}
            >
              <ion-icon name="chevron-forward-outline" />
            </span>
          </div>
        ))}
    </>
  );
};
export const MobileNavLinks = ({
  visible,
  setVisibility,
  prev,
  setPrev,
  currentLink,
  setCurrent,
}) => {
  function goBack() {
    setCurrent(prev);
    if (currentLink.head === -1) {
      setVisibility(false);
    }
  }
  function test(link) {
    setCurrent(link);
    setPrev(currentLink);
  }
  return (
    <>
      {visible && (
        <div
          className={`lg:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 border-t `}
        >
          <SearchBar />
          <MobileSubHeader currentLink={currentLink} goBack={goBack} />
          {currentLink.submenu &&
            currentLink.sublinks.map((link) =>
              link.submenu ? (
                <div
                  className="px-7 py-5 text-left flex justify-between items-center"
                  onClick={() => test(link)}
                >
                  <MobileSubMenu name={link.name} />
                </div>
              ) : (
                <a
                  className="px-7 py-5 text-left flex justify-between items-center"
                  href={link.link}
                >
                  <MobileSubMenu name={link.name} />
                </a>
              )
            )}
        </div>
      )}
    </>
  );
};
export const MobileSubHeader = ({ currentLink, goBack }) => {
  return (
    <div className="flex justify-between items-center p-5 border-y">
      <span className="text-xl flex items-center" onClick={() => goBack()}>
        <ion-icon name="chevron-back-outline" />
      </span>
      <div className="text-[13px]">{currentLink.name}</div>
      <div></div>
    </div>
  );
};
export const MobileSubMenu = ({ name }) => {
  return (
    <>
      <h1 className="text-[13px]">{name}</h1>
      <span className=" flex items-center">
        <ion-icon name="chevron-forward-outline" />
      </span>
    </>
  );
};
