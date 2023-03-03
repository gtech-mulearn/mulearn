import React, { useRef, useState } from "react";
import LogoBgColors from "./LogoBgColors.json";

const CampusLogoGenerator = () => {
  const canvasRef = useRef(null);
  const [logoBgColor, setLogoBgColor] = useState("#000000");
  const [text, setText] = useState("");

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = logoBgColor;
    // Change the color of the logo here
    context.fillText(text, 50, 50);
    // Add the text to the canvas here
    const dataURL = canvas.toDataURL();
    // Use the data URL to display or download the final image
  }

  return (
    <div className="flex">
      <div className="w-full h-screen p-8 border-r-2">
        <canvas
          ref={canvasRef}
          width={window.innerHeight / 2}
          height={window.innerHeight / 2}
          className="border-2 border-gray-300 m-auto"
          style={{ backgroundColor: logoBgColor }}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 max-w-sm h-screen p-8 flex flex-col"
      >
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
          ))
            }
        </div>
        
        <label for="default-input" class="block mt-6 mb-3 text-sm font-medium">
          Campus Code
        </label>
        <input
          type="text"
          id="campusCode"
          class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-muorange focus:border-muorange block w-full p-2.5"
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
