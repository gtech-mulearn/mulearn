import image from "../../../assets/images/profileIcon.svg";
import styles from "../LcDashboard.module.css";

type Props = {
    name: string;
    image: string;
    isSelected: boolean;
};

export const LcAttendees = (props: Props) => {
    return (
        <div
            className={
                props.isSelected
                    ? styles.AttendeesWrapperSelected
                    : styles.AttendeesWrapperIndividual
            }
        >
            <img src={props.image || image} alt="" />
            <p>{props.name}</p>
        </div>
    );
};
