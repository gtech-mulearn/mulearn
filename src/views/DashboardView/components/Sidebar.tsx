import { useState } from "react";

import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListIcon,
  Text,
  Box,
  Image,
  Flex,
} from "@chakra-ui/react";
import { BsGrid, BsGridFill } from "react-icons/bs";
import {
  AiOutlinePieChart,
  AiFillPieChart,
  AiOutlineUser,
} from "react-icons/ai";

interface SidebarProps {
  setTitle: (title: string) => void;
}

export default function Sidebar({ setTitle }: SidebarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleItemClick = (index: number, title: string) => {
    setCurrentIndex(index);
    setTitle(title); // Call setTitle to update title
  };

  return (
    <Box
      h="100%"
      pt={{ lg: "20px" }}
      border="2px"
      borderColor="gray.200"
      borderRadius="3xl"
    >
      <Image
        src="https://ieeejobfair.com/assets/img/team/Logo.png"
        alt="MuLearn Logo"
        maxW="200px"
        mx="auto"
        px="6"
        my="16"
      />
      <List spacing={8}>
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
          <ListItem
            key={index}
            pl="4"
            borderLeft="4px"
            borderColor={currentIndex === index ? "orange.300" : "transparent"}
            color={currentIndex === index ? "orange.300" : "gray.500"}
            fontWeight="medium"
          >
            <NavLink
              to={item.path}
              onClick={() => handleItemClick(index, item.name)}
            >
              <ListIcon
                as={currentIndex === index ? item.activeIcon : item.icon}
                w="5"
                h="5"
              />
              {item.name}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
