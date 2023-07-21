import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import Table from '../../../../components/MuComponents/Table/Table'
import THead from '../../../../components/MuComponents/Table/THead'
import TableTop from '../../../../components/MuComponents/TableTop/TableTop'
import Pagination from '../../../../components/MuComponents/Pagination/Pagination'
import styles from "../../../../components/MuComponents/FormikComponents/FormComponents.module.css";
import './ManageLocation.scss'
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  columnsCountry,
  columnsState,
  columnsZone,
  columnsDistrict
} from './ManageLocationHeaders';

import { getCountryData,deleteCountryData} from './apis/CountryAPI';
import { getStateData, deleteStateData } from './apis/StateAPI';
import { getZoneData, deleteZoneData } from './apis/ZoneAPI';
import { getDistrictData, deleteDistrictData } from './apis/DistrictAPI';

import LocationPopup from './LocationPopup';
import { hasRole } from "../../../../services/common_functions";
import { roles } from "../../../../services/types";
import { MuButton } from '@/MuLearnComponents/MuButtons/MuButton';

const ManageLocation = () => {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [columns, setColumns] = useState(columnsCountry)
  const [sort, setSort] = useState('');
  const [activeTab, setActiveTab] = useState("Country")
  const [popupStatus, setPopupStatus] = useState(false)
  const [popupFields, setPopupFields] = useState({
    countryShow: true,
    stateShow: false,
    zoneShow: false,
  })
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedZone, setSelectedZone] = useState("")

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!hasRole([roles.ADMIN, roles.FELLOW])) navigate("/404");
  })

  useEffect(() => {
    if (location.state) {
      setActiveTab(location.state.activeItem)
      setPopupStatus(false)
    }
  }, [])

  useEffect(() => {
    if (activeTab === "Country") {
      getCountryData(setData, setTotalPages)
      setPopupFields({
        countryShow: true,
        stateShow: false,
        zoneShow: false
      });
      setColumns(columnsCountry)
    } else if (activeTab === "State") {
      setPopupStatus(true)
      setPopupFields(prev => ({ ...prev, stateShow: false, zoneShow: false }))
      setColumns(columnsState)
    } else if (activeTab === "Zone") {
      setPopupStatus(true)
      setPopupFields(prev => ({ ...prev, stateShow: true, zoneShow: false }))
      setColumns(columnsZone)
    } else if (activeTab === "District") {
      setPopupStatus(true)
      setPopupFields(prev => ({ ...prev, stateShow: true, zoneShow: true }))
      setColumns(columnsDistrict)
    }
    // return(
    //   setData([]),
    //   setTotalPages(1)
    // )
  }, [activeTab])


  const handleNextClick = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const handlePreviousClick = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
  };

  const handleSearch = (search: string) => {
    setCurrentPage(1);
  };

  const handlePerPageNumber = (selectedValue: number) => {
    setCurrentPage(1);
    setPerPage(selectedValue);
  };

  const handleIconClick = (column: string) => {
    if (sort === column) {
      setSort(`-${column}`);
    } else {
      setSort(column);
    }
  };

  function handleEdit(id: string | number | boolean): void {
    console.log(id)
    navigate('edit/country', {
      state: {
        activeItem: activeTab,
        country: selectedCountry,
        state: selectedState,
        zone: selectedZone,
        value: id
      }
    })
  }

  function handleDelete(id: any): void {
    setData([])
    console.log("delete-data ->",id)
    if (activeTab === "Country") {
      deleteCountryData(id)
    }
    else if (activeTab === "State") {
      deleteStateData(selectedCountry, id)
      alert("state edited")
    }
    else if (activeTab === "Zone") {
      deleteZoneData(selectedCountry,selectedState, id)
      alert("zone edited")
    }
    else if (activeTab === "District") {
      deleteDistrictData(selectedCountry,selectedState,selectedZone, id)
      alert("district edited")
    }
  }

  function handleTabClick(tab: string) {
    setActiveTab(tab)
  }

  return (
    <>
      {
        activeTab !== "Country" &&
        <div
          onClick={() => setPopupStatus(true)}
        >Change Location</div>
      }
      <TableTopToggle
        active={activeTab}
        onTabClick={handleTabClick}
        country={selectedCountry}
        state={selectedState}
        zone={selectedZone}
      />
      <TableTop
        onSearchText={handleSearch}
        onPerPageNumber={handlePerPageNumber}
      // CSV={`${organizationRoutes.getOrgCsv}/${activeTabName}`}
      // CSV={"https://dev.muelarn.org/api/v1/dashboard/ig/csv"}        
      // CSV={"http://localhost:8000/api/v1/dashboard/ig/csv"} 
      />
      {
        console.log("this is table data", data)
      }
      {data && (
        <Table
          rows={data}
          page={currentPage}
          perPage={perPage}
          columnOrder={columns}
          id={['label']}
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
      <LocationPopup
        isShowPopup={popupStatus}
        handlePopup={setPopupStatus}
        popupFields={popupFields}
        activeItem={activeTab}
        handleData={setData}
        handleCountry={setSelectedCountry}
        handleState={setSelectedState}
        handleZone={setSelectedZone}
      />
    </>
  )
}

const TableTopToggle = ({ active, onTabClick, country, state, zone }: any) => {
  const tabItems = ["Country", "State", "Zone", "District"]

  const navigate = useNavigate()

  function handleAddLocation() {
    navigate('add/country', {
      state: {
        activeItem: active,
        country: country,
        state: state,
        zone: zone
      }
    })
  }
  return (
    <div className="ml_top_container">
      <div className="ml_toggle_container">
        {
          tabItems?.map((item: string): any => (
            <MuButton
              key={item}
              text={item}
              className={
                active === item
                  ? "table_tab_btn active"
                  : "table_tab_btn inactive"
              }
              onClick={() => {
                onTabClick(item)
              }}
            />
          ))
        }
      </div>
      <div className="createBtnContainer">
        <MuButton
          className="createBtn"
          text={`Add ${active}`}
          icon={<AiOutlinePlusCircle></AiOutlinePlusCircle>}
          onClick={handleAddLocation}
        />
      </div>
    </div>
  )
}

export default ManageLocation
