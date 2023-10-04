import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spiderman = () => {
  const [muid, setMuid] = useState("");
  const [flag, setFlag] = useState("");
  const [secretKey, setSecretKey] = useState(""); // added this line to store the secret key
  const navigate = useNavigate();
  useEffect(() => {
    const muid = localStorage.getItem("muid");
    
    if (muid) {
      setMuid(muid);
      setSecretKey(process.env.REACT_APP_CTF_SECRET_KEY); // added this line to store the secret key
      const encrypted = btoa(muid + secretKey); // modified this line to use base64 encryption
      setFlag(encrypted);
    }
  }, [secretKey]);

  if (!muid) {
    navigate("/level1");
  }

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
        filter: "grayscale(100%)", // added this line to make the image monochrome
        textShadow: "0px 0px 10px white", // added this line to add a horror effect to the text
      }}
    >
      <img src="/assets/captf/displaynun.jpg" alt="" />
      <p
        style={{
          fontSize: "3rem", // added this line to increase the font size
        }}
      >
        Here is your flag{" "}
        <span style={{ display: "none", color: "#000000", textShadow: "none" }}>
          {flag}
        </span>
      </p>
      <a
        href="/submission?show=true"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            marginTop: "20px",
            cursor: "pointer",
            boxShadow: "0px 0px 10px white", // added this line to add a horror effect to the button
          }}
        >
          Next
        </button>
      </a>
    </div>
  );
};

export default Spiderman;
