import { useParams } from "react-router-dom";
export default function KKEMAuth() {
    const { token } = useParams<{ token: string }>();
    return <div>{token}</div>;
}
