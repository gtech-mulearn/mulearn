import React from "react";
import { Link } from "react-router-dom";
import nfgif from "./assets/notfound/nf.gif";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notfoundpage}>
      <img src={nfgif} alt="" className={styles.nf_img} />
      <h1 className={styles.h1}>404 PAGE NOT FOUND</h1>
      <p className={styles.p}>
        The page you are looking for might have been removed, had its name
        changed or is temporarily unavailable.
      </p>
      <Link to="/">
        <button
          className="bg-orange-400 text-white  px-6 py-2 rounded-md"
          style={{ marginTop: "20px" }}
        >
          Back To Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
