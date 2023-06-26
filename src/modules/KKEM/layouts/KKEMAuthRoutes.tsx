import { useSearchParams } from "react-router-dom";
import KKEMAuth from "../modules/Auth";
import Landing from "../modules/Landing";

export default function KKEMAuthRoutes() {
    const [searchParams] = useSearchParams();
    const dwms_id = searchParams.get("dwms_id");

    if (dwms_id) {
        return <KKEMAuth dwmsId={dwms_id} />;
    } else {
        return <Landing />;
    }
}
