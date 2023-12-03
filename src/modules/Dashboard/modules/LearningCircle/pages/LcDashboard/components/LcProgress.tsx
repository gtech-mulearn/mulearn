import React, { useMemo, useState } from "react";
import styles from "../LcDashboard.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

export default function LcProgress() {
    const tempData = [
        {
            heading: "Task 1",
            description: "Introduction tasks - UI and UX",
            taskList: [
                {
                    completed: true,
                    heading: "Introduction to User Interface",
                    description: `In this task, you are required to prepare a problem statement based on research, user needs, and 
            business goals and design a solution that meets the needs
            #cl-findaproblem Hey, I have completed the task and here is the link to my file.`,
                    karma: 200,
                    link: ""
                },
                {
                    completed: false,
                    heading: "Introduction to User Experience",
                    description: `In this task, you are required to prepare a problem statement based on research, user needs, and 
                    business goals and design a solution that meets the needs
                    #cl-findaproblem Hey, I have completed the task and here is the link to my file.`,
                    karma: 200,
                    link: ""
                }
            ]
        },
        {
            heading: "Task 2",
            description: "Introduction tasks - Web Dev",
            taskList: [
                {
                    completed: true,
                    heading: "Introduction to User Interface",
                    description: `In this task, you are required to prepare a problem statement based on research, user needs, and 
            business goals and design a solution that meets the needs
            #cl-findaproblem Hey, I have completed the task and here is the link to my file.`,
                    karma: 200,
                    link: ""
                },
                {
                    completed: false,
                    heading: "Introduction to User Experience",
                    description: `In this task, you are required to prepare a problem statement based on research, user needs, and 
                    business goals and design a solution that meets the needs
                    #cl-findaproblem Hey, I have completed the task and here is the link to my file.`,
                    karma: 200,
                    link: ""
                }
            ]
        }
    ];

    return (
        <div className={styles.ContainerWrapper}>
            <div className={styles.ContentWrapper}>
                <ProgressBar heading="Progress" progress={60} />
                {tempData.map(temp => (
                    <TaskContainer {...temp} />
                ))}
            </div>
        </div>
    );
}

interface Task_T {
    completed: boolean;
    heading: string;
    description: string;
    karma: number;
    link: string;
}

function TaskContainer({
    heading,
    description,
    taskList
}: {
    heading: string;
    description: string;
    taskList: Task_T[];
}) {
    const [open, setOpen] = useState(false);
    const totalKarma = useMemo(
        () => taskList.reduce((acc, curr) => acc + curr.karma, 0),
        [taskList]
    );
    return (
        <div className={`${styles.taskContainer} ${open ? styles.open : ""}`}>
            <div className={styles.top}>
                <h2>{heading}</h2>
                <span>{description}</span>
                <div>
                    <h2 className={styles.totalKarma}>{totalKarma}μ</h2>
                    {open ? (
                        <IoIosArrowUp
                            size={24}
                            onClick={() => setOpen(!open)}
                        />
                    ) : (
                        <IoIosArrowDown
                            size={24}
                            onClick={() => setOpen(!open)}
                        />
                    )}
                </div>
            </div>

            {taskList.map((task, index) => (
                <div key={`task${index}`} className={styles.task}>
                    <input type="checkbox" checked={task.completed} />
                    <div className={` ${styles.content}`}>
                        <h3>{task.heading}</h3>
                        <p>{task.description}</p>
                    </div>
                    <div className={styles.KarmaButton}>
                        <h3>{task.karma}μ</h3>
                        <a href={task.link}>
                            <PowerfulButton>View Task</PowerfulButton>
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}

interface ProgressBar_T {
    heading: string;
    progress: number;
}

function ProgressBar({ heading, progress }: ProgressBar_T) {
    return (
        <div className={styles.progressContainer}>
            <div className={styles.heading}>
                <h1>{heading}</h1>
                <span>{progress}% Completed</span>
            </div>
            <div
                className={styles.progressBar}
                style={{
                    //@ts-ignore custom property error, change when you find a better solution
                    "--progress": 100 - progress
                }}
            ></div>
        </div>
    );
}
