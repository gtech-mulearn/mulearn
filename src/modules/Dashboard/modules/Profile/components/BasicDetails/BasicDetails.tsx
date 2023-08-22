import { useEffect, useState } from "react";
import styles from "./BasicDetails.module.css";
import HeatmapComponent from "../Heatmap/HeatmapComponent";
import { useToast } from "@chakra-ui/react";
import { editIgDetails, getAllIg, getIgDetails } from "./services/api";
type Props = {
    userProfile: any;
    userLog: any;
};
const BasicDetails = (props: Props) => {
    const toast = useToast();
    const [editIg, setEditIg] = useState(false);
    const [allIg, setAllIg] = useState<any>([]);
    const [ig, setIg] = useState<any>([]);
    // console.log( );

    useEffect(() => {
        getIgDetails(toast, setIg);
        getAllIg(setAllIg);
    }, []);
    // console.log(allIg);
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
                        ig.map((data: any, i: number) => {
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
                                        <i
                                            onClick={() => {
                                                setIg(
                                                    ig.filter(
                                                        (ig: any) =>
                                                            ig.name != data.name
                                                    )
                                                );
                                                editIgDetails(
                                                    toast,
                                                    ig
                                                        .filter(
                                                            (ig: any) =>
                                                                ig.name !=
                                                                data.name
                                                        )
                                                        .map((ig: any) => {
                                                            return ig.id;
                                                        })
                                                );
                                            }}
                                            className="fi fi-sr-circle-xmark"
                                        ></i>
                                    )}
                                    {data.name}
                                    <p>
                                        {data.karma === null
                                            ? data.karma > 1000
                                                ? (
                                                      data.karma / 1000
                                                  ).toPrecision(2) + "K"
                                                : data.karma
                                            : "0"}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <p>No Interest Groups to show</p>
                    )}
                    {editIg && <hr />}
                </div>
                {editIg && (
                    <div className={styles.igs_container}>
                        {allIg
                            .filter((data: any) => {
                                return !ig.some(
                                    (ig: any) => ig.name == data.name
                                );
                            })
                            .map((data: any, i: number) => {
                                return (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setIg((prevIg: any) => {
                                                const updatedIg = [
                                                    ...prevIg,
                                                    data
                                                ];
                                                editIgDetails(
                                                    toast,
                                                    updatedIg.map(
                                                        (ig: any) => ig.id
                                                    )
                                                );
                                                return updatedIg;
                                            });
                                        }}
                                        className={styles.igs}
                                    >
                                        <i className="fi fi-sr-add"></i>
                                        {data.name}
                                    </div>
                                );
                            })}
                    </div>
                )}
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
