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
    setAlumniStatus,
    CampusDataSet,
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
import * as Dialog from "@radix-ui/react-dialog";
import { Trophy, Users, Info, Medal, X } from "lucide-react";

type Props = {};

interface GradeRequirement {
    grade: "A" | "B" | "C";
    requirements: string[];
}

// Hardcoded grade requirements (to be replaced by API later)
const gradeRequirements: GradeRequirement[] = [
    {
        grade: "A",
        requirements: [
            "Maintain 90% student engagement",
            "Complete 10 major projects",
            "Achieve 1000+ karma points",
        ],
    },
    {
        grade: "B",
        requirements: [
            "Maintain 75% student engagement",
            "Complete 7 major projects",
            "Achieve 750+ karma points",
        ],
    },
    {
        grade: "C",
        requirements: [
            "Maintain 60% student engagement",
            "Complete 5 major projects",
            "Achieve 500+ karma points",
        ],
    },
];

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

    const [pieData, setPieData] = useState<string[][] | null>(null);
    const [barData, setBarData] = useState<string[][] | null>(null);

    const [currModal, setCurrModal] = useState<boolean>(false);
    const [currBox, setCurrBox] = useState<{
        id: string;
        value: boolean;
    } | null>(null);

    const [campusData, setCampusData] = useState<CampusDataSet>({
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
            enabler: "",
        },
    });

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
        { column: "muid", Label: "MuId", isSortable: true },
        // { column: "fullname", Label: "Name", isSortable: true },
        { column: "karma", Label: "Karma", isSortable: true },
        { column: "level", Label: "Level", isSortable: true },
        { column: "rank", Label: "Rank", isSortable: false },
        { column: "email", Label: "Email", isSortable: true },
        // { column: "mobile", Label: "Mobile", isSortable: true },
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
            },
        },
    ];

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
            getCSV(setCSVFile, (msg) => console.log(msg));
            getStudentDetails(
                setStudentData,
                1,
                perPage,
                setTotalPages,
                "",
                "",
                setNoOrg
            );
            getCampusDetails(setCampusData); // Original fetch logic
            (async () => {
                let weeklyKarma = await getWeeklyKarma(errHandler);
                let formatedData = weeklyKarma.map((item: any) => [
                    convertDateToDayAndMonth(item[0]),
                    item[1],
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
            column = "first_name"; // TODO: Change this when backend is ready
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
    };

    const getGradeIcon = (grade: "A" | "B" | "C" | "N/A"): JSX.Element | null => {
        switch (grade) {
            case "A":
                return <Trophy className="h-8 w-8" style={{ color: "#0066FF" }} />;
            case "B":
                return <Trophy className="h-8 w-8" style={{ color: "#94A3B8" }} />;
            case "C":
                return <Trophy className="h-8 w-8" style={{ color: "#B45309" }} />;
            case "N/A":
                return <Trophy className="h-8 w-8" style={{ color: "#64748B" }} />; // Gray for placeholder
            default:
                return null;
        }
    };

    return (
        <>
            {currModal && currBox && (
                <Modal
                    setIsOpen={(isOpen) => setCurrModal(isOpen)}
                    id={currBox.id}
                    heading={"Change Alumni Status"}
                    content={"Are you sure you want to change the alumni status?"}
                    click={async () => {
                        setCurrModal(false);
                        await setAlumniStatus(currBox.id, currBox.value, (msg) => {});
                        await new Promise((res) => setTimeout(res, 1000));
                        setStudentData([]);
                    }}
                />
            )}
            {noOrg ? (
                <div className={styles.no_org}>
                    <p className={styles.no_org_heading}>No Organisation Found</p>
                    <p className={styles.no_org_tagline}>
                        Kindly, raise a support ticket by typing '/support-ticket' in the discord to add one.
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
                        <div className={styles.container}>
                            <div className={styles.wrapper}>
                                <div className={styles.header}>
                                    <div className={styles.titleSection}>
                                        <h1 className={styles.title}>
                                            {titleCase(campusData.college_name.toLowerCase())} ({campusData.campus_code})
                                        </h1>
                                    </div>
                                </div>

                                <div className={styles.grid}>
                                    {/* <div className={styles.cardWithBorder}>
                                        <div className={styles.cardHeader}>
                                            <h3 className={styles.cardTitle}>Campus Grade</h3>
                                            <Dialog.Root>
                                                <Dialog.Trigger asChild>
                                                    <button className={styles.iconButton}>
                                                        <Info size={16} />
                                                        <span className="sr-only">Grade requirements</span>
                                                    </button>
                                                </Dialog.Trigger>
                                                <Dialog.Portal>
                                                    <Dialog.Overlay className={styles.dialogOverlay} />
                                                    <Dialog.Content className={styles.dialogContent}>
                                                        <Dialog.Title className={styles.dialogTitle}>
                                                            Grade Requirements
                                                        </Dialog.Title>
                                                        <div className={styles.dialogBody}>
                                                            {gradeRequirements.map((req) => (
                                                                <div key={req.grade} className={styles.gradeRequirement}>
                                                                    <div className={styles.gradeDisplay}>
                                                                        {getGradeIcon(req.grade)}
                                                                        <h3 className={styles.gradeText}>Grade {req.grade}</h3>
                                                                    </div>
                                                                    <ul className={styles.requirementsList}>
                                                                        {req.requirements.map((requirement, index) => (
                                                                            <li key={index}>{requirement}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <Dialog.Close asChild>
                                                            <button className={styles.dialogCloseButton}>
                                                                <X size={16} />
                                                                <span className="sr-only">Close</span>
                                                            </button>
                                                        </Dialog.Close>
                                                    </Dialog.Content>
                                                </Dialog.Portal>
                                            </Dialog.Root>
                                        </div>
                                        <div className={styles.gradeDisplay}>
                                            {getGradeIcon("N/A")}
                                            <span className={styles.gradeText}>Grade N/A</span>
                                        </div>
                                    </div> */}

                                    <div className={styles.cardHover}>
                                        <div className={styles.cardHeader}>
                                            <h3 className={styles.cardTitle}>Karma Points</h3>
                                            <Medal size={16} style={{ color: "#0066FF" }} />
                                        </div>
                                        <div className={styles.statsValue}>
                                            {parseInt(campusData.total_karma) > 1000
                                                ? (parseInt(campusData.total_karma) / 1000).toPrecision(4) + "K"
                                                : parseInt(campusData.total_karma).toLocaleString()}
                                        </div>
                                        <p className={styles.statsLabel}>Points earned this year</p>
                                    </div>

                                    <div className={styles.cardHover}>
                                        <div className={styles.cardHeader}>
                                            <h3 className={styles.cardTitle}>Active Students</h3>
                                            <Users size={16} style={{ color: "#0066FF" }} />
                                        </div>
                                        <div className={styles.statsValue}>{campusData.active_members}</div>
                                        <p className={styles.statsLabel}>Currently active</p>
                                    </div>

                                    <div className={styles.cardHover}>
                                        <div className={styles.cardHeader}>
                                            <h3 className={styles.cardTitle}>Overall Rank</h3>
                                            <Trophy size={16} style={{ color: "#0066FF" }} />
                                        </div>
                                        <div className={styles.statsValue}>
                                            #{campusData.rank.toString().length === 1
                                                ? "0" + campusData.rank
                                                : campusData.rank}
                                        </div>
                                        <p className={styles.statsLabel}>Among all campuses</p>
                                    </div>
                                </div>

                                <div className={styles.leadershipSection}>
                                    <h3 className={styles.leadershipTitle}>Campus Leadership</h3>
                                    <div className={styles.leadershipGrid}>
                                        <div className={styles.leaderCard}>
                                            <div className="flex items-center flex-col">
                                                <img src={CLIcon} alt="Campus Lead" className={styles.leaderIcon} />
                                                <div className={styles.leaderName}>{campusData.lead.campus_lead}</div>
                                                <span className={styles.leaderRole}>Campus Lead</span>
                                            </div>
                                        </div>
                                        {campusData.lead.enabler && (
                                            <div className={styles.leaderCard}>
                                                <div className="flex flex-col items-center">
                                                    <img src={CEIcon} alt="Campus Enabler" className={styles.leaderIcon} />
                                                    <div className={styles.leaderName}>{campusData.lead.enabler}</div>
                                                    <span className={styles.leaderRole}>Campus Lead Enabler</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.graphs}>
                                    <div className={styles.graphContainer}>
                                        <h2>Weekly Karma Insights</h2>
                                        <BarChart
                                            data={barData}
                                            ylabel="Karma"
                                            addOptions={{
                                                legend: { position: "none" },
                                                colors: ["#91ABFF"],
                                            }}
                                        />
                                    </div>
                                    <div className={styles.graphContainer}>
                                        <h2>Student Statistics</h2>
                                        <BarChart data={pieData} />
                                    </div>
                                </div>

                                <div className={styles.btnContainer}>
                                    <PowerfulButton onClick={() => {}}>
                                        <AiOutlineDownload />
                                        <a href={CSVBlob ? URL.createObjectURL(CSVBlob) : ""} download>
                                            Download
                                        </a>
                                    </PowerfulButton>
                                </div>

                                {studentData && (
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
                                )}
                            </div>
                        </div>
                    )}
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