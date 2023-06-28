import KKEMAuth from "../components/Auth";
import Navbar from "../components/Navbar";
import { useSearchParams } from "react-router-dom";
/**
 * Landing page for KKEM
 */
export default function Landing() {
    const [searchParams] = useSearchParams();
    const dwms_id = searchParams.get("dwms_id");
    return (
        <>
            <Navbar />
            {dwms_id && <KKEMAuth dwmsId={dwms_id} />}
        </>
    );
}
