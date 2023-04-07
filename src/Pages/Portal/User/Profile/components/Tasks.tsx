import React from "react";
import styles from "./../Profile.module.css";

type Props = {};

const Tasks = ({ tasks = [{ task_title: "", karma: "", date: "" }] }) => {
  return (
    <div className={styles.tasks}>
      <h2>Tasks</h2>
      <div className={styles.tasks_div}>
        {tasks.map((task, index) => {
          return (
            <div className={styles.task} key={index}>
              <p>
                {task.task_title} <b>{task.karma} Karma Points</b>
              </p>
              <p>{task.date} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tasks;
