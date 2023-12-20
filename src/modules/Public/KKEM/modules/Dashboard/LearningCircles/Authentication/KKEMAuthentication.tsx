import React, { useState } from "react";
import styles from "./KKEMAuthentication.module.css";

const KKEMAuthentication = ({
    dashboardPassword,
    setDashboardPassword,
    loginTriggered,
    setLoginTriggered
}: {
    dashboardPassword: string;
    setDashboardPassword: React.Dispatch<React.SetStateAction<string>>;
    loginTriggered: boolean;
    setLoginTriggered: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const handlePasswordChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDashboardPassword(event.target.value);
        setLoginTriggered(false);
    };

    const handleLogin = () => {
        setLoginTriggered(true);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Dashboard Login</h1>
            <p className={styles.description}>
                Enter the password to access the dashboard
            </p>
            <input
                type="password"
                placeholder="Enter password"
                value={dashboardPassword}
                onChange={handlePasswordChange}
                className={styles.input}
            />
            <button onClick={handleLogin} className={styles.button}>
                Login
            </button>
        </div>
    );
};

export default KKEMAuthentication;
