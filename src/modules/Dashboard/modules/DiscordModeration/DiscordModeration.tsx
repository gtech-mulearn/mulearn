import React, { useEffect, useState } from "react";
import styles from "./DiscordModeration.module.css";
import SelectTab from "react-select";
import { customReactSelectStyles } from "../../utils/common";
import { getLeaderBoard, getTaskCount, getTaskList } from "./services/apis";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import { sort } from "d3";

interface Option {
    value: string;
    label: string;
}

interface TaskOption {
    value: string;
    label: string;
}

type taskData = {
    id: string | number | boolean;
    fullname: string;
    task_name: string;
    status: string;
    discordlink: string;
};

type leaderBoardData = {
    id: string | number | boolean;
    name: string;
    count: number;
    muid: string;
};

const DiscordModeration = () => {
    const taskColumnOrder: ColOrder[] = [
        { column: "full_name", Label: "Fullname", isSortable: true },
        { column: "task_name", Label: "Task name", isSortable: true },
        { column: "status", Label: "Status", isSortable: true },
        { column: "discordlink", Label: "Discord link", isSortable: true }
    ];
    const leaderBoardColumnOrder: ColOrder[] = [
        { column: "name", Label: "Name", isSortable: true },
        { column: "count", Label: "Task Count", isSortable: true },
        { column: "muid", Label: "Muid", isSortable: true }
    ];
    const options: Option[] = [
        { value: "appraiser", label: "Appraiser" },
        { value: "peer", label: "Peer" }
    ];

    const taskOptions: TaskOption[] = [
        { value: "all", label: "All" },
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" }
    ];

    const [selectedLeaderBoardOption, setSelectedLeaderBoardOption] =
        useState<Option | null>(options[0]);
    const [selectedTaskOption, setSelectedTaskOption] =
        useState<TaskOption | null>(taskOptions[0]);
    const [currentTab, setCurrentTab] = useState("leaderboard");
    const [taskData, setTaskData] = useState<taskData[]>([]);
    const [leaderBoardData, setLeaderBoardData] = useState<leaderBoardData[]>(
        []
    );
    const [currentPageTD, setCurrentPageTD] = useState(1);
    const [totalPagesTD, setTotalPagesTD] = useState(1);
    const [currentPageLD, setCurrentPageLD] = useState(1);
    const [totalPagesLD, setTotalPagesLD] = useState(1);
    const [loading, setLoading] = useState(false);
    const [countLoading, setCountLoading] = useState(false);
    const [perPageTD, setPerPageTD] = useState(20);
    const [perPageLD, setPerPageLD] = useState(20);
    const [sortTD, setSortTD] = useState("-created_at");
    const [sortLD, setSortLD] = useState("-created_at");
    const [peerTaskCount, setpeerTaskCount] = useState<number | null>();
    const [appraiserTaskCount, setappraiserTaskCount] = useState<
        number | null
    >();
    const [moderatorType, setModeratorType] = useState<String | null>(
        "appraiser"
    );

    const handleLeaderBoardChange = (selected: Option | null) => {
        setSelectedLeaderBoardOption(selected);
        if (selected) {
            setModeratorType(selected.value);
        }
    };

    const handleTaskChange = (selected: TaskOption | null) => {
        setSelectedTaskOption(selected);
    };

    //to get the leaderboard data when loading the page.
    useEffect(() => {
        getLeaderBoard(
            setLeaderBoardData,
            1,
            perPageLD,
            moderatorType,
            setTotalPagesLD,
            sortLD,
            setLoading
        );
        getLeaderBoard(
            setLeaderBoardData,
            currentPageLD,
            perPageLD,
            moderatorType,
            setTotalPagesLD,
            `${sortLD}`,
            setLoading
        );
    }, [moderatorType]); //to call the getleaderboard method when the moderatortype is changed.

    //to get the task list & task count when loading the page.
    useEffect(() => {
        getTaskList(
            setTaskData,
            1,
            perPageTD,
            setTotalPagesTD,
            sortTD,
            setLoading
        );
        getTaskList(
            setTaskData,
            currentPageTD,
            perPageTD,
            setTotalPagesTD,
            `${sortTD}`,
            setLoading
        );
        getTaskCount(setpeerTaskCount, setappraiserTaskCount, setCountLoading);
    }, []);

    // pagination handling for task datas
    const handleNextClickTD = () => {
        const nextPage = currentPageTD + 1;
        setCurrentPageTD(nextPage);
        getTaskList(setTaskData, nextPage, perPageTD, setTotalPagesTD);
    };

    const handlePreviousClickTD = () => {
        const prevPage = currentPageTD - 1;
        setCurrentPageTD(prevPage);
        getTaskList(setTaskData, 1, perPageTD, setTotalPagesTD);
    };

    const handlePerPageNumberTD = (selectedValueTD: number) => {
        setCurrentPageTD(1);
        setPerPageTD(selectedValueTD);
        getTaskList(setTaskData, 1, selectedValueTD, setTotalPagesTD, "");
    };

    // pagination handling for leaderboard datas
    const handleNextClickLD = () => {
        const nextPage = currentPageLD + 1;
        setCurrentPageLD(nextPage);
        getTaskList(setTaskData, nextPage, perPageLD, setTotalPagesLD);
    };

    const handlePreviousClickLD = () => {
        const prevPage = currentPageLD - 1;
        setCurrentPageLD(prevPage);
        getTaskList(setTaskData, 1, perPageLD, setTotalPagesLD);
    };

    const handlePerPageNumberLD = (selectedValueLD: number) => {
        setCurrentPageLD(1);
        setPerPageLD(selectedValueLD);
        getLeaderBoard(
            setLeaderBoardData,
            1,
            selectedValueLD,
            moderatorType,
            setTotalPagesLD,
            ""
        );
    };

    const handleIconClickTD = (column: string) => {
        if (sortTD === column) {
            setSortTD(`-${column}`);
            getTaskList(
                setTaskData,
                1,
                perPageTD,
                setTotalPagesTD,
                `-${column}`,
                setLoading
            );
        } else {
            setSortTD(column);
            getTaskList(
                setTaskData,
                1,
                perPageTD,
                setTotalPagesTD,
                column,
                setLoading
            );
        }
    };

    const handleIconClickLD = (column: string) => {
        // if (sort === column) {
        //     setSort(`-${column}`);
        //     getTaskList(
        //         setTaskData,
        //         1,
        //         perPageTD,
        //         setTotalPagesTD,
        //         `-${column}`,
        //         setLoading
        //     );
        // } else {
        //     setSort(column);
        //     getTaskList(
        //         setTaskData,
        //         1,
        //         perPageTD,
        //         setTotalPagesTD,
        //         column,
        //         setLoading
        //     );
        // }
    };

    return (
        <>
            <div className={styles.DiscordModerationWrapper}>
                <div className={styles.DiscordModerationContainer}>
                    <div className={styles.DiscordModerationRow}>
                        <button
                            className={styles.DiscordModerationSwitchTab}
                            style={{
                                background:
                                    currentTab === "leaderboard"
                                        ? "rgb(222, 230, 255)"
                                        : "#fff"
                            }}
                            onClick={() => {
                                setCurrentTab("leaderboard");
                            }}
                        >
                            Leaderboard
                        </button>
                        <button
                            className={styles.DiscordModerationSwitchTab}
                            style={{
                                background:
                                    currentTab != "leaderboard"
                                        ? "rgb(222, 230, 255)"
                                        : "#fff"
                            }}
                            onClick={() => {
                                setCurrentTab("tasks");
                            }}
                        >
                            Tasks
                        </button>
                        <div className={styles.DiscordModerationFrom}>
                            {currentTab === "leaderboard" ? (
                                <SelectTab
                                    placeholder={"Select Role"}
                                    options={options}
                                    styles={customReactSelectStyles}
                                    value={selectedLeaderBoardOption}
                                    onChange={handleLeaderBoardChange}
                                />
                            ) : (
                                <SelectTab
                                    isDisabled //currently disabled!!!
                                    placeholder={"Select criteria"}
                                    options={taskOptions}
                                    styles={customReactSelectStyles}
                                    value={selectedTaskOption}
                                    onChange={handleTaskChange}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {!countLoading && (
                <>
                    {currentTab === "tasks" && (
                        <div className={styles.DiscordModerationCountRow}>
                            <div className={styles.DiscordApprovalCount}>
                                <span className={styles.count}>
                                    {peerTaskCount}
                                </span>
                                <span className={styles.txt}>
                                    tasks pending for <br />
                                    <span className={styles.highlight}>
                                        peer-approval
                                    </span>
                                </span>
                            </div>
                            <div className={styles.DiscordApprovalCount}>
                                <span className={styles.count}>
                                    {appraiserTaskCount}
                                </span>
                                <span className={styles.txt}>
                                    tasks pending for <br />
                                    <span className={styles.highlight}>
                                        appraisal-approval
                                    </span>
                                </span>
                            </div>
                        </div>
                    )}
                </>
            )}
            {currentTab === "leaderboard" ? (
                <div className={styles.DiscordModerationTable}>
                    <TableTop />
                    <Table
                        rows={leaderBoardData}
                        page={currentPageLD}
                        perPage={perPageLD}
                        columnOrder={leaderBoardColumnOrder}
                        id={["id"]}
                        isloading={loading}
                    >
                        <THead
                            columnOrder={leaderBoardColumnOrder}
                            onIconClick={handleIconClickLD}
                        />
                        <Pagination
                            currentPage={currentPageLD}
                            totalPages={totalPagesLD}
                            margin="10px 0"
                            handleNextClick={handleNextClickLD}
                            handlePreviousClick={handlePreviousClickLD}
                            onPerPageNumber={handlePerPageNumberLD}
                            perPage={perPageLD}
                            setPerPage={setPerPageLD}
                        />
                        <Blank />
                    </Table>
                </div>
            ) : (
                <div className={styles.DiscordModerationTable}>
                    <TableTop />
                    <Table
                        rows={taskData}
                        page={currentPageTD}
                        perPage={perPageTD}
                        columnOrder={taskColumnOrder}
                        id={["id"]}
                        isloading={loading}
                    >
                        <THead
                            columnOrder={taskColumnOrder}
                            onIconClick={handleIconClickTD}
                        />
                        <Pagination
                            currentPage={currentPageTD}
                            totalPages={totalPagesTD}
                            margin="10px 0"
                            handleNextClick={handleNextClickTD}
                            handlePreviousClick={handlePreviousClickTD}
                            onPerPageNumber={handlePerPageNumberTD}
                            perPage={perPageTD}
                            setPerPage={setPerPageTD}
                        />
                        <Blank />
                    </Table>
                </div>
            )}
        </>
    );
};

export default DiscordModeration;
