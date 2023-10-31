import {
    ThreeDotssvg,
} from "../../assets/svg";
import styles from "./LcDashboard.module.css";
import { useEffect, useState } from "react";
import image from "../../assets/images/profileIcon.svg";
import { getLcDetails } from "../../services/LearningCircleAPIs";
import { useParams } from "react-router-dom";
import { covertNumToK } from "../../services/utils";
import toast from "react-hot-toast";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { comingSoon } from "../../../../utils/common";
import LcTeam from "./components/LcTeam";
import LcHome from "./components/LcHome";

type Props = {};

const LcDashboard = (props: Props) => {
    const [lc, setLc] = useState<LcDetail>();
    const [temp, setTemp] = useState<LcDashboardTempData>({
        loading: true,
        isReport: false,
        isHistory: false,
        isTeam: false,
		isSchedule: false
    });
    const { id } = useParams();

    const handleFetchDetails = async () => {
        try {
            await getLcDetails(setLc, id);
            setTemp(prev => ({
                ...prev,
                loading: false
            }));
        } catch (error) {
            toast.error("Something went wrong, failed to load data");
        }
    };

    const handleComingSoon = () => {
        comingSoon();
    };

    useEffect(() => {
        handleFetchDetails();
    }, []);

    return temp.loading ? (
        <MuLoader />
    ) : (
        <div className={styles.LCDashboardWrapper}>
            <div className={styles.TitleContainerWrapper}>
                <div className={styles.Title}>
                    <h1>{lc?.name}</h1>
                    <h3>{lc?.college}</h3> <h3>Code: {lc?.circle_code}</h3>
                </div>
                <div className={styles.RankSession}>
                    <div>
                        <h3>RANK</h3>
                        <h1>{lc?.rank}</h1>
                        <h3>{covertNumToK(Number(lc?.total_karma))} Karma</h3>
                    </div>
                    <button onClick={handleComingSoon}>
                        <ThreeDotssvg />
                    </button>
                </div>
            </div>
            <div className={styles.NavLink}>
                <button
                    className={styles.active}
                    onClick={() => {
                        setTemp({
                            ...temp,
                            isReport: false,
                            isHistory: false
                        });
                    }}
                >
                    Dashboard
                </button>
                <button onClick={handleComingSoon}>IG Progress</button>
                <button onClick={handleComingSoon}>BeWeb.dev</button>
            </div>
            {temp.isTeam ? (
                <LcTeam setTemp={setTemp} temp={temp}/>
            ) : (
                <LcHome setTemp={setTemp} temp={temp} lc={lc}/>
            )}
        </div>
    );
};

export default LcDashboard;

export const CheckBoxContainer = () => {
    return (
        <div className={styles.CheckBoxContainerWrapper}>
            <input
                type="checkbox"
                id="textInput"
                value="Text that gets selected"
            />
            <label htmlFor="textInput">1. Study IA</label>
        </div>
    );
};

export const Attendees = () => {
    return (
        <div className={styles.AttendeesWrapperIndividual}>
            <img src={image} alt="" />
            <p>Enric S Neelamkavil</p>
        </div>
    );
};
