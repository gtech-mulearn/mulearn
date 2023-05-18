import { useEffect, useState } from "react";
import Pagination from "../../../../../components/MuComponents/Pagination";
import { Blank } from "../../../../../components/MuComponents/Table/Blank";
import Table from "../../../../../components/MuComponents/Table/Table";
import THead from "../../../../../components/MuComponents/Table/THead";
import TableTop from "../../../../../components/MuComponents/TableTop/TableTop";

import { useToast } from "@chakra-ui/react";

import { getUsersData } from "./manageUsersApi";

type Props = {}

const ManageUsers = (props: Props) => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const toast = useToast();

  useEffect(() => {
    getUsersData(setData, 1, setTotalPages);
  }, []);

  const handleNextClick = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getUsersData(setData, nextPage);
  };

  const handlePreviousClick = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    getUsersData(setData, prevPage);
  };

  const cols = [];
  for (const key in data[0]) {
    cols.push(key.replace("_", " ").toUpperCase());
  }

  const handleSearch = (search: string) => {
    toast({
      title: "Search",
      description: `Searching for ${search}`,
    });
    getUsersData(setData, 1, setTotalPages, search);
  };


  return (
    <>
      <TableTop onSearchText={handleSearch} />
      {data && (
        <Table rows={data}>
          <THead columns={cols} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            margin="10px 0"
            handleNextClick={handleNextClick}
            handlePreviousClick={handlePreviousClick}
          />
          {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
        </Table>
      )}
    </>
  )
}

export default ManageUsers