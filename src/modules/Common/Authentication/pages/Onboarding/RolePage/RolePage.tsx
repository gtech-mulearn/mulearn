import styles from "./RolePage.module.css";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";

import roleOptions from "./data/roleOptions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export default function Rolepage() {
    const navigate = useNavigate();
    const toast = useToast();

    const [selectedRole, setSelectedRole] = useState<string>("");

    const [nextPage, setNextPage] = useState<string>("");

    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"What describe you the most!"}
                desc={"Please select your role"}
            />
            <div className={styles.rolePageConatiner}>
                <div className={styles.rolePageCards}>
                    {roleOptions.map((roleOption: any) => {
                        let classname = `${styles.rolePageCard} ${
                            selectedRole === roleOption.value && styles.active
                        }`;
                        return (
                            <div
                                className={classname}
                                onClick={() => {
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
                        console.log(selectedRole, nextPage);

                        if (selectedRole === "" || nextPage === "") {
                            toast({
                                title: "Please select a role",
                                status: "error",
                                duration: 3000,
                                isClosable: true
                            });
                            return;
                        }
                        navigate(nextPage);
                    }}
                >
                    Continue
                </button>
            </div>
        </OnboardingTemplate>
    );
}
