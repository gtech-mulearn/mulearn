import styles from "./Footer.module.css";
import { footerData } from "../services/footerData";
import {
    RiWhatsappFill,
    RiTwitterFill,
    RiInstagramFill,
    RiLinkedinBoxFill,
    RiYoutubeFill,
    RiFacebookBoxFill
} from "react-icons/ri";
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {footerData.map((data, index) => {
                    return (
                        <div className={styles.footerSection} key={index}>
                            <h3 className={styles.title}>{data.name}</h3>
                            <div className={styles.links}>
                                {data.links.map(link => {
                                    return (
                                        <a href={link.url} key={link.name}>
                                            {link.name}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <hr />
            <div className={styles.container}>
                <div className={styles.socialMedia}>
                    <a href="#">
                        <RiWhatsappFill />
                    </a>
                    <a href="#">
                        <RiTwitterFill />
                    </a>
                    <a href="#">
                        <RiInstagramFill />
                    </a>
                    <a href="#">
                        <RiLinkedinBoxFill />
                    </a>
                    <a href="#">
                        <RiYoutubeFill />
                    </a>
                    <a href="#">
                        <RiFacebookBoxFill />
                    </a>
                </div>
                <div className={styles.legal}>
                    <a href="#">
                        <span>Privacy Policy</span>
                    </a>
                    <a href="#">
                        <span>Terms and Conditions</span>
                    </a>
                    <a href="#">
                        <span>Support</span>
                    </a>
                </div>
                <div className={styles.copyRight}>
                    <span>© Copyright 2023, All Rights Reserved</span>
                </div>
            </div>
        </footer>
    );
}
