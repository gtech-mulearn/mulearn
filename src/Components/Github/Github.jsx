import React, { useState, useEffect } from "react";
import styles from "./github.module.css";
import Avatar from "@mui/material/Avatar";
import gitUsers from "../../info";

const Github = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let usersList = [...gitUsers];
    setData(usersList);
  }, []);

  return (
    <>
      <div className={styles.gcontainer}>
        <p className={styles.m_header}>
          <span>GitHub Contributions</span>
          <span> by our Cool Learners.</span>
        </p>
        <p className={styles.mtagline}>
          As part of The Foundation Program, Over 200 learners successfully
          created a pull request satisfying all the requirements of assignments
          which were later merged into the organisation&apos;s repository. And
          here we present our Cool Contributors.
        </p>
        <div className={styles.contributors_container}>
          {data.map((item) => (
            <span
              key={item.gh_username}
              style={{ width: "7rem", height: "4rem", margin: "1rem 1.5rem" }}
            >
              <img alt={item.gh_username} src="" />
              <p style={{ color: "lightgray" }}>{`${
                item.name.length > 7 ? item.name.slice(0, 7) + "..." : item.name
              }`}</p>
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default Github;
