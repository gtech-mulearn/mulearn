import React from 'react'

const GridItem = ({ item }) => {
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
        <img src={posterLink} loading="lazy" className="w-full max-h-60 object-cover" alt="" />
        <div className="p-4 ">
          <p className="py-1 text-xl font-medium" style={{ color: "#f78c40" }}>
            {item["title"]}
          </p>
          <p className="py-1">{shortDescription}</p>
          <p className="py-1 text-slate-600">{item.Date}</p>
          {/* <p>Event Type: {item["Event Type"]}</p> */}
        </div>
      </div>
    );
  };

export default GridItem