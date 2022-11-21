import React, { useState, useEffect } from "react";
import styles from "./github.module.css";

import Avatar from "@mui/material/Avatar";
import axios from "axios";
import gitUsers from '../../info'

const Github = () => {
  const [data1, setData1] = useState();
  const [users,setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://api.github.com/users/shaheenhyderk').then(res=>console.log(res.data))
    const userList=gitUsers.map(user=>user.gh_username)

   userList.forEach(user=>{
    axios
      .get(`https://api.github.com/users/${user}`,{headers: {
        Authorization: "token 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"
      }})
      .then((res) => {
        setUsers(prev=>([...prev,res.dat]))
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  })
    
      
  }, []);
  if (data1) {
    return (
      <>
        <div className={styles.gcontainer}>
          <p className={styles.m_header}>
            <span>GitHub Contributions</span>
            <span> by our Cool Learners.</span>{" "}
          </p>
          <p className={styles.mtagline}>
            As part of The Foundation Program, Over 200 learners successfully
            created a pull request satisfying all the requirements of
            assignments which were later merged into the organisation&apos;s
            repository. And here we present our Cool Contributors.
          </p>
          <div className={styles.contributors_container}>
            {users.map((item) => {
              return (
                <span key={item.id}>
                  <a
                    href={item.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div key={item.id} className={styles.contributor}>
                      <Avatar
                        alt={item.login}
                        src={item.avatar_url}
                        sx={{ width: 66, height: 66 }}
                      />
                      <p className={styles.name}>
                        {item.login.length > 9
                          ? item.login.substring(0, 6) + "..."
                          : item.login}
                      </p>
                    </div>
                  </a>
                </span>
              );
            })}
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Github;
