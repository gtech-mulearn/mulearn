import React, { useEffect, useState } from "react";
import styles from "./ShareProfilePopUp.module.css";
import { Switch } from "@chakra-ui/react";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { saveAs } from "file-saver";
import { fetchQRCode } from "../services/api";

type Props = {
    popUP: boolean;
    setPopUP: React.Dispatch<React.SetStateAction<boolean>>;
    profileStatus: boolean | undefined;
    setProfileStatus: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    userProfile: any;
    putIsPublic: (isPublic: boolean, toast: any) => void;
    toast: any;
};

const ShareProfilePopUp = (props: Props) => {
    const [copy, setCopy] = useState(false);
    const [blob, setBlob] = useState<any>();
    const [embedSize, setEmbedSize] = useState("100px");
    useEffect(() => {
        fetchQRCode(setBlob);
    }, []);
    const downloadQR = () => {
        saveAs(blob, `${props.userProfile.muid}.png`);
    };
    return (
        <>
            <div
                style={
                    props.popUP
                        ? { transform: "scale(1)" }
                        : {
                              transform: "scale(0)"
                              // opacity: "0",
                          }
                }
                className={styles.share_pop_up_container}
                onKeyDown={e => {
                    if (e.key === "Escape") {
                        props.setPopUP(false);
                    }
                }}
                tabIndex={0}
            >
                <div className={styles.share_pop_up}>
                    <div className={styles.share_pop_up_contents}>
                        <h1>Share your profile</h1>
                        <div className={styles.profile_state}>
                            <p>Switch to public profile</p>
                            <div className={styles.option}>
                                <Switch
                                    size="sm"
                                    isChecked={props.profileStatus}
                                    onChange={e => {
                                        props.setProfileStatus(
                                            e.target.checked
                                        );
                                        props.putIsPublic(
                                            e.target.checked,
                                            props.toast
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        {props.profileStatus && (
                            <div className={styles.share_profile_container}>
                                <div className={styles.qr_code}>
                                    <img src={blob} alt="" />
                                </div>
                                {/* Todo: Reusable copy link component */}
                                <div className={styles.link}>
                                    <p>
                                        {
                                            import.meta.env
                                                .VITE_FRONTEND_URL as string
                                        }
                                        /profile/
                                        {props.userProfile.muid}
                                    </p>

                                    <i
                                        onClick={() => {
                                            navigator.clipboard.writeText(
                                                `${
                                                    import.meta.env
                                                        .VITE_FRONTEND_URL as string
                                                }/profile/${
                                                    props.userProfile.muid
                                                }`
                                            );
                                            setCopy(true);
                                            setTimeout(() => {
                                                setCopy(false);
                                            }, 3000);
                                        }}
                                        className="fi fi-sr-link"
                                    >
                                        {/* Todo: Create as left Side Tooltip Component for below component */}
                                        <div className={styles.toast}>
                                            <p>{!copy ? "Copy" : "Copied!"}</p>
                                        </div>
                                        {/* Todo: Create as left Side Tooltip Component for above component*/}
                                    </i>
                                </div>
                            </div>
                        )}
                        <hr />
                        {props.profileStatus && (
                            <div className={styles.share_profile_btns}>
                                <button className={styles.embed_copy_btn}>
                                    <p>Embed Link</p>
                                    <select>
                                        <option value="">Size</option>
                                        <option value="medium">100</option>
                                        <option value="large">200</option>
                                    </select>
                                </button>
                                <MuButton
                                    style={{
                                        border: "1px solid #456FF6",
                                        color: "#000",
                                        margin: "0px 0px -8px 0px",
                                        display: "flex",
                                        justifyContent: "center",
                                        padding: "26px"
                                    }}
                                    text={"Download QR"}
                                    onClick={() => {
                                        downloadQR();
                                    }}
                                />
                            </div>
                        )}
                        <button onClick={() => props.setPopUP(false)}>
                            {!props.profileStatus ? "Cancel" : "Close"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShareProfilePopUp;
