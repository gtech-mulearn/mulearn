import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import styles from "./LearningCircleLanding.module.css";
import { useEffect, useState } from "react";
// import { customReactSelectStyles } from "../../utils/buttonConfiguration/common";
import { useNavigate } from "react-router-dom";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import {createLearningCircle, getMeetups, joinMeetup, scheduleMeetup } from "../../../LearningCircleV2/services/LearningCircleAPIs";
import { EventCard } from "./LearningCircleCard";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import LearningCircleCreateForm from "./LearningCircleCreateForm";
import LearningCircleLanding from "../../../LearningCircleV2/pages/landing/LearningCircleLanding";
import { CircleMeetupInfo } from "../../../LearningCircleV2/services/LearningCircleInterface";

interface Option {
    value: string;
    label: string;
}

const INITIAL_INTERESTS = [
    { label: "All Categories", value: "all" },
    { label: "Coder", value: "coder" },
    { label: "Hardware", value: "hardware" },
    { label: "Manager", value: "manager" },
    { label: "Creative", value: "creative" }
]

const LearningCircles = () => {
    const [isLoading, setisLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Option | null>(
        INITIAL_INTERESTS[0]
    );
    const [meetups, setMeetups] = useState<CircleMeetupInfo[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [meetCode, setMeetCode] = useState("");
    const [selectedMeetup, setSelectedMeetup] = useState<CircleMeetupInfo>();
    const navigate = useNavigate();
    useEffect(() => {
        setisLoading(true);
        getMeetups(selectedCategory?.value).then(res => {
            setMeetups(res);
            setisLoading(false);
        });
    }, [selectedCategory]);

    const handleUpdateLC = () => {
        setisLoading(true);
        getMeetups(selectedCategory?.value).then(res => {
            setMeetups(res);
            setisLoading(false);
        });
    };
    
    const handleModalOpen = (event: CircleMeetupInfo) => {
        setSelectedMeetup(event)
        setIsModalOpen(true)
    }

    const handleJoin = () => {
        joinMeetup(selectedMeetup?.id ?? "", meetCode).then(res => {
            setIsModalOpen(false);
        });
    };


    const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
        e && e.preventDefault();
        const data = e.currentTarget.value
        createLearningCircle(data).then(status => {
            // setIsLoading(false);
            if (status) {
                navigate("/dashboard/learningcircle/create-meetup/" + status);
            }
        });
        scheduleMeetup(data).then(status => {
            // setIsLoading(false);
            if (status) {
                // navigate(
                //     `/dashboard/learningcircle/dashboard/${params.circle_id}`
                // );
            }
        });
        setIsCreateModalOpen(false);
      };

    return (
        <>
            <MuModal
                type="success"
                onDone={() => {
                    handleJoin();
                }}
                onClose={() => {
                    setIsModalOpen(false);
                }}
                title="Enter Join Code"
                isOpen={isModalOpen}
            >
                {/* <span className={styles.joinInfo}>
                        Enter the 6 digit join code provided by the organizers to
                        join the meetup.
                    </span> */}
                <input
                    className={styles.joinCodeInput}
                    placeholder="Enter Join Code"
                    maxLength={6}
                    value={meetCode}
                    onChange={e => {
                        e.preventDefault();
                        setMeetCode(e.target.value.toLocaleUpperCase());
                    }}
                />
            </MuModal>
            <MuModal
                type="success"
                // onDone={handleSubmit}
                onClose={() => setIsCreateModalOpen(false)}
                title="Create Learning Circle"
                isOpen={isCreateModalOpen}
                showButton={false}
            >
                <LearningCircleCreateForm setIsCreateModalOpen={setIsCreateModalOpen} onSuccess={handleUpdateLC}/>
            </MuModal>
            {isLoading ? (
                <div className={styles.loader_container}>
                    <MuLoader />
                </div>
            ) : (
                <LearningCircleLanding />
            )}
        </>
        // <LearningCircleLanding />
    )
}

export default LearningCircles