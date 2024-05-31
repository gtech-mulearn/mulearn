import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import Notification from "./Notification";

export const DesktopMenu = ({ open }) => {
  return (
    <ul className="lg:flex hidden uppercase items-center font-[Poppins] ">
      <NavLinks Open={true} />
      <Link
        to="/careers"
        className="text-black py-7 px-3 change-text inline-block hover:text-orange-500"
      >
        Careers
      </Link>
    </ul>
  );
};

export const Resources = ({ notificationOpen }) => {
  return (
    <div className="lg:flex justify-between items-center hidden">
      <div className="group text-black  inline-block hover:text-orange-500 ">
        <div className="text-3xl ">
          <ion-icon name="notifications-circle-outline"></ion-icon>
        </div>
        <div
          className={`notifications group-hover:lg:block hover:lg:block z-10 ${notificationOpen ? "block" : "hidden"
            }`}
        >
          <Notification />
        </div>
      </div>

      <a
        href="https://app.mulearn.org/register"
        target="_blank"
        rel="noopener noreferrer"
        className="py-7 px-3 inline-block"
      >
        <button className="bg-muorange text-white  px-6 py-2 rounded-md">
          Join µLearn
        </button>
      </a>
      <a
        href="https://app.mulearn.org/donation"
        target="_blank"
        rel="noopener noreferrer"
        className="py-7 px-3 inline-block"
      >
        <button className="border-2 border-muorange text-muorange px-6 py-2 rounded-md">
         Donate
        </button>
      </a>
    </div>
  );
};

export const MenuName = ({ name }) => {
  return (
    <div className="dashOnHover">
      <h1 className="change-text">{name}</h1>
      <div className="dashBar"> </div>
    </div>
  );
};

export const SubMenu = ({ submenu, sublinks }) => {

  return (
    <>
      {submenu && (
        <div>
          <div className="absolute mt-5 bg-white left-0  right-0 hidden group-hover:lg:block hover:lg:block w-full setIndex">
            <div className=" p-10 flex gap-x-10 addition justify-around border-t border-b">
              <div className="grid grid-cols-3 gap-10 px-10">
                {sublinks.map((mysublinks, index) => (
                  <div className="border-l pl-5 backdrop-blur-md" key={index}>
                    <SubHeader link={mysublinks.link} name={mysublinks.name} />
                    <SubLinks sublinks={mysublinks.sublinks} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export const SubHeader = ({ link, name }) => {
  return (
    <h1 className="text-lg font-medium drop-shadow-sm opacity-100">
      <div className="hover:text-orange-500 " >
        {link ? (
          <Link to={link.includes("https") ? '' : link}
            onClick={() => {
              if (link.includes('https')) {
                window.open(link, '_blank');
              }
            }}
            style={{ color: "#000" }}
            onMouseEnter={(e) => (e.target.style.color = "#FB923C")}
            onMouseLeave={(e) => (e.target.style.color = "#000")}
          >
            {name}
          </Link>
        ) : (
          <span style={{ color: "#000" }}>{name}</span>
        )}
      </div>
    </h1>
  );
};
export const SubLinks = ({ sublinks }) => {
  return (
    <>
      {sublinks.map((slink, index) => (
        <div className="text-sm text-gray-600 my-2.5" key={index}>
          {slink.foreign ? (
            <a
              href={slink.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-500 "
            >
              {slink.name}
            </a>
          ) : (
            <a href={slink.link} className="hover:text-orange-500">
              {slink.name}
            </a>
          )}
        </div>
      ))}
    </>
  );
};
