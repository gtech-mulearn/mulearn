import React from "react";
import styles from "./Contact.module.css";
import img4 from "../../assets/img4.webp";

const links = [
  {
    id: 1,
    title: "About MuLearn",
    l1: "Learning Circles",
    l2: "Interest Groups",
    l4: "Careers",
    l5: "Join Us",
  },
];

export default function Contact() {
  return (
    <>
      <div className={styles.ContactUs}>
        <div className={styles.Contact}>
          <img alt="contact" src={img4} />
        </div>
        <div className={styles.ContactList}>
          {links.map((link) => {
            return (
              <div className={styles.list}>
                <p className={styles.ContactHead}>{link.title}</p>
                <ul>
                  {link.l1 ? (
                    <li>
                      <a
                        href="https://app.mulearn.org/learning-circle"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.l1}
                      </a>
                    </li>
                  ) : null}
                  {link.l2 ? (
                    <li>
                      <a
                        href="https://learn.mulearn.org/"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.l2}
                      </a>
                    </li>
                  ) : null}
                  {link.l3 ? (
                    <li>
                      <a
                        href="https://learn.mulearn.org/"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.l3}
                      </a>
                    </li>
                  ) : null}
                  {link.l4 ? (
                    <li>
                      <a
                        href="https://mulearn.org/careers"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.l4}
                      </a>
                    </li>
                  ) : null}
                  {link.l5 ? (
                    <li>
                      <a
                        href="https://app.mulearn.org"
                        rel="noreferrer"
                        target="_blank"
                      >
                        {link.l5}
                      </a>
                    </li>
                  ) : null}
                  {link.l6 ? (
                    <li
                      style={{ textDecoration: "underline", color: "#1C1CF0" }}
                    >
                      {" "}
                      <a href="/">{link.l6}</a>{" "}
                    </li>
                  ) : null}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
