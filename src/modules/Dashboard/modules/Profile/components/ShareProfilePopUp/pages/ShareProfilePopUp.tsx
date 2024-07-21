import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./ShareProfilePopUp.module.css";
import { Switch } from "@chakra-ui/react";
import { MuButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { saveAs } from "file-saver";
import { fetchQRCode } from "../services/api";
import Certificate from "../../Certificate/Certificate";

import html2canvas from "html2canvas";

type Props = {
    popUP: boolean;
    setPopUP: React.Dispatch<React.SetStateAction<boolean>>;
    profileStatus: boolean | undefined;
    setProfileStatus: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    userProfile: any;
    putIsPublic: (isPublic: boolean) => void;
};

const ShareProfilePopUp: React.FC<Props> = props => {
    const [copy, setCopy] = useState(false);
    const [blob, setBlob] = useState<any>();
    const [embedSize, setEmbedSize] = useState("100px");
    const certificateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchQRCode(setBlob);
    }, []);

    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", () => {
            props.setPopUP(false);
        });
    }, [props.popUP]);

    const downloadQR = () => {
        saveAs(blob, `${props.userProfile.muid}.png`);
    };

    const downloadPNG = () => {
        if (certificateRef.current) {
            html2canvas(certificateRef.current).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = 'certificate.png';
                link.click();
            });
        }
    };

    const openCertificateInNewTab = () => {
        const newTab = window.open('', '_blank');
        if (newTab) {
            const certificateComponent = (
                <Certificate
                    name={props.userProfile.full_name}
                    muid={props.userProfile.muid}
                    level={props.userProfile.level}
                    karma={props.userProfile.karma}
                    interestGroups={props.userProfile.interest_groups}
                />
            );
            newTab.document.body.innerHTML = '<div id="certificate-root"></div>';
            ReactDOM.render(certificateComponent, newTab.document.getElementById('certificate-root'));
        }
    };

    return (
        <>
            <div
                style={
                    props.popUP
                        ? { transform: "scale(1)" }
                        : { transform: "scale(0)" }
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
                                        props.putIsPublic(e.target.checked);
                                    }}
                                />
                            </div>
                        </div>
                        {props.profileStatus && (
                            <div className={styles.share_profile_container}>
                                <div className={styles.qr_code}>
                                    <img src={blob} alt="QR Code" />
                                </div>
                                <div className={styles.link}>
                                    <p>
                                        {
                                            import.meta.env
                                                .VITE_FRONTEND_URL as string
                                        }
                                        /profile/{props.userProfile.muid}
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
                                        <div className={styles.toast}>
                                            <p>{!copy ? "Copy" : "Copied!"}</p>
                                        </div>
                                    </i>
                                </div>
                            </div>
                        )}
                        <hr />
                        {props.profileStatus && (
                            <div className={styles.share_profile_btns}>
                                <button
                                    className={styles.embed_copy_btn}
                                    onClick={() => {
                                        navigator.clipboard.writeText(
                                            `<img src="${
                                                import.meta.env
                                                    .VITE_BACKEND_URL as string
                                            }/embed/rank/${
                                                props.userProfile.muid
                                            }" width="${embedSize}" height="${embedSize}"></img>`
                                        );
                                        setCopy(true);
                                        setTimeout(() => {
                                            setCopy(false);
                                        }, 3000);
                                    }}
                                >
                                    <p>{copy ? "Copied !" : "Embed Link"}</p>
                                    <select
                                        onChange={e => {
                                            setEmbedSize(e.target.value);
                                        }}
                                    >
                                        <option value="">Size</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                    </select>
                                </button>
                                <MuButton
                                    className={styles.embed_copy_btn}
                                    style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                    text={"Download QR"}
                                    onClick={downloadQR}
                                />
                            </div>
                        )}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "100%"
                            }}
                        >
                            <MuButton
                                style={{
                                    background: "#456ff6",
                                    display: "flex",
                                    justifyContent: "center",
                                    color: "#fff"
                                }}
                                text={"Download Certificate"}
                                onClick={openCertificateInNewTab}
                            />
                            <button onClick={() => props.setPopUP(false)}>
                                {!props.profileStatus ? "Cancel" : "Close"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShareProfilePopUp;