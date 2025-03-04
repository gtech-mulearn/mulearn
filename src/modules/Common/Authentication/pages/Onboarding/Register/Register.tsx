import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { submitUserData } from "../../../services/newOnboardingApis";
import toast from "react-hot-toast";
import AccountCreationComponent from "../../../components/AccountCreation/AccountCreationComponent";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { privateGateway } from "@/MuLearnServices/apiGateways";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const param = searchParams.get("param");
    const referralId = searchParams.get("referral_id");
    const ruri = searchParams.get("ruri");
    const [isLoading, setIsLoading] = useState(false);

    const handleAccountCreation = (userData: RegisterRequestDataType) => {
        submitUserData({
            setIsLoading: setIsLoading,
            userData: userData
        }).then(res => {
            if (res) {
                navigate("/register/organization");
            }
        });
    };

  

    return (
        <AccountCreationComponent
            ruri={ruri ?? undefined}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            dwmsParam={param ?? undefined}
            refferalId={referralId ?? undefined}
            onContinue={handleAccountCreation}
        />
    );
}