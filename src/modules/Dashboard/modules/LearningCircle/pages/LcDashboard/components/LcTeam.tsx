import { Dispatch, SetStateAction } from "react";
import styles from "../LcDashboard.module.css";
import level7 from "../../../assets/images/Level 7.svg";
import { BiDotsVertical } from "react-icons/bi";
import pic from "../../../assets/images/profileIcon.svg";
import LeadIcon from "../../../assets/images/Lead icon.svg";
import { PersonIcon } from "../../../assets/svg";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    temp: LcDashboardTempData;
    lc: LcDetail | undefined;
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
                <TeamList lc={props.lc} />
            </div>
        </div>
    );
};

type Prop = {
    lc: LcDetail | undefined;
};
const TeamList = (props:Prop) => {
    return (
        <div className={styles.TeamNavSectionWrapper}>
            <div className={styles.teamList}>
                {props.lc?.members &&
                    props.lc.members.map((member, index) => (
                        <TeamMember
                            member={member}
                            index={index + 1}
                            key={`mem${index}`}
                        />
                    ))}
            </div>
            {props.lc && props.lc.pending_members.length > 0 && (
                <>
                    <div className={styles.SubHeadingWrapper}>
                        <p>Pending Requests</p>
                        <a>
                            <PersonIcon /> <p>Add members</p>
                        </a>
                    </div>
                    <div className={styles.PendingRequestWrapper}>
                        {props.lc?.pending_members.map((member, index) => (
                            <PendingRequestMember
                                member={member}
                                index={index + 1}
                                key={`mem${index}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const TeamMember = ({
    member,
    index
}: {
    member: LcMembers;
    index: number;
}) => {
    return (
        <div className={styles.memberBar}>
            <span>{index}.</span>{" "}
            <img
                className={styles.MemberProfile}
                src={member.profile_pic || pic}
                alt="DP"
            />{" "}
            <span className={styles.name}>{member.username}</span>
            <p>Level{member.level || " 0"}</p>
            <img src={level7} alt="level" />
            {member.is_lead ? (
                <img src={LeadIcon} alt="" className={styles.karma} />
            ) : (
                ""
            )}
            <span className={member.is_lead ? "" : styles.karma}>
                {member.karma}μ
            </span>
            <BiDotsVertical />
        </div>
    );
};

const PendingRequestMember = ({
    member,
    index
}: {
    member: LcMembers;
    index: number;
}) => {
    return (
        <div className={styles.memberBar}>
            <div className={styles.LeftSection}>
                <span>{index}.</span>{" "}
                <img
                    className={styles.MemberProfile}
                    src={member.profile_pic}
                    alt="DP"
                />{" "}
                <span className={styles.name}>{member.username}</span>
                <p>Level{member.level || " 0"}</p>
                <img src={level7} alt="level" />
            </div>
            <div className={styles.ButtonWrapper}>
                <button style={{ backgroundColor: "#2DCE89" }}>Accept</button>
                <button style={{ backgroundColor: "#FF5F5F" }}>Reject</button>
            </div>
        </div>
    );
};
export default LcTeam;
