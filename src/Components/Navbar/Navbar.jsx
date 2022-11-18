import React, { useState } from "react";
import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white ">
      <div className="flex items-center font-medium justify-around">
        <div className={`z-30 p-5 mt-1 lg:w-auto w-full flex justify-between ${open ? "fixed top-1" : ""}`}>
          <Link to="/">
            <img
              src="/assets/navbar/µLearn.webp"
              alt="logo"
              className="lg:cursor-pointer h-8"
            />
          </Link>
          <div className="text-3xl lg:hidden" onClick={() => setOpen(!open)}>
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
        <ul className="lg:flex hidden uppercase items-center gap-8 font-[Poppins]">
          <NavLinks Open={open} />

          <Link to="/careers" className="text-black py-7 px-3 inline-block hover:text-orange-500">
            Careers
          </Link>
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
            <Link to="/careers" className="py-7 px-7 inline-block uppercase hover:text-orange-500">
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
              <button className="bg-orange-400 text-white  px-6 py-2 rounded-md ">
                Join Discord
              </button>
            </a>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
