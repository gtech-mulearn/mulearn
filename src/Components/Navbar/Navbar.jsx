import React, { useState } from "react";
import { Link } from "react-router-dom";

import NavLinks from "./NavLinks";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white">
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 mt-1 lg:w-auto w-full flex justify-between">
          <Link to="/">
            <img
              src="/assets/navbar/µLearn.png"
              alt="logo"
              className="lg:cursor-pointer h-8"
            />
          </Link>
          <div className="text-3xl lg:hidden" onClick={() => setOpen(!open)}>
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
        <ul className="lg:flex hidden uppercase items-center gap-8 font-[Poppins]">
          <NavLinks />
          <Link to="/careers" className="py-7 px-3 inline-block">
            Careers
          </Link>
          <Link
            to="https://learn.mulearn.org"
            className="py-7 px-3 inline-block"
          >
            Interest Groups
          </Link>
        </ul>
        <div className="lg:block hidden">
          <button className="bg-orange-500 text-white  px-6 py-2 rounded-full">
            Get Started
          </button>
        </div>
        {/* Mobile nav */}
        <ul
          className={`
    lg:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
    duration-500 ${open ? "left-0" : "left-[-100%]"}
    `}
        >
          <li>
            <Link to="/" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <NavLinks />
          <div className="py-5">
            <button className="bg-orange text-white  px-6 py-2 rounded-full">
              Get Started
            </button>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
