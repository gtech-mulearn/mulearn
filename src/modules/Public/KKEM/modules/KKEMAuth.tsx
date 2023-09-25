import { useNavigate, useParams } from "react-router-dom";
import { userAuthConfirm } from "../services/auth";
import { useEffect, useState } from "react";
import Astronaut from "../assets/astronaut.webp";
import styles from "./KKEMAuth.module.css";
import Footer from "../components/Footer";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { useToast } from "@chakra-ui/react";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { refreshRoles } from "@/MuLearnServices/authCheck";
type authGetUserInfo = APIResponse<UserInfo>;
export default function KKEMAuth() {
    const { token } = useParams<{ token: string }>();
    const [status, setStatus] = useState("pending");
    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {
        if (!token) {
            return;
        }
        const controller = new AbortController();
        userAuthConfirm(token, controller)
            .then(res => {
                privateGateway
                    .get(dashboardRoutes.getInfo)
                    .then((response: authGetUserInfo) => {

                        localStorage.setItem(
                            "userInfo",
                            JSON.stringify(response.data.response)
                        );
                        refreshRoles();
                    })
                    .catch(error => {
                        console.log(error);
                    });
                setStatus("success");
               
                localStorage.setItem("accessToken", res?.response?.accessToken);
                localStorage.setItem(
                    "refreshToken",
                    res?.response?.refreshToken
                );
                toast({
                    title: "Integration successful.You will be redirected to learning circle page shortly",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
                setTimeout(() => {
                    navigate("/dashboard/learning-circle");
                }, 2000);
            })
            .catch(err => {
                if (err?.hasError) {
                    setStatus("failure");
                    toast({
                        title: "Invalid token.",
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    });
                }
            });
        return () => {
            controller.abort();
        };
    }, [token]);
    return (
        <main>
            {status === "pending" ? (
                <div className={styles.muLoader}>
                    <MuLoader />
                </div>
            ) : (
                <>
                    {status === "success" && <Success />}
                    {status === "failure" && <Failure />}
                </>
            )}
            <Footer />
        </main>
    );
}

function Success() {
    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <h1>Success!</h1>
                <p>
                    You have successfully authenticated with µLearn. You can now
                    close this tab.
                </p>
            </div>
            <img className={styles.image} src={Astronaut} alt="Astronaut" />
        </section>
    );
}

function Failure() {
    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <h1 className={styles.failure}>Failure!</h1>
                <p>
                    You have failed to authenticate with µLearn. Please try
                    again.
                </p>
            </div>
        </section>
    );
}
