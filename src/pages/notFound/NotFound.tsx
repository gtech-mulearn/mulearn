import React from "react";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1>404 Not Found</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="154"
        height="155"
        viewBox="0 0 154 155"
        fill="none"
      >
        <line x1="1.5" x2="1.5" y2="155" stroke="black" stroke-width="3" />
        <line x1="152.5" x2="152.5" y2="155" stroke="black" stroke-width="3" />
        <line x1="27" y1="1.5" y2="1.5" stroke="black" stroke-width="3" />
        <line
          x1="28.5"
          y1="49"
          x2="28.5"
          y2="30"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="109.5"
          y1="155"
          x2="109.5"
          y2="136"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="113.5"
          y1="43"
          x2="113.5"
          y2="20"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="54"
          y1="87.0071"
          x2="54"
          y2="51.9928"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="101.5"
          y1="101"
          x2="101.5"
          y2="69"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="73.5"
          y1="144"
          x2="73.5"
          y2="104"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="151"
          y1="153.5"
          x2="142"
          y2="153.5"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="151"
          y1="1.5"
          x2="50"
          y2="1.5"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="129.988"
          y1="20.5"
          x2="1.98828"
          y2="19.5"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="132.989"
          y1="51.5"
          x2="1.98855"
          y2="50.5"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="35"
          y1="70.5"
          x2="2"
          y2="70.5"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="35"
          y1="70.5"
          x2="2"
          y2="70.5"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="35"
          y1="88.5"
          x2="2"
          y2="88.5"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="35"
          y1="135.5"
          x2="2"
          y2="135.5"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="130"
          y1="70.5"
          x2="54"
          y2="70.5"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="150.988"
          y1="118.5"
          x2="28.9877"
          y2="117.5"
          stroke="black"
          stroke-width="3"
        />
        <line
          x1="120"
          y1="153.5"
          x2="-5.92095e-10"
          y2="153.5"
          stroke="black"
          stroke-width="3"
        />
        <circle cx="40.5" cy="8" r="5.5" fill="#CF0909" />
        <path d="M132 151L125.072 139H138.928L132 151Z" fill="#CF0909" />
      </svg>
      <p>Sorry, the page you are looking for doesn't exist.</p>
      <a href="/">Go Back</a>
    </div>
  );
};

export default NotFound;
