import { Dispatch, SetStateAction, useState } from "react";
import styles from "../LcDashboard.module.css";
import { HiUserRemove } from "react-icons/hi";
import toast from "react-hot-toast";
import {
    removeMember,
    transferLead
} from "../../../services/LearningCircleAPIs";
import { useParams } from "react-router-dom";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import { BiTransferAlt } from "react-icons/bi";

type Props = {
    isLead: boolean;
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    member: LcMembers;
    close: () => void;
};

const LcOptions = (props: Props) => {
    const { id } = useParams();
    const [isModal, setIsModal] = useState(false);
    const [isTransfer, setIsTransfer] = useState(false);

    const handleRemoval = (memberId: string, isLead: boolean) => {
        if (!isLead) {
            toast.promise(removeMember(id, memberId), {
                loading: "Loading...",
                success: () => {
                    // Updating state for re-render
                    props.setTemp(prev => ({
                        ...prev,
                        reRender: !prev.reRender
                    }));
                    props.close();
                    return <b>Member removed</b>;
                },
                error: () => {
                    props.close();
                    return <b>Member not removed</b>;
                }
            });
        } else {
            props.close();
            toast.error("Cannot remove lead");
        }
    };

    const handleTranfer = (memberId: string, isLead: boolean) => {
        if (!isLead) {
            toast.promise(transferLead(id, memberId), {
                loading: "Loading...",
                success: () => {
                    // Updating state for re-render
                    props.setTemp(prev => ({
                        ...prev,
                        reRender: !prev.reRender
                    }));
                    props.close();
                    return <b>Lead transfer successful</b>;
                },
                error: () => {
                    props.close();
                    return <b>Lead transfer failed</b>;
                }
            });
        } else {
            props.close();
            toast.error("You already have lead role");
        }
    };
    return (
        <>
            <div className={styles.LcOptions}>
                <div
                    onClick={() => {
                        setIsModal(true);
                    }}
                >
                    Remove User
                    <HiUserRemove />
                </div>
                <div
                    onClick={() => {
                        setIsTransfer(true);
                    }}
                >
                    Transfer Leadership
                    <BiTransferAlt />
                </div>
            </div>
            <MuModal
                isOpen={isModal}
                onClose={() => setIsModal(false)}
                title={`Remove ${props.member.username}`}
                type={"error"}
                onDone={() => {
                    handleRemoval(props.member.id, props.member.is_lead);
                    setIsModal(false);
                }}
            >
                <p>Are you sure you want to remove {props.member.username}?</p>
            </MuModal>
            <MuModal
                isOpen={isTransfer}
                onClose={() => setIsTransfer(false)}
                title={`Transfer Ownership to ${props.member.username}`}
                type={"error"}
                onDone={() => {
                    handleTranfer(props.member.id, props.member.is_lead);
                    setIsTransfer(false);
                }}
            >
                <p>
                    Are you sure you want to transfer the ownership of learning
                    circle to {props.member.username}?
                </p>
            </MuModal>
        </>
    );
};

export default LcOptions;
