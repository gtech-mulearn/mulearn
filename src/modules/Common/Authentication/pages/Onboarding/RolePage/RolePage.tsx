import styles from "./RolePage.module.css";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import CollegePage from "../CollegePage/CollegePage";
import roleOptions from "./data/roleOptions";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getRoles, submitUserData } from "../../../services/newOnboardingApis";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import CompanyPage from "../CompanyPage/CompanyPage";

export default function Rolepage() {
    const navigate = useNavigate();

    const location = useLocation();
    let userData = location.state;

    const [isloading, setIsLoading] = useState(true);
    const [roles, setRoles] = useState([{ id: "", title: "" }]);
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [nextPage, setNextPage] = useState<string>("");

    const [selectedRoleId, setSelectedRoleId] = useState<string>("");

    useEffect(() => {
        if (userData === undefined || userData === null) {
            navigate("/register", { replace: true });
        } else {
            getRoles()
                .then((res: any) => {
                    // Update roles state
                    setRoles(res);

                    setIsLoading(false);
                    setSelectedRoleId(userData.role);

                    const role = res.find(
                        (role: any) => role.id === userData?.role
                    )?.title;
                    setSelectedRole(role || "");
                    setNextPage(
                        roleOptions.find(
                            roleOption => roleOption.value === role
                        )?.nextPage || ""
                    );
                })
                .catch(error => {
                    console.error("Error fetching roles", error);
                });
        }
    }, []);

    const submitData = () => {
        const newUserData: any = {
            user: {
                full_name: userData.user.full_name,
                email: userData.user.email,
                password: userData.user.password
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
        console.log(newUserData);

        submitUserData({
            setIsLoading: setIsLoading,
            userData: newUserData,
            navigate: navigate
        });
    };

    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"Tell us about yourself"}
                desc={"Fill in the details below to get started"}
            />

            <div className={styles.rolePageConatiner}>
                {/* <div
                        className={
                            styles.rolePageCards +
                            " " +
                            (!["Other", "Graduate"].includes(selectedRole) &&
                                selectedRole &&
                                styles.cardSmall)
                        }
                    >
                        {roleOptions.map((roleOption: any) => {
                            let classname = `${styles.rolePageCard} ${
                                selectedRole === roleOption.value &&
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
                    </div> */}
                {nextPage &&
                    (nextPage === "select-college" ? (
                        <CollegePage selectedRole={selectedRoleId} />
                    ) : (
                        <CompanyPage selectedRole={selectedRoleId} />
                    ))}

                {["Other", "Graduate"].includes(selectedRole) && (
                    <button
                        className={styles.buttonWidth}
                        onClick={() => {
                            submitData();
                        }}
                    >
                        Submit
                    </button>
                )}
            </div>
        </OnboardingTemplate>
    );
}
