import styles from "../pages/Profile.module.css";
import HeatmapComponent from "./Heatmap/HeatmapComponent";
type Props = {
    userProfile: any;
    userLog: any;
};
const BasicDetails = (props: Props) => {
    return (
        <>
            <div className={styles.interestGrp}>
                <b>Interest Groups</b>
                <div className={styles.igs_container}>
                    {props.userProfile.interest_groups.length != 0 ? (
                        props.userProfile.interest_groups.map(
                            (data: any, i: number) => {
                                return (
                                    <div className={styles.igs} key={i}>
                                        {data.name}
                                        <p>
                                            {data.karma > 1000
                                                ? (
                                                      data.karma / 1000
                                                  ).toPrecision(2) + "K"
                                                : data.karma}
                                        </p>
                                    </div>
                                );
                            }
                        )
                    ) : (
                        <p>No Interest Groups to show</p>
                    )}
                </div>
            </div>

            <div className={styles.heatmap}>
                <HeatmapComponent
                    data={props.userLog}
                    year={props.userProfile.joined.slice(0, 4)}
                />
            </div>
        </>
    );
};

export default BasicDetails;
