import styles from "./Auth.module.css";
/**
 * Page for KKEM auth when dwms_id is present in the URL
 */
export default function KKEMAuth({ dwmsId }: { dwmsId: string }) {
    console.log(dwmsId);
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>KKEM auth</h1>
            <form>
                <input type="text" name="muid" id="muid" placeholder="muid" />
                <button type="submit" className={styles.submit}>
                    Submit
                </button>
            </form>
        </div>
    );
}
