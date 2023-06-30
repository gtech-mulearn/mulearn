import { useEffect, useState } from "react";
import styles from "./MuVoyage.module.css";
import { getUserLevels } from "../services/api";
import {
    Progress,
    CircularProgress,
    CircularProgressLabel
} from "@chakra-ui/react";

const MuVoyage = () => {
    const [userLevelData, setUserLevelData] = useState([
        { name: "", tasks: [{ task_name: "", completed: false, hashtag: "" }] }
    ]);
    const [userLevelTrack, setUserLevelTrack] = useState({
        name: "",
        tasks: [{ task_name: "", completed: false, hashtag: "" }]
    });
    let userLevelTrackerPercentage = !userLevelTrack.tasks.every(
        e => e.completed
    )
        ? `${
              (userLevelTrack.tasks.filter(e => e.completed).length /
                  userLevelTrack.tasks.length) *
              100
          }`
        : "100";
    useEffect(() => {
        getUserLevels(setUserLevelData);
    }, []);
    useEffect(() => {
        setUserLevelTrack(userLevelData[0]);
    });
    return (
        <>
            <div className={styles.main_task}>
                <div className={styles.tasks}>
                    <div className={styles.topSection}>
                        <div className={styles.title}>
                            <span></span>
                            <div className={styles.title_desc}>
                                <p>{userLevelTrack.name}</p>
                                {/* <p>Level2 - Task 1</p> */}
                            </div>
                        </div>

                        <div className={styles.progressbar}>
                            <div className={styles.progress_title}>
                                <p>
                                    {userLevelTrackerPercentage + "%"} complete
                                </p>
                                {/* <p>2 days left</p> */}
                            </div>
                            {/* <div className={styles.progress}></div> */}
                            <Progress
                                value={parseInt(userLevelTrackerPercentage)}
                                size="xs"
                                colorScheme="green"
                            />
                        </div>

                        <div className={styles.date}>
                            {/* <p>Start: Nov 12</p> */}
                            {/* <p>End: Dec 12</p> */}
                        </div>
                    </div>

                    <ul className={styles.accordion}>
                        {userLevelData &&
                            userLevelData.map((levelData, i) => {
                                return (
                                    <li
                                        onClick={() => {
                                            setUserLevelTrack(levelData);
                                        }}
                                        className={styles.main_list}
                                        key={i}
                                    >
                                        <input
                                            className={styles.expandBtn}
                                            type="checkbox"
                                            name="accordion"
                                            id={`accordion_${i}`}
                                        />
                                        <label
                                            htmlFor={`accordion_${i}`}
                                            className={styles.level}
                                        >
                                            <p>{levelData.name}</p>
                                            <div
                                                className={styles.task_details}
                                            >
                                                <CircularProgress
                                                    value={
                                                        !levelData.tasks.every(
                                                            e => e.completed
                                                        )
                                                            ? (levelData.tasks.filter(
                                                                  e =>
                                                                      e.completed
                                                              ).length /
                                                                  levelData
                                                                      .tasks
                                                                      .length) *
                                                              100
                                                            : 100
                                                    }
                                                    color="green.400"
                                                    thickness="12px"
                                                    size="15px"
                                                    capIsRound={true}
                                                    // trackColor="red.100"
                                                >
                                                    {levelData.tasks.every(
                                                        e => e.completed
                                                    ) ? (
                                                        <CircularProgressLabel>
                                                            <i
                                                                className={`fi fi-ss-check-circle ${styles.tick}`}
                                                            ></i>
                                                        </CircularProgressLabel>
                                                    ) : null}
                                                </CircularProgress>
                                                <p>
                                                    {levelData.tasks.length}{" "}
                                                    Tasks
                                                </p>
                                                <i
                                                    className={`fi fi-br-angle-down ${styles.icon_down_arrow}`}
                                                ></i>
                                            </div>
                                        </label>
                                        <div className={styles.content}>
                                            <ul className={styles.list_list}>
                                                {levelData.tasks.map(
                                                    (taskData, j) => {
                                                        return (
                                                            <li key={j}>
                                                                <input
                                                                    type="checkbox"
                                                                    name="accordion"
                                                                    id={`task_${i}_${j}`}
                                                                    className={
                                                                        styles.checkbox
                                                                    }
                                                                    checked={
                                                                        taskData.completed
                                                                    }
                                                                    readOnly
                                                                />
                                                                <label
                                                                    htmlFor={`task_${i}_${j}`}
                                                                    className={
                                                                        styles.first1
                                                                    }
                                                                >
                                                                    {
                                                                        taskData.task_name
                                                                    }
                                                                </label>
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default MuVoyage;
