import React, { useState } from "react";
import { links } from "./Mylinks";

import "./Navbar.css"; /* Added CSS*/

const NavLinks = ({ closeButton }) => {
  const [currentLink, setCurrent] = useState("");
  const [visible, setVisibility] = useState(false);
  const [prev, setPrev] = useState("");
  return (
    <>
      <>
        {links.map((link) => (
          <div className="px-3 text-left lg:cursor-pointer group lg:block hidden">
            <div className="dashOnHover">
              <h1 className="py-7 flex justify-between items-center">
                {link.name}
              </h1>
              <div className="dashBar"> </div>
            </div>
            {link.submenu && (
              <div>
                <div className="absolute bg-white left-0 hidden group-hover:lg:block hover:lg:block w-full">
                  {" "}
                  {/*Added bg-white here,aligned left,tailwind: "w-full" to fill screen width */}
                  <div className=" p-10 flex gap-x-10 addition justify-around border-t border-b">
                    {/*Made div flex,horizontal alignment with space in between elements(justify-content:space-around and fle-direction:row)  also a border on top of the div to identify partition*/}
                    <div className="grid grid-cols-3 gap-10 px-10">
                      {" "}
                      {/* grid to wrap*/}
                      {link.sublinks.map((mysublinks) => (
                        <div className="border-l pl-5 backdrop-blur-md">
                          <h1 className="text-lg font-medium drop-shadow-sm opacity-100   ">
                            <a
                              href={mysublinks.link}
                              className="hover:text-orange-500"
                            >
                              {mysublinks.name}
                            </a>
                          </h1>
                          {mysublinks.sublinks.map((slink) => (
                            <li className="text-sm text-gray-600 my-2.5">
                              {slink.foreign && (
                                <a
                                  href={slink.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-orange-500"
                                >
                                  {slink.name}
                                </a>
                              )}
                              {!slink.foreign && (
                                <a
                                  href={slink.link}
                                  className="hover:text-orange-500"
                                >
                                  {slink.name}
                                </a>
                              )}
                            </li>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </>
      {/* Mobile View */}
      <>
        <div className="lg:hidden uppercase border-t">
          {!visible &&
            links.map((link) => (
              <div
                className={`px-7 py-5 text-left flex justify-between items-center }`}
              >
                <h1 className="">{link.name}</h1>
                <span
                  className="text-xl flex items-center"
                  onClick={() => {
                    setVisibility(true);
                    setCurrent(link);
                    setPrev(link);
                  }}
                >
                  <ion-icon name="chevron-forward-outline" />
                </span>
              </div>
            ))}
          {visible && (
            <div
              className={`
                            lg:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 border-t 
                            `}
            >
              <div className="flex justify-between items-center p-5 border-y">
                <span
                  className="text-xl flex items-center"
                  onClick={() => {
                    setCurrent(prev);
                    if (currentLink.head === -1) {
                      setVisibility(false);
                    }
                  }}
                >
                  <ion-icon name="chevron-back-outline" />
                </span>
                <div>{currentLink.name}</div>
                <div></div>
              </div>
              <div>
                {currentLink.submenu &&
                  currentLink.sublinks.map((link) => (
                    <div className="px-7 py-5 text-left flex justify-between items-center">
                      <h1>{link.name}</h1>

                      {link.submenu && (
                        <span
                          className=" flex items-center"
                          onClick={() => {
                            setCurrent(link);
                            setPrev(currentLink);
                          }}
                        >
                          <ion-icon name="chevron-forward-outline" />
                        </span>
                      )}
                      {!link.submenu && (
                        <a href={link.link}>
                          <span className="text-xl flex items-center">
                            <ion-icon name="chevron-forward-outline" />
                          </span>
                        </a>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
};
export default NavLinks;
