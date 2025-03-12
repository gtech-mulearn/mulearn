import { ThreeDotssvg } from "../../assets/svg";
import styles from "./LcDashboard.module.css";
import { useEffect, useState } from "react";
import { getLcDetails } from "../../services/LearningCircleAPIs";
import { useParams } from "react-router-dom";
import { covertNumToK } from "../../services/utils";
import toast from "react-hot-toast";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { comingSoon } from "../../../../utils/common";
import LcTeam from "./components/LcTeam";
import LcHome from "./components/LcHome";
import LcProgress from "./components/LcProgress";

const LcDashboard = () => {
    const [lc, setLc] = useState<LcDetail>();
    const [temp, setTemp] = useState<LcDashboardTempData>({
        loading: true,
        isReport: false,
        isHistory: false,
        isTeam: false,
        isSchedule: false,
        reRender: false
    });
    const [tab, setTab] = useState<"Dashboard">("Dashboard");

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

    useEffect(() => {
        handleFetchDetails();
    }, [temp.isSchedule, temp.isTeam, temp.reRender]);

    return temp.loading ? (
        <MuLoader />
    ) : (
        <div className={styles.LCDashboardWrapper}>
            <div className={styles.TitleContainerWrapper}>
                <div className={styles.Title}>
                    <h1>{lc?.name}</h1>
                    <h3>{lc?.college}</h3> <h3>Code: {lc?.circle_code}</h3>
                    <h3>Interest Group: {lc?.ig_name}</h3>
                </div>
                <div className={styles.RankSession}>
                    <div>
                        <h3>RANK</h3>
                        <h1>{lc?.rank}</h1>
                        <h3>{covertNumToK(Number(lc?.total_karma))} Karma</h3>
                    </div>
                    <button onClick={comingSoon}>
                        <ThreeDotssvg />
                    </button>
                </div>
            </div>
            {/* <div className={styles.NavLink}>
                <button
                    className={`${tab === "Dashboard" && styles.active}`}
                    onClick={() => {
                        setTab("Dashboard");
                        setTemp({
                            ...temp,
                            isReport: false,
                            isHistory: false
                        });
                    }}
                >
                    Dashboard
                </button>
                <button
                    className={`${tab === "IG Progress" && styles.active}`}
                    onClick={() => setTab("IG Progress")}
                >
                    IG Progress
                </button>
                <button onClick={comingSoon}>BeWeb.dev</button>
            </div> */}
            {
                {
                    Dashboard: temp.isTeam ? (
                        <LcTeam setTemp={setTemp} temp={temp} lc={lc} />
                    ) : (
                        <LcHome setTemp={setTemp} temp={temp} lc={lc} id={id} />
                    )
                }[tab]
            }
        </div>
    );
};

export default LcDashboard;
