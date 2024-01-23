import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { titleCase } from "title-case";
import {
    getCSV,
    getCampusDetails,
    getStudentDetails,
    getStudentLevel,
    getWeeklyKarma,
    setAlumniStatus
} from "../services/apis";
import { BarChart } from "../Components/Graphs";
import styles from "./CampusStudentList.module.css";
import CLIcon from "../assets/images/CampusLeadIcon.svg";
import CEIcon from "../../LearningCircle/assets/images/Lead icon.svg";
import { convertDateToDayAndMonth } from "../../../utils/common";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import Modal from "@/MuLearnComponents/Modal/Modal";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { AiOutlineDownload } from "react-icons/ai";
import toast from "react-hot-toast";

type Props = {};

//TODO: Change the styles to camelCase from snake_case'
//TODO: Move Logic to another file.

const CampusStudentList = (props: Props) => {
    const [studentData, setStudentData] = useState<any[]>([]);
    const [perPage, setPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [noOrg, setNoOrg] = useState(false);
    const [sort, setSort] = useState("");
    const [CSVBlob, setCSVFile] = useState<Blob | null>();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    //graph data
    const [pieData, setPieData] = useState<string[][] | null>(null);
    const [barData, setBarData] = useState<string[][] | null>(null);

    const [currModal, setCurrModal] = useState<boolean>(false);
    const [currBox, setCurrBox] = useState<{
        id: string;
        value: boolean;
    } | null>(null);

    const errHandler = (err: any) => {
        toast.error("Data fetch failed");
        toast.error(err);
    };

    const columnOrder: {
        isSortable: boolean;
        column: string;
        Label: string;
        wrap?: (data: string | ReactElement, id: string) => ReactJSXElement;
    }[] = [
        { column: "fullname", Label: "Name", isSortable: true },
        // { column: "email", Label: "Email", isSortable: false },
        { column: "karma", Label: "Karma", isSortable: true },
        { column: "level", Label: "Level", isSortable: true },
        { column: "rank", Label: "Rank", isSortable: false },
        { column: "muid", Label: "MuId", isSortable: true },
        { column: "email", Label: "Email", isSortable: true },
        { column: "mobile", Label: "Mobile", isSortable: true },
        { column: "join_date", Label: "Join Date", isSortable: true },
        {
            column: "is_alumni",
            Label: "Alumni",
            isSortable: true,
            wrap: (data, id) => {
                return (
                    <AlumniCheckBox
                        checked={data === "true" ? true : false}
                        id={id}
                        setCurrBox={setCurrBox}
                        setCurrModal={setCurrModal}
                    />
                );
            }
        }
    ];

    const [campusData, setCampusData] = useState({
        college_name: "",
        campus_lead: "",
        campus_code: "",
        campus_zone: "",
        total_karma: "",
        total_members: "",
        active_members: "",
        rank: "",
        lead: {
            campus_lead: "",
            enabler: ""
        }
    });
    const firstFetch = useRef(true);
    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getStudentDetails(
            setStudentData,
            nextPage,
            perPage,
            setTotalPages,
            search
        );
    };
    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getStudentDetails(
            setStudentData,
            prevPage,
            perPage,
            setTotalPages,
            search
        );
    };
    useEffect(() => {
        if (firstFetch.current) {
            getCSV(setCSVFile, msg => console.log(msg));
            getStudentDetails(
                setStudentData,
                1,
                perPage,
                setTotalPages,
                "",
                "",
                setNoOrg
            );
            getCampusDetails(setCampusData);
            (async () => {
                let weeklyKarma = await getWeeklyKarma(errHandler);
                let formatedData = weeklyKarma.map((item: any) => [
                    convertDateToDayAndMonth(item[0]),
                    item[1]
                ]);

                setBarData([["", "Karma"]].concat(formatedData));
                setPieData(
                    [["Level", "UsersPerLevel"]].concat(
                        await getStudentLevel(errHandler)
                    )
                );
            })();
        }

        if (!currModal) {
            getStudentDetails(
                setStudentData,
                1,
                perPage,
                setTotalPages,
                "",
                "",
                setNoOrg
            );
        }
        firstFetch.current = false;
    }, [currModal]);

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        setSearch(search);
        getStudentDetails(
            setStudentData,
            1,
            perPage,
            setTotalPages,
            search,
            ""
        );
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setPerPage(selectedValue);
        setCurrentPage(1);

        getStudentDetails(
            setStudentData,
            1,
            selectedValue,
            setTotalPages,
            search,
            ""
        );
    };

    const handleIconClick = (column: string) => {
        if (column === "fullname") {
            column = "first_name"; //TODO: Change this when backend is ready
        }
        if (sort === column) {
            setSort(`-${column}`);
            getStudentDetails(
                setStudentData,
                1,
                perPage,
                setTotalPages,
                search,
                `-${column}`
            );
        } else {
            setSort(column);
            getStudentDetails(
                setStudentData,
                1,
                perPage,
                setTotalPages,
                search,
                column
            );
        }
        //console.log(`Icon clicked for column: ${column}`);
    };

    return (
        <>
            {currModal && currBox && (
                <Modal
                    setIsOpen={isOpen => setCurrModal(isOpen)}
                    id={currBox.id}
                    heading={"Change Alumni Status"}
                    content={
                        "Are you sure you want to change the alumni status?"
                    }
                    click={async () => {
                        setCurrModal(false);
                        await setAlumniStatus(
                            currBox.id,
                            currBox.value,
                            msg => {}
                        );
                        //workaround state not updating issue
                        await new Promise(res => setTimeout(res, 1000));
                        setStudentData([]);
                    }}
                />
            )}
            {noOrg ? (
                <div className={styles.no_org}>
                    <p className={styles.no_org_heading}>
                        No Organisation Found
                    </p>
                    <p className={styles.no_org_tagline}>
                        Kindly, raise a support ticket by typing
                        '/support-ticket' in the discord to add one.
                    </p>
                    <button
                        className={styles.no_org_button}
                        onClick={() => navigate("/dashboard/college")}
                    >
                        Go Back
                    </button>
                </div>
            ) : (
                <>
                    {!campusData.campus_code ? (
                        <MuLoader />
                    ) : (
                        <div className={styles.campus_student_list_container}>
                            <div className={styles.content}>
                                <div className={styles.sec1}>
                                    <div className={styles.sec_clg}>
                                        <h1 className={styles.clg_name}>
                                            {campusData &&
                                                campusData.college_name &&
                                                titleCase(
                                                    campusData?.college_name?.toLowerCase()
                                                )}
                                            ({campusData.campus_code})
                                        </h1>
                                    </div>

                                    <div className={styles.details_card}>
                                        <div className={styles.card_one}>
                                            <div className={styles.card}>
                                                <h1>
                                                    {parseInt(
                                                        campusData.total_karma
                                                    ) > 1000
                                                        ? (
                                                              parseInt(
                                                                  campusData.total_karma
                                                              ) / 1000
                                                          ).toPrecision(4) + "K"
                                                        : campusData.total_karma}
                                                </h1>
                                                <p>Karma</p>
                                            </div>
                                            <div className={styles.card}>
                                                <h1>
                                                    {campusData.total_members}
                                                </h1>
                                                <p>Total Members</p>
                                            </div>
                                        </div>
                                        <div className={styles.card_one}>
                                            <div className={styles.card}>
                                                <h1>
                                                    {campusData.active_members}
                                                </h1>
                                                <p>Active Members</p>
                                            </div>
                                            <div className={styles.card}>
                                                <div
                                                    className={
                                                        styles.campus_lead_card
                                                    }
                                                >
                                                    <img src={CLIcon} alt="" />
                                                    <h2>
                                                        {
                                                            campusData.lead
                                                                .campus_lead
                                                        }
                                                    </h2>
                                                    <p>Campus Lead</p>
                                                </div>
                                            </div>
                                            {campusData.lead.enabler && (
                                                <div className={styles.card}>
                                                    <div
                                                        className={
                                                            styles.campus_lead_card
                                                        }
                                                    >
                                                        <img
                                                            src={CEIcon}
                                                            alt=""
                                                        />
                                                        <h2>
                                                            {
                                                                campusData.lead
                                                                    .enabler
                                                            }
                                                        </h2>
                                                        <p>
                                                            Campus Lead Enabler
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.sec2}>
                                    <p className={styles.clg_rank}>
                                        {campusData?.rank?.toString().length ===
                                        1
                                            ? "0" + campusData.rank
                                            : campusData.rank}
                                    </p>
                                    <p className={styles.clg_rank_overlay}>
                                        RANK
                                    </p>

                                    <p className={styles.clg_zone}>
                                        {campusData.campus_zone} Zone
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={styles.graphs}>
                        <div className={styles.container}>
                            <h2>Weekly Karma Insights</h2>

                            <BarChart
                                data={barData}
                                ylabel="Karma"
                                addOptions={{
                                    legend: { position: "none" },
                                    colors: ["#91ABFF"]
                                }}
                            />
                        </div>
                        <div className={styles.container}>
                            <h2>Student Statistics</h2>
                            <BarChart data={pieData} />
                        </div>
                    </div>
                    {/* <div className={styles.btnContainer}>
                        <PowerfulButton onClick={() => { }}>
                            <AiOutlineDownload />
                            <a
                                href={
                                    CSVBlob ? URL.createObjectURL(CSVBlob) : ""
                                }
                                download
                            >
                                Download
                            </a>
                        </PowerfulButton>
                    </div> */}
                    {/* {studentData && (
                        <>
                            <TableTop
                                onSearchText={handleSearch}
                                onPerPageNumber={handlePerPageNumber}
                            />
                            <Table
                                rows={studentData}
                                page={currentPage}
                                perPage={perPage}
                                columnOrder={columnOrder}
                            >
                                <THead
                                    columnOrder={columnOrder}
                                    onIconClick={handleIconClick}
                                />
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    margin="10px 0"
                                    handleNextClick={handleNextClick}
                                    handlePreviousClick={handlePreviousClick}
                                    onPerPageNumber={handlePerPageNumber}
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                />

                                
                            </Table>
                        </>
                    )} */}
                </>
            )}
        </>
    );
};

type checkbox_T = {
    checked: boolean;
    id: string;
    setCurrModal: (isOpen: boolean) => void;
    setCurrBox: (data: { id: string; value: boolean }) => void;
};

function AlumniCheckBox(props: checkbox_T) {
    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        props.setCurrBox({ id: props.id, value: e.target.checked });
        props.setCurrModal(true);
    };

    return (
        <input
            type="checkbox"
            checked={props.checked}
            className={styles.checkbox}
            onChange={handleChange}
        />
    );
}

export default CampusStudentList;
