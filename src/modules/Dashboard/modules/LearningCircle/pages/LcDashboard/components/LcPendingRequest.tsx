import { useParams } from "react-router-dom";
import { approveLcUser } from "../../../services/LearningCircleAPIs";
import styles from "../LcDashboard.module.css";
import pic from "../../../assets/images/profileIcon.svg";
import level7 from "../../../assets/images/Level 7.svg";
import { SetStateAction, useState } from "react";
import toast from "react-hot-toast";

type Props = {
    member: LcMembers;
    index: number;
    setTemp: React.Dispatch<SetStateAction<LcDashboardTempData>>;
};

export const PendingRequest = (props: Props) => {
    const { id } = useParams();

    const handleApproval = () => {
        toast.promise(approveLcUser(id, props.member.id, 1), {
            loading: "Loading...",
            success: () => {
                // Updating state for re-render
                props.setTemp(prev => ({
                    ...prev,
                    isSchedule: !prev.isSchedule
                }));
                return <b>Request accepted.</b>;
            },
            error: () => {
                return <b>Something went wrong, try again.</b>;
            }
        });
    };
    const handleReject = () => {
        toast.promise(approveLcUser(id, props.member.id, 0), {
            loading: "Loading...",
            success: () => {
                // Updating state for re-render
                props.setTemp(prev => ({
                    ...prev,
                    isSchedule: !prev.isSchedule
                }));
                return <b>Request rejected.</b>;
            },
            error: () => {
                return <b>Something went wrong, try again.</b>;
            }
        });
    };
    return (
        <div className={styles.memberBar}>
            <div className={styles.LeftSection}>
                <span>{props.index}.</span>{" "}
                <img
                    className={styles.MemberProfile}
                    src={props.member.profile_pic || pic}
                    alt="DP"
                />{" "}
                <span className={styles.name}>{props.member.username}</span>
                <p>Level{props.member.level || " 0"}</p>
                <img src={level7} alt="level" />
            </div>
            <div className={styles.ButtonWrapper}>
                <button
                    style={{ backgroundColor: "#2DCE89" }}
                    onClick={handleApproval}
                >
                    Accept
                </button>
                <button
                    style={{ backgroundColor: "#FF5F5F" }}
                    onClick={handleReject}
                >
                    Reject
                </button>
            </div>
        </div>
    );
};
