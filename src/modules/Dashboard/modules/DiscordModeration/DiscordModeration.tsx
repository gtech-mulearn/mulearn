import React, { useEffect, useState } from 'react'
import styles from './DiscordModeration.module.css'
import SelectTab from "react-select";
import { customReactSelectStyles } from "../../utils/common";
import { getLeaderBoard, getTaskCount, getTaskList } from './services/apis';
import TableTop from '@/MuLearnComponents/TableTop/TableTop';
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import { Blank } from '@/MuLearnComponents/Table/Blank';

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
    discordlink: string
};

type leaderBoardData = {
    id: string | number | boolean;
    name: string;
    count: number;
    muid: string;
};


const DiscordModeration = () => {
    const taskColumnOrder: ColOrder[] = [
        { column: "fullname", Label: "Fullname", isSortable: false },
        { column: "task_name", Label: "Task name", isSortable: false },
        { column: "status", Label: "Status", isSortable: false },
        { column: "discordlink", Label: "Discord link", isSortable: false },
    ];
    const leaderBoardColumnOrder: ColOrder[] = [
        { column: "name", Label: "Name", isSortable: false },
        { column: "count", Label: "Task Count", isSortable: false },
        { column: "muid", Label: "Muid", isSortable: false },
    ];
    const options: Option[] = [
        { value: "appraiser", label: "Appraiser" },
        { value: "peer", label: "Peer" },
    ];

    const taskOptions: TaskOption[] = [
        { value: "all", label: "All" },
        { value: "pending", label: "Pending" },
        { value: "approved", label: "Approved" },
    ]

    const [selectedLeaderBoardOption, setSelectedLeaderBoardOption] = useState<Option | null>(options[0]);
    const [selectedTaskOption, setSelectedTaskOption] = useState<TaskOption | null>(taskOptions[0]);
    const [currentTab, setCurrentTab] = useState("leaderboard");
    const [taskData, setTaskData] = useState<taskData[]>([]);
    const [leaderBoardData, setLeaderBoardData] = useState<leaderBoardData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [countLoading, setCountLoading] = useState(false);
    const [perPage, setPerPage] = useState(20);
    const [peerTaskCount, setpeerTaskCount] = useState<number | null>();
    const [appraiserTaskCount, setappraiserTaskCount] = useState<number | null>();
    const [moderatorType, setModeratorType] = useState<String | null>("appraiser");

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
        getLeaderBoard(setLeaderBoardData, setLoading, moderatorType);
    }, [moderatorType]);//to call the getleaderboard method when the moderatortype is changed.

    //to get the task list & task count when loading the page.
    useEffect(() => {
        getTaskList(setTaskData, setLoading);
        getTaskCount(setpeerTaskCount, setappraiserTaskCount, setCountLoading);
    }, []);


    const handleIconClick = (column: string) => {

    }

    return (
        <>
            <div className={styles.DiscordModerationWrapper}>
                <div className={styles.DiscordModerationContainer}>
                    <div className={styles.DiscordModerationRow}>
                        <button className={styles.DiscordModerationSwitchTab} style={{
                            background: currentTab === "leaderboard" ? "rgb(222, 230, 255)" : "#fff"
                        }} onClick={() => {
                            setCurrentTab("leaderboard")
                        }}>Leaderboard</button>
                        <button className={styles.DiscordModerationSwitchTab} style={{
                            background: currentTab != "leaderboard" ? "rgb(222, 230, 255)" : "#fff"
                        }} onClick={() => {
                            setCurrentTab("tasks")
                        }}>Tasks</button>
                        <div className={styles.DiscordModerationFrom}>
                            {currentTab === "leaderboard" ?
                                <SelectTab
                                    placeholder={"Select Role"}
                                    options={options}
                                    styles={customReactSelectStyles}
                                    value={selectedLeaderBoardOption}
                                    onChange={handleLeaderBoardChange}
                                />
                                :
                                <SelectTab
                                    isDisabled //currently disabled!!!
                                    placeholder={"Select criteria"}
                                    options={taskOptions}
                                    styles={customReactSelectStyles}
                                    value={selectedTaskOption}
                                    onChange={handleTaskChange}
                                />
                            }
                        </div>
                    </div>

                </div>
            </div>
            {!countLoading && <>
                {currentTab === "tasks" &&
                    <div className={styles.DiscordModerationCountRow}>
                        <div className={styles.DiscordApprovalCount}>
                            <span className={styles.count}>{peerTaskCount}</span>
                            <span className={styles.txt}>tasks pending for <br /><span className={styles.highlight}>peer-approval</span></span>
                        </div>
                        <div className={styles.DiscordApprovalCount}>
                            <span className={styles.count}>{appraiserTaskCount}</span>
                            <span className={styles.txt}>tasks pending for <br /><span className={styles.highlight}>appraisal-approval</span></span>
                        </div>
                    </div>
                }
            </>}
            {currentTab === "leaderboard" ?
                <div className={styles.DiscordModerationTable}>
                    <TableTop
                    />
                    <Table
                        rows={leaderBoardData}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={leaderBoardColumnOrder}
                        id={["id"]}
                        isloading={loading}
                    >
                        <THead
                            columnOrder={leaderBoardColumnOrder}
                            onIconClick={handleIconClick}
                        />
                        <Blank />
                    </Table>
                </div>
                :
                <div className={styles.DiscordModerationTable}>
                    <TableTop
                    />
                    <Table
                        rows={taskData}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={taskColumnOrder}
                        id={["id"]}
                        isloading={loading}
                    >
                        <THead
                            columnOrder={taskColumnOrder}
                            onIconClick={handleIconClick}
                        />
                        <Blank />
                    </Table>
                </div>
            }
        </>
    )
}


export default DiscordModeration;