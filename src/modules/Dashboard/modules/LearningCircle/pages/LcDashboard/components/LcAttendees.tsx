import styles from "./LcAttendees.module.css";
import { cdnUrl } from "@/modules/utils/cdn";

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
            <img src={props.image || cdnUrl("src/modules/Dashboard/modules/LearningCircle/assets/images/profileIcon.svg")} alt="Profile Icon" />
            <p>{props.name}</p>
        </div>
    );
};
