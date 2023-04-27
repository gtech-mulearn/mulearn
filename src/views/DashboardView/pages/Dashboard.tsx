import {
  Flex,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { BsFillPencilFill, BsFilterLeft, BsSearch } from "react-icons/bs";

import CustomBtn from "../../../Components/CustomBtn";

const Dashboard = () => {
  return (
    <>
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
      <TableContainer
        mt={8}
        border="2px"
        borderColor="gray.200"
        borderRadius="3xl"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Phone Number</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>John</Td>
              <Td>Doe</Td>
              <Td>1234567890</Td>
              <Td>
                <a href="mailto:">abc@ef.com</a>
              </Td>
              <Td>Admin</Td>
            </Tr>
            <Tr>
              <Td>John</Td>
              <Td>Doe</Td>
              <Td>1234567890</Td>
              <Td>
                <a href="mailto:">abc@ef.com</a>
              </Td>
              <Td>Admin</Td>
            </Tr>
            <Tr>
              <Td>John</Td>
              <Td>Doe</Td>
              <Td>1234567890</Td>
              <Td>
                <a href="mailto:">abc@ef.com</a>
              </Td>
              <Td>Admin</Td>
            </Tr>
            <Tr>
              <Td>John</Td>
              <Td>Doe</Td>
              <Td>1234567890</Td>
              <Td>
                <a href="mailto:">abc@ef.com</a>
              </Td>
              <Td>Admin</Td>
            </Tr>
            <Tr>
              <Td>John</Td>
              <Td>Doe</Td>
              <Td>1234567890</Td>
              <Td>
                <a href="mailto:">abc@ef.com</a>
              </Td>
              <Td>Admin</Td>
            </Tr>
            <Tr>
              <Td>John</Td>
              <Td>Doe</Td>
              <Td>1234567890</Td>
              <Td>
                <a href="mailto:">abc@ef.com</a>
              </Td>
              <Td>Admin</Td>
            </Tr>
            <Tr>
              <Td>John</Td>
              <Td>Doe</Td>
              <Td>1234567890</Td>
              <Td>
                <a href="mailto:">abc@ef.com</a>
              </Td>
              <Td>Admin</Td>
            </Tr>
            <Tr>
              <Td>John</Td>
              <Td>Doe</Td>
              <Td>1234567890</Td>
              <Td>
                <a href="mailto:">abc@ef.com</a>
              </Td>
              <Td>Admin</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Dashboard;
