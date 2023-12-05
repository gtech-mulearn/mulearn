import React, { useEffect, useState } from 'react'
import styles from './DiscordModeration.module.css'
import SelectTab from "react-select";

import { customReactSelectStyles } from "../../utils/common";
import { getTaskList } from './services/apis';
import TableTop from '@/MuLearnComponents/TableTop/TableTop';
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import Pagination from '@/MuLearnComponents/Pagination/Pagination';
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

export const DiscordModeration = () => {
    const columnOrder: ColOrder[] = [
        { column: "fullname", Label: "Fullname", isSortable: false },
        { column: "task_name", Label: "Task name", isSortable: false },
        { column: "status", Label: "Status", isSortable: false },
        { column: "discordlink", Label: "Discord link", isSortable: false },
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

    const [selectedOption, setSelectedOption] = useState<Option | null>(options[0]);
    const [selectedTaskOption, setSelectedTaskOption] = useState<TaskOption | null>(taskOptions[0]);
    const [currentTab, setCurrentTab] = useState("leaderboard");
    const [taskData, setTaskData] = useState<taskData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(20);
    const handleChange = (selected: Option | null) => {
        setSelectedOption(selected);
    };

    const handleTaskChange = (selected: Option | null) => {
        setSelectedTaskOption(selected);
    };
    console.log("data=>", taskData[5]?.discordlink)
    useEffect(() => {
        getTaskList(setTaskData, setLoading)
    }, [])

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
                                    isDisabled
                                    placeholder={"Select Role"}
                                    options={options}
                                    styles={customReactSelectStyles}
                                    value={selectedOption}
                                    onChange={handleChange}
                                />
                                :
                                <SelectTab
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
            {currentTab === "tasks" &&
                <div className={styles.DiscordModerationRow}>
                    comming soon !!! hy
                </div>
            }
            {currentTab === "leaderboard" ?
                <div className={styles.DiscordModerationRow}>
                    comming soon !!!
                </div>
                :
                <div className={styles.DiscordModerationTable}>
                    <TableTop
                    />
                    <Table
                        rows={taskData}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columnOrder}
                        id={["id"]}
                        isloading={loading}
                    >
                        <THead
                            columnOrder={columnOrder}
                            onIconClick={handleIconClick}
                        />
                        {/* <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                margin="10px 0"
                                // handleNextClick={handleNextClick}
                                // handlePreviousClick={handlePreviousClick}
                                // onPerPageNumber={handlePerPageNumber}
                                perPage={perPage}
                                setPerPage={setPerPage}
                            /> */}
                        <Blank />
                    </Table>
                </div>
            }
        </>
    )
}
