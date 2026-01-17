import { useEffect, useState } from "react";
import styles from "./BasicDetails.module.css";
import HeatmapComponent from "../../Heatmap/HeatmapComponent";
import { editIgDetails, getAllIg } from "../services/api";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
type Props = {
    userProfile: any;
    userLog: any;
};
const BasicDetails = (props: Props) => {
    const [editIg, setEditIg] = useState(false);
    const [allIg, setAllIg] = useState<any[]>([]);
    const [ig, setIg] = useState<any[]>(props.userProfile.interest_groups);

    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        getAllIg(setAllIg);
    }, []);
    const ig_sorted = [...ig]
        .filter((ig) => ig.selected)
        .sort((a, b) => (a.name > b.name ? 1 : -1));

    const selectedIg = [...ig]
        .filter((item) => item.selected)
        .sort((a, b) => a.name.localeCompare(b.name));

    const capitalize = (text = "") =>
        text.charAt(0).toUpperCase() + text.slice(1);

    return (
        <>
            <div className={styles.interestGrp}>
                <div className={styles.top_sec}>
                    <b>Interest Groups</b>
                    <div className={styles.close_and_submit_btn_div}>
                        {!id &&
                            (props.userProfile.level.slice(3, 4) >= 4 ||
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
                    {selectedIg.length > 0 ? (
                        selectedIg.map((data: any, i: number) => (
                            <div
                                key={i}
                                style={editIg ? { transform: "scale(0.955)" } : {}}
                                className={styles.igs}
                            >
                                {editIg && (
                                    <i
                                        onClick={() => {
                                            if (selectedIg.length > 1) {
                                                setIg((prev) =>
                                                    prev.map((item) =>
                                                        item.name === data.name
                                                            ? { ...item, selected: false }
                                                            : item
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
                                <div className={styles.igText}>
                                    <span className={styles.igName}>{data.name}</span>
                                    <span className={styles.igKarma}>
                                        Karma:{" "}
                                        {data.karma > 1000
                                            ? (data.karma / 1000).toPrecision(2) + "K"
                                            : data.karma || "0"}
                                    </span>
                                </div>
                                <p>
                                    {capitalize(data.level?.unit) || "Level"}{" "}
                                    {data.level?.count ?? 1}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>
                            No Interest Groups to Selected, Must be level 4 or above to select
                        </p>
                    )}
                    {editIg && <hr />}
                </div>
                {editIg && (
                    <div className={styles.igs_container}>
                        {allIg
                            .filter(
                                (data: any) =>
                                    !ig.some(
                                        (item: any) =>
                                            item.name === data.name && item.selected
                                    )
                            )
                            .map((data: any, i: number) => (
                                <div key={i} className={styles.igs}>
                                    <i
                                        onClick={() => {
                                            if (selectedIg.length < 3) {
                                                setIg((prev) => [
                                                    ...prev,
                                                    { ...data, selected: true },
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
                            ))}
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
