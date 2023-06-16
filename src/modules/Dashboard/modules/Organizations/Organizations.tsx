import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../../../../components/MuComponents/Table/Table'
import THead from '../../../../components/MuComponents/Table/THead'
import TableTop from '../../../../components/MuComponents/TableTop/TableTop'
import Pagination from '../../../../components/MuComponents/Pagination/Pagination'
import { getOrganizations,deleteOrganization } from './apis'
import { useToast } from '@chakra-ui/react'

import { hasRole } from '../../../../services/common_functions'
import { roles } from '../../../../services/types'
import {
    columnsCollege,
    columnsCommunities,
    columnsCompanies,
    // editableCompaniesColumnNames,
    // editableCommunityColumnNames
} from "./THeaders"
import TableTopTab from './TableTopTab' 
import Textfield from '../../../../components/MuComponents/TextField/Textfield'
import Dropdown from '../../../../components/MuComponents/Dropdown/Dropdown'

import "./Organizations.scss"
import PrimaryButton from '../../../../components/MuComponents/MuButtons/MuOutlinedButton'
import { MuButton } from '../../../../components/MuComponents/MuButtons/MuButton'

function Organizations() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [columns,setColumns] = useState(columnsCollege)
    const [activeTab,setActiveTab] = useState("Colleges")
    const [sort, setSort] = useState('');
    const [popupStatus,setPopupStatus] = useState(false)
    
    const [isCreate,setIsCreate] = useState(false)
    const [isEdit,setIsEdit] = useState(false)

    const navigate = useNavigate();

    const toast = useToast()

    useEffect(() => {
        if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate("/404");

        getOrganizations(activeTab,setData, 1, perPage, setTotalPages, "", "");
    }, []);

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getOrganizations(activeTab,setData, nextPage, perPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getOrganizations(activeTab,setData, prevPage, perPage);
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getOrganizations(activeTab,setData, 1, perPage, setTotalPages, search, "");
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getOrganizations(activeTab,setData, 1, selectedValue, setTotalPages, "", "");
    };

    const handleTabClick = (tab:string) => {
        if(tab === "Colleges"){
            setColumns(columnsCollege)
            getOrganizations(tab,setData, 1, perPage, setTotalPages, "", "");
        }else if (tab === "Companies") {
            setColumns(columnsCompanies)
            getOrganizations(tab,setData, 1, perPage, setTotalPages, "", "");
        }else if(tab === "Communities") {
            setColumns(columnsCommunities)
            getOrganizations(tab,setData, 1, perPage, setTotalPages, "", "");
        } else{
            alert("Error to load Table Headers")
        }
        setCurrentPage(1)
        setActiveTab(tab)
        setPopupStatus(false)
    }

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getOrganizations(
                activeTab,
                setData,
                1,
                perPage,
                setTotalPages,
                "",
                `-${column}`
            );
        } else {
            setSort(column);
            getOrganizations(activeTab,setData, 1, perPage, setTotalPages, "", column);
        }

        console.log(`Icon clicked for column: ${column}`);
    };

    const handleEdit = (id: string | number | boolean) => {
        console.log(id);
        setIsEdit(true)
		navigate("/organizations/edit",{state:
            {
                activeItem:activeTab,
                rowId:id
            }});
    };

    const handleDelete = (id: string | number | boolean) => {
        console.log("code:",id)
        navigate(`delete/${id}`)
        // const confirmed = confirm("Are you sure you want to delete?");
        // if(confirmed){
        //     deleteOrganization(id,toast)
        //     getOrganizations(activeTab,setData, 1, perPage, setTotalPages, "", "");
        // }else{
        //     console.log("cancelled")
        // }
    }

    const handleAddClickClose = ()=> {
        setPopupStatus(false)
    }

  return (
    <>
            <TableTopTab 
                active={activeTab} 
                onTabClick={handleTabClick}
            />
            <TableTop
				onSearchText={handleSearch}
				onPerPageNumber={handlePerPageNumber} 
				// CSV={"https://dev.muelarn.org/api/v1/dashboard/ig/csv"}        
				// CSV={"http://localhost:8000/api/v1/dashboard/ig/csv"} 
			/>
            {data && (
                               <Table
                               rows={data}
                               page={currentPage}
                               perPage={perPage}
                               columnOrder={columns}
                               id={['code']} 
                               onEditClick={handleEdit}
                               onDeleteClick={handleDelete}                
                               >
                               <THead
                                   columnOrder={columns}
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
  )
}

export default Organizations
