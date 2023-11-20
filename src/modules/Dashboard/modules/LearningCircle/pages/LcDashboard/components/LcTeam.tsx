import { Dispatch, SetStateAction } from "react";
import styles from "../LcDashboard.module.css";
import karmaIcon from "../../../assets/karma.svg";
import { BsThreeDotsVertical } from "react-icons/bs";
import level7 from "../../../assets/images/Level 7.svg";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    temp: LcDashboardTempData;
    members: LcMembers[];
};

const LcTeam = (props: Props) => {
    return (
        <div className={styles.ContainerWrapper}>
            <div className={styles.SwitchNav}>
                <button
                    className={styles.items}
                    onClick={() =>
                        props.setTemp({
                            ...props.temp,
                            isReport: false,
                            isHistory: false,
                            isTeam: false,
                            isSchedule: false
                        })
                    }
                >
                    Meet
                </button>
                <button
                    className={styles.items + " " + styles.active}
                    onClick={() =>
                        props.setTemp({
                            ...props.temp,
                            isTeam: true
                        })
                    }
                >
                    Team
                </button>
            </div>
            <div className={styles.ContentWrapper}>
                <div className={styles.TopContainer}>
                    {props.members.map((data, index) => (
                        <div className={styles.TeamContainer} key={index}>
                            <div className={styles.TeamContainerLeft}>
                                <div className={styles.TeamContainerItem}>
                                    <span className={styles.TeamMemberIndex}>
                                        {index}.
                                    </span>
                                </div>
                                <div className={styles.TeamContainerItem}>
                                    <img
                                        src={data?.profile_pic}
                                        alt=""
                                        className={styles.TeamMemberDp}
                                    />
                                </div>
                                <div className={styles.TeamContainerItem}>
                                    <span className={styles.TeamMemberName}>
                                        {data?.username}
                                    </span>
                                </div>
                                <div className={styles.TeamContainerItem}>
                                    <div
                                        className={styles.TeamContainerItemWrap}
                                    >
                                        <span
                                            className={styles.TeamMemberLevel}
                                        >
                                            Level {data?.level}
                                        </span>
                                        <img
                                            src={level7}
                                            alt=""
                                            className={styles.LevelBadge}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={styles.TeamContainerRight}>
                                <div className={styles.TeamContainerItem}>
                                    <div
                                        className={styles.TeamContainerItemSub}
                                    >
                                        <span
                                            className={styles.TeamMemberKarma}
                                        >
                                            {data?.karma}
                                        </span>
                                        <img
                                            src={karmaIcon}
                                            alt=""
                                            className={styles.TeamkarmaIcon}
                                        />
                                    </div>
                                    <span className={styles.TeamMemberTagLine}>
                                        earned from LC
                                    </span>
                                </div>
                                <div className={styles.TeamContainerItem}>
                                    <BsThreeDotsVertical
                                        className={styles.MoreIcon}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LcTeam;
