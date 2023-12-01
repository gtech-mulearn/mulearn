import { useEffect, useState } from "react";
import styles from "./BasicDetails.module.css";
import HeatmapComponent from "../../Heatmap/HeatmapComponent";
import { useToast } from "@chakra-ui/react";
import { editIgDetails, getAllIg } from "../services/api";
import { useParams } from "react-router-dom";
import i18next from "i18next";
import LanguageSwitcher from "../../../../LanguageSwitcher/LanguageSwitcher";
import { getFontSizeForLanguage } from "../../../../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";
type Props = {
    userProfile: any;
    userLog: any;
};
const BasicDetails = (props: Props) => {
    const toast = useToast();
    const [editIg, setEditIg] = useState(false);
    const [allIg, setAllIg] = useState<any>([]);
    const { t } = useTranslation(["ChangePassword"]);

    const fontSize = getFontSizeForLanguage(i18next.language, i18next);
    const [ig, setIg] = useState<any>(props.userProfile.interest_groups);
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        // getIgDetails(toast, setIg);
        getAllIg(setAllIg);
    }, []);
    const ig_sorted = ig.sort((a: any, b: any) => {
        return a.name > b.name ? 1 : -1;
    });
    return (
        <>
            <div className={styles.interestGrp}>
                <div className={styles.top_sec}>
                    <b style={{ fontSize }}>{t("Interest Groups")}</b>
                    <div className={styles.close_and_submit_btn_div}>
                        {!id &&
                            props.userProfile.level.slice(3, 4) >= 4 &&
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
                                        toast,
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
                                                if (ig.length > 1) {
                                                    setIg(
                                                        ig.filter(
                                                            (ig: any) =>
                                                                ig.name !=
                                                                data.name
                                                        )
                                                    );
                                                } else {
                                                    toast({
                                                        title: "Error",
                                                        description:
                                                            "You must have atleast one interest group",
                                                        status: "error",
                                                        duration: 3000,
                                                        isClosable: true
                                                    });
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
                        <p style={{ fontSize }}>
                            {t("Interest Groups new user")}
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
