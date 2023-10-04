import { useEffect, Suspense } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import styles from "./Settings.module.css";

const Settings = () => {
    const nav = useNavigate();

    useEffect(() => {
        nav("connected-devices");
        //temporary measure to access connected device
    }, []);
    return (
        <div className={styles.reset}>
            <Suspense fallback={<MuLoader />}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default Settings;
