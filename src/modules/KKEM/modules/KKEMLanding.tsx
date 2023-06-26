import { useSearchParams } from "react-router-dom";
import KKEMAuth from "../components/Auth";
import Landing from "../components/Landing";
import MulearnBrand from "../../Dashboard/assets/MulearnBrand";
import styles from "./KKEMLanding.module.css";
export default function KKEMLanding() {
    const [searchParams] = useSearchParams();
    const dwms_id = searchParams.get("dwms_id");
    const muid = searchParams.get("mu_id");

    return (
        <div className={styles.container}>
            <MulearnBrand />
            {(() => {
                if (muid) {
                    return <Landing />;
                } else if (dwms_id) {
                    return <KKEMAuth dwmsId={dwms_id} />;
                } else {
                    return <Landing />;
                }
            })()}
        </div>
    );
}
