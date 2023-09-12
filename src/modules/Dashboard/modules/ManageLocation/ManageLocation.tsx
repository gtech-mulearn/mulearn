import { useState, useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import "./ManageLocation.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
    columnsCountry,
    columnsState,
    columnsZone,
    columnsDistrict
} from "./ManageLocationHeaders";

import { getCountryData, deleteCountryData } from "./apis/CountryAPI";
import { getStateData, deleteStateData } from "./apis/StateAPI";
import { getZoneData, deleteZoneData } from "./apis/ZoneAPI";
import { getDistrictData, deleteDistrictData } from "./apis/DistrictAPI";

import LocationPopup from "./LocationPopup";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useToast } from "@chakra-ui/react";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

type LocationItem = { value: string; label: string } | string;

const ManageLocation = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [perPage, setPerPage] = useState(20);
    const [columns, setColumns] = useState(columnsCountry);
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("Country");
    const [popupStatus, setPopupStatus] = useState(false);
    const [popupFields, setPopupFields] = useState({
        countryShow: true,
        stateShow: false,
        zoneShow: false
    });
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedZone, setSelectedZone] = useState("");
    const [isDeclined, setIsDeclined] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    useEffect(() => {
        if (location.state) {
            setActiveTab(location.state.activeItem);
            setPopupStatus(false);
        }
    }, []);

    useEffect(() => {
        if (isDeclined) {
            setActiveTab("Country");
            setColumns(columnsCountry);
            setIsDeclined(false);
        }
    }, [popupStatus]);

    function loadTableData() {
        setLoading(true);
        if (activeTab === "Country") {
            setPopupStatus(false);
            getCountryData(
                setData,
                toast,
                perPage,
                currentPage,
                setTotalPages,
                search,
                sort
            ).finally(() => setLoading(false));
            setPopupFields({
                countryShow: true,
                stateShow: false,
                zoneShow: false
            });
            setColumns(columnsCountry);
        } else if (activeTab === "State") {
            setPopupStatus(true);
            setPopupFields(prev => ({
                ...prev,
                stateShow: false,
                zoneShow: false
            }));
            setColumns(columnsState);
        } else if (activeTab === "Zone") {
            setPopupStatus(true);
            setPopupFields(prev => ({
                ...prev,
                stateShow: true,
                zoneShow: false
            }));
            setColumns(columnsZone);
        } else if (activeTab === "District") {
            setPopupStatus(true);
            setPopupFields(prev => ({
                ...prev,
                stateShow: true,
                zoneShow: true
            }));
            setColumns(columnsDistrict);
        }
    }

    function getLocationData() {
        if (activeTab === "Country") {
            getCountryData(
                setData,
                toast,
                perPage,
                currentPage,
                setTotalPages,
                search,
                sort
            );
        } else if (activeTab === "State") {
            getStateData(
                selectedCountry,
                setData,
                toast,
                perPage,
                currentPage,
                setTotalPages,
                search,
                sort
            );
        } else if (activeTab === "Zone") {
            getZoneData(
                selectedState,
                setData,
                perPage,
                currentPage,
                setTotalPages,
                search,
                sort
            );
        } else if (activeTab === "District") {
            getDistrictData(
                selectedZone,
                setData,
                perPage,
                currentPage,
                setTotalPages,
                search,
                sort
            );
        }
    }

    useEffect(() => {
        loadTableData();
        setCurrentPage(1);
        setPerPage(5);
        setSearch("");
        setSort("");
        return setData([]), setTotalPages(1);
    }, [activeTab]);

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
        setSearch(search);
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
        console.log(id);
        navigate("edit/country", {
            state: {
                activeItem: activeTab,
                country: selectedCountry,
                state: selectedState,
                zone: selectedZone,
                value: id,
                name: data.find(item => item.id === id)?.name
            }
        });
    }

    function handleDelete(id: any): void {
        setData([]);
        if (activeTab === "Country") {
            deleteCountryData(id);
        } else if (activeTab === "State") {
            deleteStateData(id);
        } else if (activeTab === "Zone") {
            deleteZoneData(id);
        } else if (activeTab === "District") {
            deleteDistrictData(id);
        }
        getLocationData();
    }

    function handleTabClick(tab: string) {
        setActiveTab(tab);
    }

    useEffect(() => {
        getLocationData();
    }, [sort, currentPage, perPage, search]);

    return (
        <>
            <TableTopToggle
                active={activeTab}
                onTabClick={handleTabClick}
                country={selectedCountry}
                state={selectedState}
                zone={selectedZone}
                handleData={setData}
                handleCountry={country => setSelectedCountry(country)}
                handleState={state => setSelectedState(state)}
                handleZone={zone => setSelectedZone(zone)}
            />
            {activeTab !== "Country" && (
                <LocationPath
                    handlePopup={setPopupStatus}
                    country={selectedCountry}
                    state={selectedState}
                    zone={selectedZone}
                />
            )}

            {data && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                    />
                    {loading ? (
                        <MuLoader />
                    ) : (
                        <Table
                            rows={data}
                            page={currentPage}
                            perPage={perPage}
                            columnOrder={columns}
                            id={["id"]}
                            onEditClick={handleEdit}
                            onDeleteClick={handleDelete}
                            modalDeleteHeading="Delete"
                            modalTypeContent="error"
                            modalDeleteContent="Are you sure you want to delete "
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
                                perPage={perPage}
                                setPerPage={setPerPage}
                            />
                            {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                        </Table>
                    )}
                </>
            )}
            <LocationPopup
                isShowPopup={popupStatus}
                handlePopup={setPopupStatus}
                popupFields={popupFields}
                activeItem={activeTab}
                handleData={setData}
                handleCountry={country => setSelectedCountry(country)}
                handleState={state => setSelectedState(state)}
                handleZone={zone => setSelectedZone(zone)}
                handleDeclined={setIsDeclined}
                setTotalPages={setTotalPages}
                setLoader={setLoading}
            />
        </>
    );
};
type TableTopToggleType = {
    active: string;
    onTabClick: UseStateFunc<any>;
    country: string;
    state: string;
    zone: string;
    handleData: UseStateFunc<any>;
    handleCountry: UseStateFunc<string>;
    handleState: UseStateFunc<string>;
    handleZone: UseStateFunc<string>;
};
const TableTopToggle: FC<TableTopToggleType> = ({
    active,
    onTabClick,
    country,
    state,
    zone,
    handleData,
    handleCountry,
    handleState,
    handleZone
}) => {
    const tabItems = ["Country", "State", "Zone", "District"];

    const navigate = useNavigate();

    function handleAddLocation() {
        navigate(`add/${active.toLowerCase()}`, {
            state: {
                activeItem: active,
                country: country,
                state: state,
                zone: zone
            }
        });
    }

    function handleTabClick(item: string) {
        onTabClick(item);
        if (item !== active) {
            handleData([]);
            if (item === "Country") {
                handleCountry("");
                handleState("");
                handleZone("");
            } else if (item === "State") {
                handleState("");
                handleZone("");
            } else if (item === "Zone") {
                handleZone("");
            } else if (item === "District") {
                console.log("no changes");
            } else {
                handleCountry("");
                handleState("");
                handleZone("");
            }
        }
    }

    return (
        <div className="ml_top_container">
            <div className="ml_toggle_container">
                {tabItems?.map((item: string): any => (
                    <MuButton
                        key={item}
                        text={item}
                        className={
                            active === item
                                ? "table_tab_btn active"
                                : "table_tab_btn inactive"
                        }
                        onClick={() => {
                            handleTabClick(item);
                        }}
                    />
                ))}
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
    );
};

const LocationPath = ({
    handlePopup,
    country,
    state,
    zone
}: {
    handlePopup: (status: boolean) => void;
    country?: string;
    state?: string;
    zone?: string;
}) => {
    function locationTextGenerate() {
        return `${country?.toUpperCase()}${
            state ? ` /  ${state?.toUpperCase()}` : ""
        }${zone ? ` / ${zone?.toUpperCase()}` : ""}`;
    }

    return (
        <div className="path_container">
            <p>{locationTextGenerate()}</p>
            <h3 onClick={() => handlePopup(true)}>change</h3>
        </div>
    );
};

export default ManageLocation;
