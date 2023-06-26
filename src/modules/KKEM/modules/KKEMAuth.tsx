import { useParams } from "react-router-dom";
import { userAuthConfirm } from "../services/auth";
import { useEffect, useState } from "react";
export default function KKEMAuth() {
    const { token } = useParams<{ token: string }>();
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if (!token) {
            return;
        }
        userAuthConfirm(token).then(res => {
            setSuccess(true);
        });
    }, [token]);
    return success ? <p>Success</p> : <p>Failure</p>;
}
