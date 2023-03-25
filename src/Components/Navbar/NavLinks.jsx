import React, { useState } from "react";
import { links } from "./Mylinks";
import { MobileView } from "./Mobile";
import { MenuName, SubMenu } from "./Desktop";
import "./Navbar.css"; /* Added CSS*/

const NavLinks = () => {
  const [currentLink, setCurrent] = useState("");
  const [visible, setVisibility] = useState(false);
  const [prev, setPrev] = useState("");
  return (
    <>
      {links.map((link) => (
        <div className="p-4 text-left lg:cursor-pointer group lg:block hidden dashes">
          <MenuName name={link.name} />
          <SubMenu submenu={link.submenu} sublinks={link.sublinks} />
        </div>
      ))}
      <MobileView visible={visible} setVisibility={setVisibility} prev={prev} setPrev={setPrev} currentLink={currentLink} setCurrent={setCurrent} />
    </>
  );
};



export default NavLinks;
