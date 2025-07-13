import styles from "./MuLoader.module.css";
import { cdnUrl } from "@/modules/utils/cdn";

const MuLoader = () => {
    return (
        <div className={styles.muLoaderContainer}>
            <img src={cdnUrl("src/assets/gifs/MuLoader.gif")} alt="Loading..." />
        </div>
    );
};

export default MuLoader;
