import { useEffect, useState } from "react";
import Pagination from "../../../../components/MuComponents/Pagination/Pagination";
import { Blank } from "../../../../components/MuComponents/Table/Blank";
import Table from "../../../../components/MuComponents/Table/Table";
import THead from "../../../../components/MuComponents/Table/THead";
import TableTop from "../../../../components/MuComponents/TableTop/TableTop";

import { useToast } from "@chakra-ui/react";

import { getUsersData } from "./manageUsersApi";
import { hasRole } from "../../../../services/common_functions";
import { useNavigate } from "react-router-dom";
import { roles } from "../../../../services/types";
type Props = {}

const ManageUsers = (props: Props) => {
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sort, setSort] = useState('');

  const navigate = useNavigate();

  const toast = useToast();

  const columnOrder = [
	"first_name",
	"last_name",
	"total_karma",
	"mu_id",
	"email",
	"mobile",
	"dob",
	"gender",
	"discord_id",
	"id",
	"active",
	"created_at",
];

const editableColumnNames = [
	"First Name",
	"Last Name",
	"Total Karma",
	"Mu ID",
	"Email",
	"Mobile",
	"DOB",
	"Gender",
	"Discord ID",
	"ID",
	"Active",
	"Created at",
];

  useEffect(() => {
    if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate("/404");

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

  const handleSearch = (search: string) => {
    getUsersData(setData, 1, perPage, setTotalPages, search, "");
  };

  const handlePerPageNumber = (selectedValue: number) => {
    setPerPage(selectedValue);
    getUsersData(setData, 1, selectedValue, setTotalPages, "", "");
  };
 const handleDelete = () => {
  console.log("delete user")
    //  navigate("/manage-users/delete");
 };
  const handleIconClick = (column: string) => {
	if(sort === column){
		setSort(`-${column}`);
		getUsersData(data, 1, perPage, setTotalPages, "", sort);
	}
	else {
		setSort(column);
		getUsersData(data, 1, perPage, setTotalPages, "", sort);
	}
	
	console.log(`Icon clicked for column: ${column}`);
};

  return (
      <>
         
          <TableTop
              onSearchText={handleSearch}
              onPerPageNumber={handlePerPageNumber}
          />
          {data && (
              <Table
                  rows={data}
                  page={currentPage}
                  perPage={perPage}
                  columnOrder={columnOrder}
              >
                  <THead
                      columnOrder={columnOrder}
                      editableColumnNames={editableColumnNames}
                      onIconClick={handleIconClick}
                  />
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
  );
}

export default ManageUsers