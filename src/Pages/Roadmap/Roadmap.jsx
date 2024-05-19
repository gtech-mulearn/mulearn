import React from "react";
import Navbar from "../../Components/Navbar/Navbar";

function Roadmap() {
  return (
    <div>
      <Navbar />
      <iframe
        src="https://roadmap.sh/r/embed?id=662f482233b0bd83e7382e2a"
        width="100%"
        height="500px"
        frameBorder="0"
        title="Roadmap"

      ></iframe>
    </div>
  );
}

export default Roadmap;
