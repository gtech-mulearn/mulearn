import React, { useRef, useState } from "react";
import LogoBgColors from "./LogoBgColors.json";

const CampusLogoGenerator = () => {
  const canvasRef = useRef(null);
  const [logoType, setLogoType] = useState("Profile Pic");
  const [logoBgColor, setLogoBgColor] = useState("#f5365c");
  const [text, setText] = useState("");

  const LogoTypes = ["Profile Pic", "Transparent Bg"];

  return (
    <div className="flex">
      <div className="w-full h-screen p-8 border-r-2">
        <canvas
          ref={canvasRef}
          width={window.innerHeight / 2}
          height={window.innerHeight / 2}
          className="border-2 border-gray-300 m-auto"
          style={{ backgroundColor: logoBgColor }}
        ></canvas>
      </div>
      <form
        // onSubmit={}
        className="w-1/2 max-w-sm h-screen p-8 flex flex-col"
      >
        <label for="default-input" class="block mb-3 text-sm font-medium">
          Logo Type
        </label>
        <div className="flex gap-4">
          {LogoTypes.map((type) => (
            <div
              className={`${ logoType === type ? "bg-gray-800 text-white" : "border border-gray-300 text-gray-900" } px-4 py-2 rounded-lg cursor-pointer`}
              onClick={() => setLogoType(type)}
            >
              {type}
            </div>
          ))}
        </div>

        <label for="default-input" class="block mt-6 mb-3 text-sm font-medium">
          Background Color
        </label>
        <div className="flex justify-between">
          {LogoBgColors.map((color) => (
            <div
              className="w-10 h-10 rounded-lg border-gray-300"
              style={{ backgroundColor: color }}
              onClick={() => setLogoBgColor(color)}
            ></div>
          ))}
        </div>

        <label for="default-input" class="block mt-6 mb-3 text-sm font-medium">
          Campus Code
        </label>
        <input
          type="text"
          id="campusCode"
          class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-muorange focus:border-muorange block w-full p-2.5"
          placeholder="Enter Campus Code"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="button self-end"
          class="text-white bg-muorange focus:ring-4 font-medium rounded-lg text-sm px-5 py-4"
        >
          Download
        </button>
      </form>
    </div>
  );
};

export default CampusLogoGenerator;
