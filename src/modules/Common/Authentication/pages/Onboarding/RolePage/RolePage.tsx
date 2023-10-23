import styles from "./RolePage.module.css";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";

import roleOptions from "./data/roleOptions";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { getRoles, submitUserData } from "../../../services/newOnboardingApis";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

export default function Rolepage() {
    const navigate = useNavigate();
    const toast = useToast();
    const location = useLocation();
    let userData = location.state;

    const [isloading, setIsLoading] = useState(true);
    const [roles, setRoles] = useState([{ id: "", title: "" }]);
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [nextPage, setNextPage] = useState<string>("");

    const [selectedRoleId, setSelectedRoleId] = useState<string>("");

    useEffect(() => {
        console.log("userData", userData);

        if (userData === undefined || userData === null) {
            navigate("/register", { replace: true });
        } else {
            getRoles({
                setIsLoading: setIsLoading,
                setRoles: setRoles
            });
        }
    }, []);

    const submitData = () => {
        const newUserData: any = {
            user: {
                first_name: userData.first_name,
                last_name: userData.last_name,
                mobile: userData.mobile,
                email: userData.email,
                password: userData.password
            }
        };

        if (userData.referral_id)
            newUserData["referral"] = { muid: userData.referral_id };
        if (userData.param) {
            newUserData["integration"]["param"] = userData.param;
            newUserData["integration"]["title"] = "DWMS";
        }
        if (userData.referral)
            newUserData["referral"] = { muid: userData.referral.muid };

        submitUserData({
            setIsLoading: setIsLoading,
            userData: newUserData,
            toast: toast,
            navigate: navigate
        });
    }

    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"What describe you the most!"}
                desc={"Please select your role"}
            />
            {isloading ? (
                <MuLoader />
            ) : (
                <div className={styles.rolePageConatiner}>
                    <div className={styles.rolePageCards}>
                        {roleOptions.map((roleOption: any) => {
                            let classname = `${styles.rolePageCard} ${selectedRole === roleOption.value &&
                                styles.active
                                }`;
                            return (
                                <div
                                    className={classname}
                                    onClick={() => {
                                        let rolId = roles.find(
                                            role =>
                                                role.title === roleOption.value
                                        )?.id;
                                        setSelectedRoleId(rolId || "");
                                        setSelectedRole(roleOption.value);
                                        setNextPage(roleOption.nextPage);
                                    }}
                                >
                                    {roleOption.icon}
                                    <p>{roleOption.title}</p>
                                </div>
                            );
                        })}
                    </div>

                    <button
                        onClick={() => {
                            console.log(selectedRoleId);

                            if (selectedRole === "" || nextPage === "") {
                                toast({
                                    title: "Please select a role",
                                    status: "error",
                                    duration: 3000,
                                    isClosable: true
                                });
                                return;
                            }
                            if (nextPage)
                                navigate(nextPage, {
                                    state: { ...userData, role: selectedRoleId }
                                });
                            else
                                submitData();
                        }}
                    >
                        {nextPage ? "Continue" : "Submit"}
                    </button>
                </div>
            )}
        </OnboardingTemplate>
    );
}
