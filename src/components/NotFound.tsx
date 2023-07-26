import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import astronaut from "./assests/images/astronaut_blue.png";

// TODO: Redesign

const NotFound = () => {
    return (    
        <div className={styles.container_404}>
        <div className={styles.main_body_404}>

             <div className={styles.content_404}>
                <h1>404</h1>
                <div>
                    <p>Nothing here!</p>
                    <p>Back to base, learners!</p>
                </div>
                 <Link to="/">     {/*    Link to Home    */}
                <button>Go back to home</button>
                </Link>
             </div>

             
             <div className={styles.image_404}>  
                <img src={astronaut} alt=""/>
                <div className={styles.shadow_404}></div>
             </div>
        </div>   

    </div>        
    );
};

export default NotFound;
