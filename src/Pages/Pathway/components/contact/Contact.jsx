import React from "react"
import styles from "./Contact.module.css"
import img4 from "./assets/img4.webp";
import logo from "./assets/logo.png";

const Contact = () => {
    return (
        <>
            <div className={styles.ContactUs}>
                <div className={styles.Contact}>
                    <img src={img4} />
                </div>
                <div className={styles.ContactList}>
                    <div className={styles.ContactHead}>
                        <div className={styles.Company}>Company</div>
                        <div className={styles.Developers}>Developers</div>
                        <div className={styles.About}>About</div>
                        <div className={styles.Contact}>Contact</div>

                    </div>
                    <hr/>
                        <div className={styles.contactLists}>
                            <div>
                                <ul>
                                    <li>Features</li>
                                    <li>Success Stories</li>
                                    <li>Our Story</li>
                                    <li>Careers</li>
                                    <li>Events</li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>Documentation</li>
                                    <li>Tutorials</li>
                                    <li>Showcases</li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>Legal & GDPR</li>
                                    <li>Equal opportunity employer</li>
                                    <li>Privacy policy</li>
                                    <li>Licensing</li>
                                    <li>Glossary</li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>Pathway</li>
                                    <li>96bis Boulevard Raspail</li>
                                    <li>Agoranov</li>
                                    <li>75006 Paris</li>
                                    <li>France</li>
                                    <li>contact@pathway.com</li>
                                </ul>
                            </div>

                        </div>
                </div>
            </div>

        </>
    )
}

export default Contact
