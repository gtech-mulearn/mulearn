import {
  Flex,
  Input,
  Table as MuTable,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  TableContainer,
  InputRightElement,
  InputGroup,
  Box,
} from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiFilter } from "react-icons/bi";
import { BsFillPencilFill, BsFilterLeft, BsSearch } from "react-icons/bs";

import CustomBtn from "../../../Components/CustomBtn";
import Pagination from "../../../Components/MuComponents/Pagination";
import Table from "../../../Components/MuComponents/Table/Table";
import TBody from "../../../Components/MuComponents/Table/TBody";
import TFooter from "../../../Components/MuComponents/Table/TFooter";
import THead from "../../../Components/MuComponents/Table/THead";
import TRow from "../../../Components/MuComponents/Table/TRow";
import InputField from "../../../Components/MuComponents/InputField";
import PrimaryButton from "../../../Components/MuComponents/PrimaryButton";

const Dashboard = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <>
      <Box mt={8} />
      <Flex justifyContent="space-between" gap={12}>
        <CustomBtn
          name="Enable Filters"
          icon={<BsFilterLeft />}
          handleClick={() => {}}
        />
        <InputGroup>
          <Input placeholder="Search" />
          <InputRightElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<BsSearch style={{ color: "white" }} />}
          />
        </InputGroup>
        <CustomBtn
          name="Edit Coloumns"
          icon={<BsFillPencilFill />}
          handleClick={() => {}}
        />
      </Flex>
      <div
        style={{
          backgroundColor: "rgba(1, 75, 178, .2)",
          padding: "10px 11px",
          borderRadius: "10px",
          marginTop: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <InputField
          type="text"
          hintText="Search"
          prefixIcon={<BsSearch color="rgba(1, 75, 178, 1)" />}
          onChange={handleChange}
          style={{ backgroundColor: "white", borderRadius: "4px" }}
        />
        <div
          style={{
            display: "flex",
          }}
        >
          <InputField
            type="text"
            hintText="Search"
            prefixIcon={<BsSearch color="rgba(1, 75, 178, 1)" />}
            sufixIcon={<AiFillCloseCircle color="rgba(1, 75, 178, 1)" />}
            onChange={handleChange}
            style={{ backgroundColor: "white", borderRadius: "4px" }}
          />
          <PrimaryButton
            text="Filters"
            prefixIcon={<BiFilter />}
            margin="0 0 0 8px"
          />
        </div>
      </div>
      <Table margin="16px 0">
        <THead columns={["Name", "Age", "DOB", "Position", "District"]} />
        <TBody>
          {/* generate some row usng loop */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <TRow
              key={index}
              data={[
                `First Last ${index}`,
                Math.floor(Math.random() * 100),
                `${Math.floor(Math.random() * 30)}/${Math.floor(
                  Math.random() * 12
                )}/${Math.floor(Math.random() * 1000)}`,
                `Position ${index}`,
                `District ${index}`,
              ]}
            />
          ))}
        </TBody>
      </Table>
      <Pagination currentPage={1} totalPages={10} margin="16px 0" />
    </>
  );
};

export default Dashboard;
