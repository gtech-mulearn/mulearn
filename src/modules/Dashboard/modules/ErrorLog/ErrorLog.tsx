import { BsCloudDownload } from "react-icons/bs"
import styles from "./ErrorLog.module.css"
import { getCSV } from "./ErrorLogApi";

const ErrorLog = () => {

    const handleSubmit = async () => {
       getCSV()
    }

  return (
      <>
          <button className={styles.errorLogButton} onClick={handleSubmit}>
              <div className={styles.errorLogBox}>
                
                  <BsCloudDownload />
              </div>
              Download ErrorLog
          </button>
      </>
  );
}

export default ErrorLog