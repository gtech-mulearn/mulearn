import styles from "./RolePage.module.css";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import CollegePage from "../CollegePage/CollegePage";
import roleOptions from "./data/roleOptions";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { getRoles, submitUserData } from "../../../services/newOnboardingApis";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import CompanyPage from "../CompanyPage/CompanyPage";

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
                first_name: userData.user.first_name,
                last_name: userData.user.last_name,
                mobile: userData.user.mobile,
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
            toast: toast,
            navigate: navigate
        });
    };
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
                    <div
                        className={
                            styles.rolePageCards +
                            " " +
                            (selectedRole !== "Other" && styles.cardSmall)
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
                    </div>
                    {nextPage &&
                        (nextPage === "select-college" ? (
                            <CollegePage selectedRole={selectedRoleId} />
                        ) : (
                            <CompanyPage selectedRole={selectedRoleId} />
                        ))}

                    {selectedRole === "Other" && (
                        <button
                            className={styles.buttonWidth}
                            onClick={() => {
                                console.log(selectedRoleId);
                                submitData();
                            }}
                        >
                            Submit
                        </button>
                    )}
                </div>
            )}
        </OnboardingTemplate>
    );
}
