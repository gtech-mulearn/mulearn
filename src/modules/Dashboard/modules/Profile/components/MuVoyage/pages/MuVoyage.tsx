import { useEffect, useState } from "react";
import styles from "./MuVoyage.module.css";
import {
    Progress,
    CircularProgress,
    CircularProgressLabel
} from "@chakra-ui/react";

type Props = {
    userLevelData: {
        karma: number;
        name: string;
        tasks: {
            task_name: string;
            completed: boolean;
            hashtag: string;
            karma: number;
        }[];
    }[];
    userLevel: number;
};

const MuVoyage = (props: Props) => {
    const [userLevelData, setUserLevelData] = useState(props.userLevelData);
    const [userLevelTrack, setUserLevelTrack] = useState(
        userLevelData[props.userLevel - 1]
    );
    let userLevelTrackerPercentage = !userLevelTrack.tasks.every(
        e => e.completed
    )
        ? `${(
              (userLevelTrack.tasks.filter(e => e.completed).length /
                  userLevelTrack.tasks.length) *
              100
          ).toFixed(0)}`
        : "100";
    // console.log(userLevelTrack);
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
                                <p>
                                    {userLevelTrack.tasks
                                        .filter(e => e.completed)
                                        .reduce((a, b) => a + b.karma, 0)}
                                    /
                                    {userLevelTrack.tasks.reduce(
                                        (a, b) => a + b.karma,
                                        0
                                    )}{" "}
                                    Karma
                                </p>
                            </div>
                            <Progress
                                value={parseInt(userLevelTrackerPercentage)}
                                size="xs"
                                colorScheme="green"
                                borderRadius="10px"
                            />
                        </div>

                        <div className={styles.date}>
                            {/* <p>Start: Nov 12</p> */}
                            {/* <p>End: Dec 12</p> */}
                        </div>
                    </div>

                    <ul className={styles.accordion}>
                        {userLevelData
                            .filter(e => e.tasks.length !== 0)
                            .map((levelData, i) => {
                                return (
                                    <li className={styles.main_list} key={i}>
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
                                            <p>
                                                {levelData.name}
                                                {"  "}
                                                <span
                                                    className={
                                                        styles.level_karma_detail
                                                    }
                                                >
                                                    [
                                                    {levelData.tasks
                                                        .filter(
                                                            e => e.completed
                                                        )
                                                        .reduce(
                                                            (a, b) =>
                                                                a + b.karma,
                                                            0
                                                        )}
                                                    /
                                                    <span
                                                        style={{
                                                            color: "#2E85FE"
                                                        }}
                                                    >
                                                        {levelData.karma}]
                                                    </span>
                                                </span>
                                            </p>
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
                                            <div
                                                className={
                                                    styles.goal_container
                                                }
                                            >
                                                <p>
                                                    Mine Left:{" "}
                                                    {Math.max(
                                                        levelData.karma -
                                                            levelData.tasks
                                                                .filter(
                                                                    e =>
                                                                        e.completed
                                                                )
                                                                .reduce(
                                                                    (a, b) =>
                                                                        a +
                                                                        b.karma,
                                                                    0
                                                                ),
                                                        0
                                                    )}{" "}
                                                    Karma
                                                </p>
                                                <p className={styles.goal}>
                                                    <i className="fi fi-sr-bullseye-arrow"></i>{" "}
                                                    Goal: {levelData.karma}{" "}
                                                    Karma
                                                </p>
                                            </div>
                                            <ul className={styles.list_list}>
                                                {levelData.tasks &&
                                                    levelData.tasks.map(
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
                                                                        <span>
                                                                            {
                                                                                taskData.hashtag
                                                                            }
                                                                        </span>
                                                                        <p>
                                                                            {taskData.karma +
                                                                                " ϰ"}
                                                                        </p>
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
