import { useEffect, useState } from "react";
import styles from "./IgSelector.module.css";
import toast from "react-hot-toast";
import { editIgDetails, getAllIg } from "../../../Profile/components/BasicDetails/services/api";

  type Props = {
    userProfile: IGUserInfo;
    igs: InterestGroup[]
    userLog: any;
    isProfilePage: Boolean
    selectedIg: InterestGroup, 
    setSelectedIg: React.Dispatch<React.SetStateAction<InterestGroup>>
};
  

const IGSelector = (props: Props) => {
    const [editIg, setEditIg] = useState(false);
    const [allIg, setAllIg] = useState<InterestGroup[]>([]);
    const [ig, setIg] = useState<InterestGroup[]>(props.userProfile.interest_groups);

    
    useEffect(() => {
        setIg(props.igs)
        props.setSelectedIg(props.igs[0]);
        console.log(props.selectedIg,'hi')

    }, [props.igs]);

    useEffect(() => {
        getAllIg(setAllIg);
    }, []);
    
    const ig_sorted = ig.sort((a: any, b: any) => {
        return a.name > b.name ? 1 : -1;
    });

    return (
        <>
            <div className={styles.interestGrp}>
                <div className={styles.top_sec}>
                    <b>Your Interest Groups</b>
                    <div className={styles.close_and_submit_btn_div}>
                        {
                            (Number(props.userProfile.level.slice(3, 4)) >= 4 ||
                                props.userProfile.roles.includes("Mentor")) &&
                            !editIg && (
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
                                onClick={() => {
                                    setEditIg(false);
                                    setIg(props.userProfile.interest_groups);
                                }}
                                className={styles.edit_profile_btn}
                                tabIndex={0}
                            >
                                <i className="fi fi-rr-circle-xmark"></i>
                            </p>
                        )}
                        {editIg && (
                            <p
                                onClick={() => {
                                    setEditIg(false);
                                    editIgDetails(
                                        ig_sorted.map((ig: any) => {
                                            return ig.id;
                                        })
                                    );
                                }}
                                className={styles.edit_profile_btn}
                                tabIndex={0}
                            >
                                <i className="fi fi-br-check"></i>
                            </p>
                        )}
                    </div>
                </div>
                <div className={styles.igs_container}>
                    {props.userProfile.interest_groups.length !== 0 ? (
                        ig.map((data: any, i: number) => {
                            return (
                                <div
                                style={Object.assign(
                                  {},
                                  editIg ? { transform: "scale(0.955)" } : {},
                                  props.selectedIg.id === data.id ? { backgroundColor: "#456ff6", color: "white" } : {}
                                )}
                                className={styles.igs}
                                key={i}
                                onClick={() => props.setSelectedIg(data)}
                              >
                              
                                    {editIg && (
                                        <i
                                            onClick={() => {
                                                if (ig.length > 1) {
                                                    setIg(
                                                        ig.filter(
                                                            (ig: any) =>
                                                                ig.name !==
                                                                data.name
                                                        )
                                                    );
                                                } else {
                                                    toast.error(
                                                        "You must have at least one interest group"
                                                    );
                                                }
                                            }}
                                            className="fi fi-sr-circle-xmark"
                                        ></i>
                                    )}
                                    {data.name}
                                    <p>
                                        {data.karma !== null
                                            ? data.karma > 1000
                                                ? (
                                                    data.karma / 1000
                                                ).toPrecision(2) + "K"
                                                : data.karma
                                                    ? data.karma
                                                    : "0"
                                            : "0"}
                                    </p>
                                </div>
                            );
                        })
                    ) : (
                        <p>
                            No Interest Groups to Selected, You need you reach
                            Level 4 to Select
                        </p>
                    )}
                    {editIg && <hr />}
                </div>
                {editIg && (
                    <div className={styles.igs_container}>
                        {allIg
                            .filter((data: any) => {
                                return !ig.some(
                                    (ig: any) => ig.name === data.name
                                );
                            })
                            .map((data: any, i: number) => {
                                return (
                                    <div key={i} className={styles.igs}>
                                        <i
                                            onClick={() => {
                                                {
                                                    ig.length < 3 &&
                                                        setIg(
                                                            (
                                                                prevState: any
                                                            ) => [
                                                                    ...prevState,
                                                                    data
                                                                ]
                                                        );
                                                }
                                                // editIgDetails(
                                                //     toast,
                                                //     [...ig, data].map(
                                                //         (ig: any) => {
                                                //             return ig.id;
                                                //         }
                                                //     )
                                                // ).then(() => {
                                                //     // getIgDetails(
                                                //     //     toast,
                                                //     //     setIg
                                                //     // );
                                                // });
                                            }}
                                            className="fi fi-sr-add"
                                        ></i>
                                        {data.name}
                                    </div>
                                );
                            })}
                    </div>
                )}
            </div>
        </>
    );
};

export default IGSelector;
