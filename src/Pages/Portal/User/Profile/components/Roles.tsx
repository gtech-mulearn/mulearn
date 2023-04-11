import React from "react";
import styles from "./../Profile.module.css";

type Props = {};

const Roles = ({ roles = { main_role: "", authority_roles: "" } }) => {
  return (
    <div className={styles.roles}>
      <h2>Roles</h2>
      <div className={styles.roles_div}>
        <ul>
          <li>{roles.main_role}</li>
          <li>{roles.authority_roles}</li>
        </ul>
      </div>
    </div>
  );
};

export default Roles;
