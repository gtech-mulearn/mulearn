import { Box, Button, Text } from "@chakra-ui/react";
import { IconContext } from "react-icons/lib";

interface CustomBtnProps {
  name: string;
  icon: any;
  handleClick: () => void;
}

const CustomBtn = ({ name, icon, handleClick }: CustomBtnProps) => {
  return (
    <Button onClick={handleClick} p="1rem 4rem" colorScheme="orange">
      <IconContext.Provider value={{ color: "white" }}>
        <Box as="span">{icon}</Box>
      </IconContext.Provider>

      <Text ml={icon ? "0.5rem" : "0"} color="white">
        {name}
      </Text>
    </Button>
  );
};

export default CustomBtn;
