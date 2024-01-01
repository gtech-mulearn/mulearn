import React, { useEffect, useState } from "react";
import styles from "./LearningCircles.module.css";
import {
    getHackDashboard,
    getHackathonReport,
    getLCDashboard,
    getLCReport,
    getOrgWiseReport
} from "./services/LearningCircles";
import {
    OrgCircle,
    OrgData,
    ResponseType,
    TableToggleProps,
    UserDetail,
    HackData,
    HackDashboard
} from "./services/types";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import Chart from "react-google-charts";
import { useSearchParams } from "react-router-dom";
import { KKEMRoutes } from "@/MuLearnServices/urls";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import KKEMAuthentication from "./Authentication/KKEMAuthentication";
import toast from "react-hot-toast";
const LearningCircles = () => {
    const [authorized, setAuthorized] = useState(true);

    const [searchParams] = useSearchParams();
    const key = searchParams.get("key"); // [key: string

    useEffect(() => {
        if (key === "CDV9co7KhOxA9pqbsi68Q07tsDlg9llapsMvmTSdFHs81SH1ol") {
            setAuthorized(true);
        } else {
            setAuthorized(false);
        }
    }, [key]);

    const [LcCounts, setLcCounts] = useState<ResponseType>({
        lc_count: 0,
        total_enrollment: 0,
        circle_count_by_ig: [],
        unique_users: 0
    });
    const [LcReport, setLcReport] = useState<UserDetail[]>([]);
    const [OrgWiseReport, setOrgWiseReport] = useState<OrgData[]>([]);
    const [HackathonReport, setHackathonReport] = useState<HackData[]>([]);
    const [sort, setSort] = useState("");
    const [sortOrg, setSortOrg] = useState("");
    const [date, setDate] = useState("");
    const [HackathonDashboard, setHackathonDashboard] = useState<
        HackDashboard[]
    >([]);

    useEffect(() => {
        if (authorized) {
            getLCDashboard(setLcCounts);
            getLCReport(
                setLcReport,
                currentPage,
                perPage,
                setTotalPages,
                "",
                sort,
                "",
                setLoading
            );
            getOrgWiseReport(
                setOrgWiseReport,
                orgCurrentPage,
                orgPerPage,
                setOrgTotalPages,
                "",
                sortOrg,
                "",
                setOrgLoading
            );
            getHackathonReport(
                setHackathonReport,
                currentHackPage,
                perHackPage,
                setTotalHackPages,
                "",
                "",
                setHackLoading
            );
            getHackDashboard(setHackathonDashboard);
        }
    }, [authorized]);
    console.log(HackathonDashboard[0]);

    const columnOrder: ColOrder[] = [
        { column: "full_name", Label: "Full Name", isSortable: true },
        { column: "muid", Label: "muid", isSortable: true },
        { column: "email", Label: "Email", isSortable: true },
        { column: "circle_name", Label: "Circle Name", isSortable: true },
        { column: "circle_ig", Label: "Circle IG", isSortable: true },
        { column: "organisation", Label: "organisation", isSortable: true },
        { column: "district", Label: "district", isSortable: true },
        { column: "dwms_id", Label: "DWMS ID", isSortable: true },
        { column: "karma_earned", Label: "Karma Earned", isSortable: true }
    ];

    const orgColumnOrder: ColOrder[] = [
        { column: "org_title", Label: "Organisation", isSortable: true },
        {
            column: "learning_circle_count",
            Label: "Circle Count",
            isSortable: true
        },
        { column: "user_count", Label: "User Count", isSortable: true }
    ];

    const HackathonColumnOrder: ColOrder[] = [
        { column: "CandidateName", Label: "Candidate Name", isSortable: false },
        {
            column: "ContactDetails",
            Label: "Contact Details",
            isSortable: false
        },
        { column: "DWMSID", Label: "DWMSID", isSortable: false },
        { column: "Email", Label: "Email", isSortable: false },
        { column: "HackathonName", Label: "Hackathon Name", isSortable: false }
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [orgCurrentPage, setOrgCurrentPage] = useState(1);
    const [currentHackPage, setCurrentHackPage] = useState(1);

    const [totalPages, setTotalPages] = useState(0);
    const [orgTotalPages, setOrgTotalPages] = useState(0);
    const [totalHackPages, setTotalHackPages] = useState(0);

    const [loading, setLoading] = useState(false);
    const [orgLoading, setOrgLoading] = useState(false);
    const [hackLoading, setHackLoading] = useState(false);

    const [perPage, setPerPage] = useState(20);
    const [orgPerPage, setOrgPerPage] = useState(20);
    const [perHackPage, setPerHackPage] = useState(20);

    const [dashboardPassword, setDashboardPassword] = useState("");
    const [loginTriggered, setLoginTriggered] = useState(false);
    const [passwordAuth, setPasswordAuth] = useState(false);

    useEffect(() => {
        if (loginTriggered)
            if (dashboardPassword === "kkem@123") {
                setPasswordAuth(true);
                toast.success("Logged In");
            } else {
                toast.error("Wrong Password");
            }
        {
        }
    }, [loginTriggered]);

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getLCReport(setLcReport, nextPage, perPage, setTotalPages);
    };

    const handleOrgNextClick = () => {
        const nextPage = orgCurrentPage + 1;
        setOrgCurrentPage(nextPage);
        getOrgWiseReport(
            setOrgWiseReport,
            nextPage,
            orgPerPage,
            setOrgTotalPages
        );
    };

    const handleHackNextClick = () => {
        const nextPage = currentHackPage + 1;
        setCurrentHackPage(nextPage);
        getHackathonReport(
            setHackathonReport,
            nextPage,
            perHackPage,
            setTotalHackPages
        );
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getLCReport(setLcReport, 1, perPage, setTotalPages);
    };

    const handleOrgPreviousClick = () => {
        const prevPage = orgCurrentPage - 1;
        setOrgCurrentPage(prevPage);
        getOrgWiseReport(setOrgWiseReport, 1, orgPerPage, setOrgTotalPages);
    };

    const handleHackPreviousClick = () => {
        const prevPage = currentHackPage - 1;
        setCurrentHackPage(prevPage);
        getHackathonReport(
            setHackathonReport,
            prevPage,
            perHackPage,
            setTotalHackPages
        );
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getLCReport(setLcReport, 1, perPage, setTotalPages, search, "");
    };

    const handleOrgSearch = (search: string) => {
        setOrgCurrentPage(1);
        getOrgWiseReport(
            setOrgWiseReport,
            1,
            orgPerPage,
            setOrgTotalPages,
            search,
            ""
        );
    };

    const handleHackSearch = (search: string) => {
        setCurrentHackPage(1);
        getHackathonReport(
            setHackathonReport,
            1,
            perHackPage,
            setTotalHackPages,
            search,
            ""
        );
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getLCReport(setLcReport, 1, selectedValue, setTotalPages, "", "");
    };

    const handleOrgPerPageNumber = (selectedValue: number) => {
        setOrgCurrentPage(1);
        setOrgPerPage(selectedValue);
        getOrgWiseReport(
            setOrgWiseReport,
            1,
            selectedValue,
            setOrgTotalPages,
            "",
            ""
        );
    };
    const handleHackPerPageNumber = (selectedValue: number) => {
        setCurrentHackPage(1);
        setPerHackPage(selectedValue);
        getHackathonReport(
            setHackathonReport,
            1,
            selectedValue,
            setTotalHackPages,
            "",
            ""
        );
    };
    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getLCReport(
                setLcReport,
                currentPage,
                perPage,
                setTotalPages,
                "",
                `-${column}`,
                "",
                setLoading
            );
        } else {
            setSort(column);
            getLCReport(
                setLcReport,
                currentPage,
                perPage,
                setTotalPages,
                "",
                column,
                "",
                setLoading
            );
        }
    };

    const handleOrgIconClick = (column: string) => {
        if (sortOrg === column) {
            setSortOrg(`-${column}`);
            getOrgWiseReport(
                setOrgWiseReport,
                orgCurrentPage,
                orgPerPage,
                setOrgTotalPages,
                "",
                `-${column}`,
                "",
                setOrgLoading
            );
        } else {
            setSortOrg(column);
            getOrgWiseReport(
                setOrgWiseReport,
                orgCurrentPage,
                orgPerPage,
                setOrgTotalPages,
                "",
                column,
                "",
                setOrgLoading
            );
        }
    };

    const handlehackIconClick = (column: string) => {
        console.log("sortButtonNotAdded");
    };

    const data = [["Interest Group", "Total Circles"]];
    LcCounts.circle_count_by_ig
        .sort((a, b) => a.total_circles - b.total_circles) // sort by total_circles in ascending order
        .forEach(item => {
            data.push([item.name, item.total_circles.toString()]);
        });
    const [active, setActive] = useState("Learning Circles");
    const TableToggle = ({
        active,
        tabClick,
        toggleOptions
    }: TableToggleProps) => {
        return (
            <div className={styles.table_toggle_options}>
                {toggleOptions.map((item: string): any => (
                    <PowerfulButton
                        className={
                            active === item
                                ? styles.table_toggle_active
                                : styles.table_toggle_inactive
                        }
                        variant="plain"
                        onClick={() => {
                            tabClick(item);
                        }}
                    >
                        {item}
                    </PowerfulButton>
                ))}
            </div>
        );
    };
    const handleToggle = (tab: string) => {
        setActive(tab);
    };

    const handleHackDashInputs = (input: string) => {
        const regex = /\[(.*?)\]/;
        const match = input.match(regex);
        if (match) {
            const subtext = match[1].split(",");
            const num = input.split("[")[0];
            return (
                <>
                    <p className={styles.count}>{num}</p>
                    <p className={styles.sublabel}>{subtext}</p>
                </>
            );
        } else {
            return (
                <>
                    <p className={styles.count}>{input}</p>
                </>
            );
        }
    };
    useEffect(() => {
        // Create a mapping of organisations to unique learning circles
        const orgCircleMap: { [key: string]: Set<string> } = {};
        LcReport.forEach(item => {
            const { organisation, circle_name } = item;

            if (!orgCircleMap[organisation]) {
                orgCircleMap[organisation] = new Set();
            }

            orgCircleMap[organisation].add(circle_name);
        });

        // Convert the mapping to an array of { orgName, circleCount }
        const resultArray: OrgCircle[] = Object.entries(orgCircleMap).map(
            ([org, circles]) => ({
                orgName: org,
                circleCount: circles.size
            })
        );

        // setOrgCirclesArray(resultArray);

        resultArray.sort((a, b) => {
            return a.circleCount - b.circleCount;
        });
    }, [LcReport]);

    return (
        <>
            {authorized ? (
                passwordAuth ? (
                    <div className={styles.dashboardContainer}>
                        <div className={styles.dashboardContent}>
                            <div className={styles.dateContainer}>
                                <p className={styles.heading}>Filter By Date</p>
                                <p className={styles.tagline}>
                                    If a date is selected, only the values that
                                    were recorded after that date will be
                                    displayed.
                                </p>
                                <div>
                                    <input
                                        type="date"
                                        className={styles.date}
                                        onChange={e => setDate(e.target.value)}
                                    />
                                    <button
                                        className={styles.dateButton}
                                        onClick={() => {
                                            getLCReport(
                                                setLcReport,
                                                currentPage,
                                                perPage,
                                                setTotalPages,
                                                "",
                                                "",
                                                date,
                                                setLoading
                                            );
                                            getLCDashboard(setLcCounts, date);
                                        }}
                                    >
                                        Filter
                                    </button>
                                    <button
                                        className={styles.dateButton}
                                        onClick={() => {
                                            getLCReport(
                                                setLcReport,
                                                currentPage,
                                                perPage,
                                                setTotalPages,
                                                "",
                                                "",
                                                "",
                                                setLoading
                                            );
                                            getLCDashboard(setLcCounts);
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                            <TableToggle
                                active={active}
                                tabClick={handleToggle}
                                toggleOptions={[
                                    "Learning Circles",
                                    "Hackathon"
                                ]}
                            />
                            {active === "Learning Circles" ? (
                                <div>
                                    <p className={styles.heading}>
                                        Learning Circles & Interest Group Counts
                                    </p>
                                    <div className={styles.countsContainer}>
                                        <div className={styles.studentsInvoled}>
                                            <p className={styles.label}>
                                                Total Enrollment
                                            </p>
                                            {LcCounts.total_enrollment && (
                                                <p className={styles.count}>
                                                    {LcCounts.total_enrollment}
                                                </p>
                                            )}
                                        </div>
                                        <div className={styles.studentsInvoled}>
                                            <p className={styles.label}>
                                                Unique Users
                                            </p>
                                            {LcCounts.total_enrollment && (
                                                <p className={styles.count}>
                                                    {LcCounts.unique_users}
                                                </p>
                                            )}
                                        </div>
                                        <div className={styles.lcCount}>
                                            <p className={styles.label}>
                                                Learning Circles
                                            </p>
                                            {LcCounts.lc_count && (
                                                <p className={styles.count}>
                                                    {LcCounts.lc_count}
                                                </p>
                                            )}
                                        </div>

                                        {LcCounts.circle_count_by_ig
                                            .sort(
                                                (a, b) =>
                                                    ((b.total_users ??
                                                        0) as number) -
                                                    ((a.total_users ??
                                                        0) as number)
                                            ) // sort by total_users in descending order
                                            .map((item, index) => {
                                                return (
                                                    <div
                                                        className={
                                                            styles.studentsInvoled
                                                        }
                                                        key={index}
                                                    >
                                                        <p
                                                            className={
                                                                styles.label
                                                            }
                                                        >
                                                            {item.name}
                                                        </p>
                                                        <div
                                                            className={
                                                                styles.counts
                                                            }
                                                        >
                                                            <div>
                                                                <p
                                                                    className={
                                                                        styles.count
                                                                    }
                                                                >
                                                                    {
                                                                        item.total_circles
                                                                    }
                                                                </p>
                                                                <span>
                                                                    Circles
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p
                                                                    className={
                                                                        styles.count
                                                                    }
                                                                >
                                                                    {
                                                                        item.total_users
                                                                    }
                                                                </p>
                                                                <span>
                                                                    Users
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                    <br />
                                    <div className={styles.chartContainer}>
                                        <Chart
                                            width={"100%"}
                                            height={"400px"}
                                            chartType="Bar"
                                            loader={<div>Loading Chart</div>}
                                            data={data}
                                            options={{
                                                chart: {
                                                    title: "Interest Group Counts"
                                                }
                                            }}
                                        />
                                    </div>
                                    <p className={styles.heading}>
                                        Organization Wise Counts
                                    </p>
                                    <div className={styles.tableContainer}>
                                        <TableTop
                                            onSearchText={handleOrgSearch}
                                            onPerPageNumber={
                                                handleOrgPerPageNumber
                                            }
                                        />
                                        <br />
                                        <Table
                                            rows={OrgWiseReport}
                                            page={orgCurrentPage}
                                            perPage={orgPerPage}
                                            columnOrder={orgColumnOrder}
                                            isloading={orgLoading}
                                        >
                                            <THead
                                                columnOrder={orgColumnOrder}
                                                // editableColumnNames={editableColumnNames}
                                                onIconClick={handleOrgIconClick}
                                            />
                                            <Pagination
                                                currentPage={orgCurrentPage}
                                                totalPages={orgTotalPages}
                                                margin="10px 0"
                                                handleNextClick={
                                                    handleOrgNextClick
                                                }
                                                handlePreviousClick={
                                                    handleOrgPreviousClick
                                                }
                                                onPerPageNumber={
                                                    handleOrgPerPageNumber
                                                }
                                                perPage={orgPerPage}
                                                setPerPage={setOrgPerPage}
                                            />
                                            {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                                        </Table>
                                    </div>
                                    <br />
                                    <p className={styles.heading}>
                                        User Wise Counts
                                    </p>
                                    <div className={styles.tableContainer}>
                                        <TableTop
                                            onSearchText={handleSearch}
                                            onPerPageNumber={
                                                handlePerPageNumber
                                            }
                                            CSV={KKEMRoutes.getLcReport}
                                        />
                                        <br />
                                        <Table
                                            rows={LcReport}
                                            page={currentPage}
                                            perPage={perPage}
                                            columnOrder={columnOrder}
                                            isloading={loading}
                                        >
                                            <THead
                                                columnOrder={columnOrder}
                                                // editableColumnNames={editableColumnNames}
                                                onIconClick={handleIconClick}
                                            />
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={totalPages}
                                                margin="10px 0"
                                                handleNextClick={
                                                    handleNextClick
                                                }
                                                handlePreviousClick={
                                                    handlePreviousClick
                                                }
                                                onPerPageNumber={
                                                    handlePerPageNumber
                                                }
                                                perPage={perPage}
                                                setPerPage={setPerPage}
                                            />
                                            {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                                        </Table>
                                    </div>
                                    <br />
                                </div>
                            ) : (
                                <div>
                                    <p className={styles.heading}>Hackathon</p>
                                    {HackathonDashboard.map(item => {
                                        return (
                                            <>
                                                <p
                                                    className={
                                                        styles.subheading
                                                    }
                                                >{`${item["Hackathon Name"]}:${item.Domains}`}</p>
                                                <div
                                                    className={
                                                        styles.countsContainer
                                                    }
                                                >
                                                    {item[
                                                        "Total Applicants"
                                                    ] && (
                                                        <div
                                                            className={
                                                                styles.studentsInvoled
                                                            }
                                                        >
                                                            <p
                                                                className={
                                                                    styles.label
                                                                }
                                                            >
                                                                Total Applicants
                                                            </p>
                                                            {handleHackDashInputs(
                                                                item[
                                                                    "Total Applicants"
                                                                ]
                                                            )}
                                                        </div>
                                                    )}
                                                    {item[
                                                        "Shortlisted Candidates"
                                                    ] && (
                                                        <div
                                                            className={
                                                                styles.studentsInvoled
                                                            }
                                                        >
                                                            <p
                                                                className={
                                                                    styles.label
                                                                }
                                                            >
                                                                Shortlisted
                                                                Candidates
                                                            </p>
                                                            {handleHackDashInputs(
                                                                item[
                                                                    "Shortlisted Candidates"
                                                                ]
                                                            )}
                                                        </div>
                                                    )}
                                                    {item[
                                                        "Shortlisted Team Count"
                                                    ] && (
                                                        <div
                                                            className={
                                                                styles.studentsInvoled
                                                            }
                                                        >
                                                            <p
                                                                className={
                                                                    styles.label
                                                                }
                                                            >
                                                                Shortlisted Team
                                                                Count
                                                            </p>
                                                            {handleHackDashInputs(
                                                                item[
                                                                    "Shortlisted Team Count"
                                                                ]
                                                            )}
                                                        </div>
                                                    )}
                                                    {item[
                                                        "Attended People"
                                                    ] && (
                                                        <div
                                                            className={
                                                                styles.studentsInvoled
                                                            }
                                                        >
                                                            <p
                                                                className={
                                                                    styles.label
                                                                }
                                                            >
                                                                Attended People
                                                            </p>
                                                            {handleHackDashInputs(
                                                                item[
                                                                    "Attended People"
                                                                ]
                                                            )}
                                                        </div>
                                                    )}
                                                    {item[
                                                        "Offerings Count"
                                                    ] && (
                                                        <div
                                                            className={
                                                                styles.studentsInvoled
                                                            }
                                                        >
                                                            <p
                                                                className={
                                                                    styles.label
                                                                }
                                                            >
                                                                Offerings Count
                                                            </p>
                                                            {handleHackDashInputs(
                                                                item[
                                                                    "Offerings Count"
                                                                ]
                                                            )}
                                                        </div>
                                                    )}
                                                    {item[
                                                        "Placement Count"
                                                    ] && (
                                                        <div
                                                            className={
                                                                styles.studentsInvoled
                                                            }
                                                        >
                                                            <p
                                                                className={
                                                                    styles.label
                                                                }
                                                            >
                                                                Placement Count
                                                            </p>
                                                            {handleHackDashInputs(
                                                                item[
                                                                    "Placement Count"
                                                                ]
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        );
                                    })}
                                    <p className={styles.heading}>
                                        Participant Data
                                    </p>
                                    <div className={styles.tableContainer}>
                                        <TableTop
                                            onSearchText={handleHackSearch}
                                            onPerPageNumber={
                                                handleHackPerPageNumber
                                            }
                                            CSV="https://docs.google.com/spreadsheets/d/1w2Ax918fkkumNiCJ42tc5T9fJeidVGL9_9B-2j7klDM/edit#gid=0"
                                        />
                                        <br />
                                        <Table
                                            rows={HackathonReport}
                                            page={currentHackPage}
                                            perPage={perHackPage}
                                            columnOrder={HackathonColumnOrder}
                                            isloading={hackLoading}
                                        >
                                            <THead
                                                columnOrder={
                                                    HackathonColumnOrder
                                                }
                                                onIconClick={
                                                    handlehackIconClick
                                                }
                                            />
                                            <Pagination
                                                currentPage={currentHackPage}
                                                totalPages={totalHackPages}
                                                margin="10px 0"
                                                handleNextClick={
                                                    handleHackNextClick
                                                }
                                                handlePreviousClick={
                                                    handleHackPreviousClick
                                                }
                                                onPerPageNumber={
                                                    handleHackPerPageNumber
                                                }
                                                perPage={perHackPage}
                                                setPerPage={setPerHackPage}
                                            />
                                        </Table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <KKEMAuthentication
                        dashboardPassword={dashboardPassword}
                        setDashboardPassword={setDashboardPassword}
                        loginTriggered={loginTriggered}
                        setLoginTriggered={setLoginTriggered}
                    />
                )
            ) : key ? (
                <div className={styles.dashboardContainer}>
                    {" "}
                    <p className={styles.heading}>
                        You are not authorized to view this page
                    </p>
                </div>
            ) : (
                <div className={styles.dashboardContainer}>
                    {" "}
                    <p className={styles.heading}>
                        Please enter the key to view this page
                    </p>
                </div>
            )}
        </>
    );
};

export default LearningCircles;
