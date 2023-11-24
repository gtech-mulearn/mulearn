import image from "../../../assets/images/profileIcon.svg";
import styles from "../LcDashboard.module.css";

export const LcAttendees = () => {
    return (
        <div className={styles.AttendeesWrapperIndividual}>
            <img src={image} alt="" />
            <p>Enric S Neelamkavil</p>
        </div>
    );
};
