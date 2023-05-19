import { useEffect, useState } from "react";
import Pagination from "../../../../components/MuComponents/Pagination/Pagination";
import { Blank } from "../../../../components/MuComponents/Table/Blank";
import Table from "../../../../components/MuComponents/Table/Table";
import THead from "../../../../components/MuComponents/Table/THead";
import TableTop from "../../../../components/MuComponents/TableTop/TableTop";

import { useToast } from "@chakra-ui/react";

import { getUsersData } from "./manageUsersApi";
import { isAdmin } from "../../../../services/common_functions";
import { useNavigate } from "react-router-dom";

type Props = {}

const ManageUsers = (props: Props) => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const navigate = useNavigate();

  const toast = useToast();

  useEffect(() => {
    if (!isAdmin()) navigate("/404");

    getUsersData(setData, 1, perPage, setTotalPages, "", "");
  }, []);

  const handleNextClick = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    getUsersData(setData, nextPage, perPage);
  };

  const handlePreviousClick = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
    getUsersData(setData, prevPage, perPage);
  };

  const cols = ['Sl No'];
  for (const key in data[0]) {
    cols.push(key.replace("_", " ").toUpperCase());
  }

  const handleSearch = (search: string) => {
    getUsersData(setData, 1, perPage, setTotalPages, search, "");
  };

  const handleSort = (sort: string) => {
    if (sort === "1") {
      getUsersData(setData, 1, perPage, setTotalPages, "", "first_name");
    }
    if (sort === "2") {
      getUsersData(setData, 1, perPage, setTotalPages, "", "-first_name");
    }
  };

  const handlePerPageNumber = (selectedValue: number) => {
    setPerPage(selectedValue);
    getUsersData(setData, 1, selectedValue, setTotalPages, "", "");
  };


  return (
    <>
      <TableTop
        onSearchText={handleSearch}
        onSortText={handleSort}
        onPerPageNumber={handlePerPageNumber}
      />
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