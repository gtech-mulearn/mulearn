import styles from './RoleOne.module.css'

export default function Role1() {
    return (
        <div>
            <div className={styles.wrapper}>
            <form action="">
            <h5 className={styles.text}>Please enter your collage details</h5>
            <div className={styles.inputBox}>
                <input type="text" placeholder="Collage Name" required />
            </div>
            <div className={styles.inputBox}>
                <input type="text" placeholder="Department" required />
            </div>
            <div className={styles.inputBox}>
                <input type="text" placeholder="Graduation year" required />
            </div>
            
            <div className={styles.submit}>
                <button className={styles.submitB}>Submit</button>
                
            </div>
        </form>
    </div>
    </div>
    )}