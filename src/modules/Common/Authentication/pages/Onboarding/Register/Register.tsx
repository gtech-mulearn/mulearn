import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { submitUserData } from "../../../services/newOnboardingApis";
import AccountCreationComponent from "../../../components/AccountCreation/AccountCreationComponent";
import { Helmet } from "react-helmet";

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
        <>
            <Helmet>
            <title>Register | µLearn</title>
                <meta
                    name="description"
                    content="Join the µLearn movement and become part of a vibrant network of learners. Register now to unlock new possibilities through collaboration and growth."
                />
                <meta property="og:title" content="Register | µLearn"/>
                <meta property="og:url" content="https://app.mulearn.org/register"/>
                <meta
                    property="og:description"
                    content="Join the µLearn movement and become part of a vibrant network of learners. Register now to unlock new possibilities through collaboration and growth."
                />
            </Helmet>
            <AccountCreationComponent
                ruri={ruri ?? undefined}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                dwmsParam={param ?? undefined}
                refferalId={referralId ?? undefined}
                onContinue={handleAccountCreation}
            />
        </>
    );
}