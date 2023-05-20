import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../../../../components/MuComponents/Table/Table'
import THead from '../../../../components/MuComponents/Table/THead'
import TableTop from '../../../../components/MuComponents/TableTop/TableTop'
import Pagination from '../../../../components/MuComponents/Pagination/Pagination'
import { getInterestGroups } from '../InterestGroup/apis'
import { MuButtonLight } from '../../../../components/MuComponents/MuButtons/MuButton'
import PrimaryButton from '../../../../components/MuComponents/MuButtons/MuOutlinedButton'

import "./Organizations.scss"

function Organizations() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const navigate = useNavigate();

    const tabletopTab = ["Colleges", "Companies", "Communities"]

    const columnsCollege = [
        "S/N",
        "Code",
        "Rank",
		"Affiliation",
        "District",
        "Zone"
    ];

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

  return (
    <>
        Organization
        <TableTopTab/>
        <TableTop
        />
        {data && (
                <Table rows={data} page={currentPage} perPage={perPage}>
                    <THead columns={columnsCollege} />
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

const TableTopTab = () => {
    return(
        <div className='_table_tab_container'>
            <MuButtonLight 
                text="college"
                style={{
                    width:"max-content"
                }}
            />
            <PrimaryButton 
                text="college"
            />
            <PrimaryButton 
                text="college"
            />
        </div>
    )
}

export default Organizations
