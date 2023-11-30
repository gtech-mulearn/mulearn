import { Dispatch, SetStateAction, useState } from "react";
import styles from "../LcDashboard.module.css";
import level7 from "../../../assets/images/Level 7.svg";
import { BiDotsVertical } from "react-icons/bi";
import pic from "../../../assets/images/profileIcon.svg";
import LeadIcon from "../../../assets/images/Lead icon.svg";
import { PersonIcon } from "../../../assets/svg";
import { PendingRequest } from "./LcPendingRequest";
import { removeMember } from "../../../services/LearningCircleAPIs";
import { useParams } from "react-router-dom";
import { HiUserRemove } from "react-icons/hi";
import toast from "react-hot-toast";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";

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
                <TeamList lc={props.lc} setTemp={props.setTemp} />
            </div>
        </div>
    );
};

type Prop = {
    lc: LcDetail | undefined;
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
};
const TeamList = (props: Prop) => {
    return (
        <div className={styles.TeamNavSectionWrapper}>
            <div className={styles.teamList}>
                {props.lc?.members &&
                    props.lc.members.map((member, index) => (
                        <TeamMember
                            member={member}
                            index={index + 1}
                            key={`mem${index}`}
                            lc={props.lc}
                            setTemp={props.setTemp}
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
                            <PendingRequest
                                member={member}
                                index={index + 1}
                                key={`mem${index}`}
                                setTemp={props.setTemp}
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
    index,
    lc,
    setTemp
}: {
    member: LcMembers;
    index: number;
    lc: LcDetail | undefined;
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
}) => {
    const { id } = useParams();
    const [isModal, setIsModal] = useState(false);

    const handleRemoval = (memberId: string, isLead: boolean) => {
        if (lc?.is_lead && !isLead) {
            toast.promise(removeMember(id, memberId), {
                loading: "Loading...",
                success: () => {
                    // Updating state for re-render
                    setTemp(prev => ({
                        ...prev,
                        isSchedule: !prev.isSchedule
                    }));
                    return <b>Member removed</b>;
                },
                error: () => {
                    return <b>Member not removed</b>;
                }
            });
        } else {
            toast.error("Cannot remove lead");
        }
    };
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
            {!member?.is_lead && (
                <HiUserRemove
                    onClick={() => {
                        setIsModal(true);
                    }}
                    style={{
                        cursor: "pointer",
                        color: "red"
                    }}
                />
            )}
            {isModal && (
                <MuModal
                    isOpen={isModal}
                    onClose={() => setIsModal(false)}
                    title={`Remove ${member.username}`}
                    type={"error"}
                    onDone={() => {
                        handleRemoval(member.id, member.is_lead);
                        setIsModal(false);
                    }}
                >
                    <p>Are you sure you want to remove {member.username}?</p>
                </MuModal>
            )}
        </div>
    );
};


export default LcTeam;