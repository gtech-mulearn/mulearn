import styles from "./Muloader.module.css";
import muloader from '../../../assets/gifs/mu_loader.gif'

const Muloader = () => {

    return (
        <div className={styles.muloader_container}>
          <img src={muloader} alt="" className={styles.mu_loader}/>
        </div>
    );
};

export default Muloader;