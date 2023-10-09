import React from "react"
import styles from "./Contact.module.css"
import img4 from "../../assets/img4.webp";

const links = [
    {
        id: 1,
        title: "Company",
        l1: "Features",
        l2: "Success Stories",
        l3: "Our Story",
        l4: "Careers",
        l5: "Events",
    },
    {
        id: 2,
        title: "Developers",
        l1: "Documentation",
        l2: "Tutorials",
        l3: "Showcases",
    },
    {
        id: 3,
        title: "About",
        l1: "Legal & GDPR",
        l2: "Equal opportunity employer",
        l3: "Privacy policy",
        l4: "Licensing",
        l5: "Glossary",
    },
    {
        id: 4,
        title: "Contact",
        l1: "Pathway",
        l2: "96bis Boulevard Raspail",
        l3: "Agoranov",
        l4: "75006 Paris",
        l5: "France",
        l6: "contact@pathway.com"
    }
]

export default function Contact() {
    return (
        <>
            <div className={styles.ContactUs}>
                <div className={styles.Contact}>
                    <img src={img4} />
                </div>
                <div className={styles.ContactList}>
                    {
                        links.map((link) => {
                            return (
                                <div className={styles.list}>
                                    <p className={styles.ContactHead}>{link.title}</p>
                                    <ul>
                                        {link.l1 ? <li><a href="#">{link.l1}</a></li> : null}
                                        {link.l2 ? <li><a href="#">{link.l2}</a></li> : null}
                                        {link.l3 ? <li><a href="#">{link.l3}</a></li> : null}
                                        {link.l4 ? <li><a href="#">{link.l4}</a></li> : null}
                                        {link.l5 ? <li><a href="#">{link.l5}</a></li> : null}
                                        {link.l6 ? <li style={{ textDecoration: "underline", color: "#1C1CF0" }}> <a href="#">{link.l6}</a> </li> : null}
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
