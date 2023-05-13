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
import { BsFillPencilFill, BsFilterLeft, BsSearch } from "react-icons/bs";

import CustomBtn from "../../../Components/CustomBtn";
import Pagination from "../../../Components/MuComponents/Pagination";
import Table from "../../../Components/MuComponents/Table/Table";
import TBody from "../../../Components/MuComponents/Table/TBody";
import TFooter from "../../../Components/MuComponents/Table/TFooter";
import THead from "../../../Components/MuComponents/Table/THead";
import TRow from "../../../Components/MuComponents/Table/TRow";

const Dashboard = () => {
  return (
    <>

      <Box mt={8} />
      <Flex justifyContent="space-between" gap={12}>
        <CustomBtn
          name="Enable Filters"
          icon={<BsFilterLeft />}
          handleClick={() => { }}
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
          handleClick={() => { }}
        />
      </Flex>
      <Table margin="16px 0">
        <THead columns={['Name', 'Age', 'DOB']} />
        <TBody>
          <TRow data={[
            'John Doe',
            '20',
            '01/01/2000'
          ]} />
          <TRow data={[
            'John Doe',
            '20',
            '01/01/2000'
          ]} />
        </TBody>
      </Table>
      <Pagination currentPage={1} totalPages={10} margin="16px 0" />
      <TableContainer
        mt={8}
        border="2px"
        borderColor="gray.200"
        borderRadius="3xl"
      >
        <MuTable variant="simple">
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
        </MuTable>
      </TableContainer>
    </>
  );
};

export default Dashboard;
