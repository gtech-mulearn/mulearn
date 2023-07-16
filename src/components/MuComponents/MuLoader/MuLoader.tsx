import styles from "./MuLoader.module.css";
import muLoader from '../../../assets/gifs/mu_loader.gif'

const MuLoader = () => {

    return (
        <div className={styles.mu_loader_container}>
          <img src={muLoader} alt="" className={styles.mu_loader}/>
        </div>
    );
};

export default MuLoader;