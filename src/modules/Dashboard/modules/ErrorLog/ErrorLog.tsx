import { BsCloudDownload } from "react-icons/bs"
import styles from "./ErrorLog.module.css"

const ErrorLog = () => {
  return (
      <>
          <button className={styles.errorLogButton}>
              <div className={styles.errorLogBox}>
                
                  <BsCloudDownload />
              </div>
          </button>
      </>
  );
}

export default ErrorLog