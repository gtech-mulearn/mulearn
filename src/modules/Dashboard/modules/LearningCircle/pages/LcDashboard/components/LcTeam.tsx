import { Dispatch, SetStateAction, useRef, useState } from "react";
import styles from "../LcDashboard.module.css";
import pic from "../../../assets/images/dpm.webp";
import LeadIcon from "../../../assets/images/Lead icon.svg";
import { PersonIcon } from "../../../assets/svg";
import { PendingRequest } from "./LcPendingRequest";
import { userLevelBadge } from "../../../../../utils/utils";
import LcOptions from "./LcOptions";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useOutsideClick } from "../../../../../hooks/useOutsideClick";
import { BiDotsVertical } from "react-icons/bi";

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

export default LcTeam;

type Prop = {
    lc: LcDetail | undefined;
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
};
const TeamList = (props: Prop) => {
    const [isOptionOpen, setIsOptionOpen] = useState<number | null>(null);

    const toggleOption = (index: number) => {
        setIsOptionOpen(prevIndex => (prevIndex === index ? null : index));
    };
    return (
        <div className={styles.TeamNavSectionWrapper}>
            <div className={styles.teamList}>
                {props.lc?.members &&
                    props.lc.members.map((member, index) => (
                        <TeamMember
                            member={member}
                            index={index}
                            key={`mem${index}`}
                            lc={props.lc}
                            setTemp={props.setTemp}
                            isOptionOpen={isOptionOpen === index}
                            toggleOption={() => toggleOption(index)}
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
    setTemp,
    isOptionOpen,
    toggleOption
}: {
    member: LcMembers;
    index: number;
    lc: LcDetail | undefined;
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    isOptionOpen: boolean;
    toggleOption: () => void;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideClick(ref, () => {
        if (isOptionOpen) toggleOption();
    });

    return (
        <div ref={ref} className={styles.memberBar}>
            <span>{index + 1}.</span>
            <img
                className={styles.MemberProfile}
                src={member.profile_pic || pic}
                alt="DP"
            />{" "}
            <span className={styles.name}>{member.username}</span>
            <p>Level {member.level || 0}</p>
            <img
                src={userLevelBadge(member.level)}
                alt="level"
                width={"25px"}
            />
            {member.is_lead ? (
                <img src={LeadIcon} alt="" className={styles.karma} />
            ) : (
                ""
            )}
            <span className={member.is_lead ? "" : styles.karma}>
                {member.karma}μ
            </span>
            {lc?.is_lead ? (
                isOptionOpen ? (
                    <IoCloseCircleOutline onClick={toggleOption} />
                ) : (
                    <BiDotsVertical onClick={toggleOption} />
                )
            ) : (
                ""
            )}
            {isOptionOpen && (
                <LcOptions
                    isLead={member.is_lead}
                    setTemp={setTemp}
                    member={member}
                    close={toggleOption}
                />
            )}
        </div>
    );
};
