import React, { useState, useEffect } from "react";

const Submission = () => {
  const [name, setName] = useState("");
  const [showParam, setShowParam] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const show = urlParams.get("show");
    setShowParam(show);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label
          htmlFor="input-field"
          style={{ color: "white", marginBottom: "10px" }}
        >
          Enter Secret Key
        </label>
        <input
          type="text"
          id="input-field"
          value={name}
          onChange={handleChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            marginBottom: "10px",
          }}
        />
        <a
          href={
            showParam === "true" || name !== "Secret Key"
              ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              : process.env.REACT_APP_CTF_SUMISSION_LINK
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            type="submit"
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "white",
              color: "black",
            }}
          >
            Submit
          </button>
        </a>
        <br />
        <span style={{ color: "white", marginBottom: "10px" }}>
          Note: Right Click and Open in New Tab
        </span>
      </form>
    </div>
  );
};

export default Submission;
