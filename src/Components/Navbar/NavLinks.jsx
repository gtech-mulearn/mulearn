import React, { useCallback, useEffect, useState } from "react";
import { getLinks } from "./Mylinks";
import { MobileView } from "./Mobile";
import { MenuName, SubMenu } from "./Desktop";
import "./Navbar.css"; /* Added CSS*/
import SheetAPI from "../../Utils/SheetAPI";

const NavLinks = () => {
  const [currentLink, setCurrent] = useState("");
  const [visible, setVisibility] = useState(false);
  const [prev, setPrev] = useState("");
  const [variable, setVariable] = useState([])
  const [ig, setIg] = useState([])

  const Sheet = useCallback(() => {
    SheetAPI('https://docs.google.com/spreadsheets/d/1C7MyDDpRCIq3bnXi-bdWQrUdYMJ0_2cBkpoJ7POQA6A/edit#gid=0', 'landing_pages', setVariable)
  }, [])
  useEffect(() => {
    if (variable.length <= 0)
      Sheet()
    else {
      // eslint-disable-next-line array-callback-return
      variable.map(link => {
        if (link.parent === 'null')
          setIg((items) => ([...items, {
            name: link?.heading,
            link: `https://learn.mulearn.org/${link?.code}`,
            foreign: true
          }]))
        else return {}
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variable.length])
  return (
    <>
      {getLinks(ig).map((link, index) => (
        <div className="p-4 text-left lg:cursor-pointer group lg:block hidden dashes" key={index} >
          <MenuName name={link.name} />
          <SubMenu submenu={link.submenu} sublinks={link.sublinks} />
        </div>
      ))}
      <MobileView visible={visible} setVisibility={setVisibility} prev={prev} setPrev={setPrev} currentLink={currentLink} setCurrent={setCurrent} />
    </>
  );
};



export default NavLinks;
