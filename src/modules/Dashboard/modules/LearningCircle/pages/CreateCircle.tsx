import styles from "./CreateCircle.module.css";

type Props = {};

const CreateCircle = (props: Props) => {
    return (
        <>
            <div className={styles.content}>

                <div className={styles.CreateLearn}>
                    <img src="https://i.ibb.co/RhT8b3z/image-24.png" alt="" />

                    <div className={styles.create}>
                        <div>
                            <b>Create a Learning circle</b>
                            <p>Connect, Collaborate, and Learn Together!</p>
                        </div>

                        <div className={styles.entercirclename}>
                            <input type="text" placeholder="Learning circle name" />
                            <input type="text" placeholder="Interest group" />
                        </div>

                        <button>Create</button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default CreateCircle;