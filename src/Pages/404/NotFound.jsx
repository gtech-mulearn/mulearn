import React from "react";
import { Link } from "react-router-dom";
import nfgif from "./assets/notfound/nf.gif";
import styles from "./NotFound.module.css";

const NotFound = ({ isLoaded }) => {
  console.log("isLoaded", isLoaded);
  return (
    <div className={styles.notfoundpage}>
      {isLoaded ? (
        <>
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
        </>
      ) : (
        <div className="flex justify-center items-center flex-col gap-8">
          <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-l-2 border-orange-400"></div>
          <p className="text-2xl font-medium text-orange-400">
            Please wait...
          </p>
        </div>
      )}
    </div>
  );
};

export default NotFound;
