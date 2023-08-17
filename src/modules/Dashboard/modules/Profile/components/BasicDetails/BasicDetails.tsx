import { useState } from "react";
import styles from "./BasicDetails.module.css";
import HeatmapComponent from "../Heatmap/HeatmapComponent";
type Props = {
    userProfile: any;
    userLog: any;
};
const BasicDetails = (props: Props) => {
    const [editIg, setEditIg] = useState(false);
    return (
        <>
            <div className={styles.interestGrp}>
                <div className={styles.top_sec}>
                    <b>Interest Groups</b>
                    {!editIg && (
                        <p
                            onClick={() => setEditIg(true)}
                            className={styles.edit_profile_btn}
                            tabIndex={0}
                        >
                            <i className="fi fi-rr-pencil"></i>
                        </p>
                    )}
                    {editIg && (
                        <p
                            onClick={() => setEditIg(false)}
                            className={styles.edit_profile_btn}
                            tabIndex={0}
                        >
                            <i className="fi fi-rr-circle-xmark"></i>
                        </p>
                    )}
                </div>
                <div className={styles.igs_container}>
                    {props.userProfile.interest_groups.length != 0 ? (
                        props.userProfile.interest_groups.map(
                            (data: any, i: number) => {
                                return (
                                    <div
                                        style={
                                            editIg
                                                ? {
                                                      transform: "scale(0.955)"
                                                  }
                                                : {}
                                        }
                                        className={styles.igs}
                                        key={i}
                                    >
                                        {editIg && (
                                            <i className="fi fi-sr-circle-xmark"></i>
                                        )}
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
                    {editIg && (
                        <div
                            style={
                                editIg
                                    ? {
                                          transform: "scale(0.955)"
                                      }
                                    : {}
                            }
                            className={styles.igs_add}
                        >
                            <i className="fi fi-sr-plus"></i>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.heatmap}>
                <HeatmapComponent
                    data={props.userLog}
                    year={props.userProfile.joined?.slice(0, 4)}
                />
            </div>
        </>
    );
};

export default BasicDetails;
