import React, { useState } from "react";

const GridItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const description = item["desc"];
  let shortDescription = "";
  let posterLink = item["poster"];
  if (posterLink.includes("\n")) {
    posterLink = posterLink.split("\n")[0];
  }
  if (!posterLink) {
    shortDescription =
      description.length > 350
        ? description.substring(0, 350) + "..."
        : description;
  } else {
    shortDescription =
      description.length > 100
        ? description.substring(0, 100) + "..."
        : description;
  }

  return (
    <div className="bg-white font-poppins rounded-lg shadow-lg border text-normal overflow-hidden">
      <img
        src={posterLink}
        loading="lazy"
        className="w-full max-h-60 object-cover"
        alt=""
      />
      <div className="p-4 ">
        <p className="py-1 text-slate-600 font-semibold text-sm">{item.Date}</p>
        <p className="py-1 text-xl font-semibold" style={{ color: "#f78c40" }}>
          {item["title"]}
        </p>
        <p className="py-1">{isExpanded ? description : shortDescription}</p>
        {description.length > 100 && (
          <button
            className="text-white bg-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm px-4 py-1  mt-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
        {/* <p>Event Type: {item["Event Type"]}</p> */}
      </div>
    </div>
  );
};

export default GridItem;
