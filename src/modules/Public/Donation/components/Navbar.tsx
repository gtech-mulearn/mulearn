import styles from "./Navbar.module.css";
import { Link, useNavigate} from "react-router-dom";


export default function Navbar(){
    const navigate = useNavigate();

    return(
        <nav className={styles.LClandingPageNav}>
                <Link to="https://mulearn.org/"><img src="https://i.ibb.co/vY786NX/image.png" alt="muLearn" /></Link>
                <div className={styles.navLinks}>
                    <div>
                        <Link to="https://mulearn.org/">About</Link>
                        <Link to="https://mulearn.org/events/">Programs</Link>
                        <Link to="https://learn.mulearn.org/">
                            Interest Group
                        </Link>
                        <Link to="https://mulearn.org/careers">Careers</Link>
                    </div>
                    <button
                        onClick={() => {
                            navigate("/dashboard/connect-discord");
                        }}
                    >
                        Join Us
                    </button>
                </div>
            </nav>
    )
}