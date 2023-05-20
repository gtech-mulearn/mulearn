import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../../../../components/MuComponents/Table/Table'
import THead from '../../../../components/MuComponents/Table/THead'
import TableTop from '../../../../components/MuComponents/TableTop/TableTop'
import Pagination from '../../../../components/MuComponents/Pagination/Pagination'
import { getInterestGroups } from '../InterestGroup/apis'
import { MuButtonLight } from '../../../../components/MuComponents/MuButtons/MuButton'
import PrimaryButton from '../../../../components/MuComponents/MuButtons/MuOutlinedButton'
import {columnsCollege,columnsCommunities,columnsCompanies} from "./THeaders"
import TableTopTab from './TableTopTab'

import "./Organizations.scss"

function Organizations() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [columns,setColumns] = useState(columnsCollege)
    const [activeTab,setActiveTab] = useState("Colleges")

    const navigate = useNavigate();

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getInterestGroups(setData, nextPage, perPage);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getInterestGroups(setData, prevPage, perPage);
    };

    const handleTabClick = (tab:string) => {
        if(tab === "Colleges"){
            setColumns(columnsCollege)
        }else if (tab === "Companies") {
            setColumns(columnsCompanies)
        }else if(tab === "Communities") {
            setColumns(columnsCommunities)
        } else{
            alert("Error to load Table Headers")
        }
        setActiveTab(tab)
    }

  return (
    <>
        <TableTopTab active={activeTab} onTabClick={handleTabClick}/>
        <TableTop
        />
        {data && (
                <Table rows={data} page={currentPage} perPage={perPage}>
                    <THead columns={columns} />
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
