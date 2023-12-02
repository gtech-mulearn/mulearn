import { Dispatch, SetStateAction, useState } from "react";
import styles from "../LcDashboard.module.css";
import { HiUserRemove } from "react-icons/hi";
import toast from "react-hot-toast";
import { removeMember } from "../../../services/LearningCircleAPIs";
import { useParams } from "react-router-dom";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import { BiTransferAlt } from "react-icons/bi";

type Props = {
    isLead: boolean;
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    member: LcMembers;
};

const LcOptions = (props: Props) => {
	const { id } = useParams();
    const [isModal, setIsModal] = useState(false);

	const handleRemoval = (memberId: string, isLead: boolean) => {
        if (!props.isLead) {
            toast.promise(removeMember(id, memberId), {
                loading: "Loading...",
                success: () => {
                    // Updating state for re-render
                    props.setTemp(prev => ({
                        ...prev,
                        reRender: !prev.reRender
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
                <div>
                    Transfer Leadership
                    <BiTransferAlt />
                </div>
            </div>
            {isModal && (
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
                    <p>
                        Are you sure you want to remove {props.member.username}?
                    </p>
                </MuModal>
            )}
        </>
    );
};

export default LcOptions;
