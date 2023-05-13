import { useState } from "react";

import { NavLink } from "react-router-dom";
import { BsGrid, BsGridFill } from "react-icons/bs";
import {
  AiOutlinePieChart,
  AiFillPieChart,
  AiOutlineUser,
} from "react-icons/ai";
import MuSidebar from "../../../Components/MuComponents/MuSidebar/MuSidebar";
import SideBarItem from "../../../Components/MuComponents/MuSidebar/SidebarItem";

interface DashboardSidebarProps {
  setTitle: (title: string) => void;
}

export default function DashboardSidebar({ setTitle }: DashboardSidebarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleItemClick = (index: number, title: string) => {
    setCurrentIndex(index);
    setTitle(title); // Call setTitle to update title
  };

  return (
    <MuSidebar>
      {[
        {
          name: "Dashboard",
          icon: BsGrid,
          activeIcon: BsGridFill,
          path: "",
        },
        {
          name: "Learning Circles",
          icon: AiOutlinePieChart,
          activeIcon: AiFillPieChart,
          path: "learning-circles",
        },
        {
          name: "MuLearn Admin",
          icon: AiOutlineUser,
          activeIcon: AiOutlineUser,
          path: "admin",
        },
      ].map((item, index) => (
        <NavLink
          to={item.path}
          onClick={() => handleItemClick(index, item.name)}
        >
          <SideBarItem
            isActive={currentIndex === index}
            icon={<item.icon />}
            activeIcon={<item.activeIcon />}
          >
            {item.name}
          </SideBarItem>
        </NavLink>
      ))}
    </MuSidebar>
  );
}
