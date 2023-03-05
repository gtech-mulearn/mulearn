import React, { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";

import styles from "./campusLogoGen.module.css";
import logoBlack from "../../images/campuslogo/logo-black.svg";
import logoWhite from "../../images/campuslogo/logo-white.svg";
import stripes from "../../images/campuslogo/stripes.svg";

const CampusLogoGenerator = () => {
  const domEl = useRef(null);

  const [campusCode, setCampusCode] = useState("");
  const [logoType, setLogoType] = useState("Profile Pic");
  const [logoColor, setLogoColor] = useState("#ffffff");
  const [logoBgColor, setLogoBgColor] = useState("#f5365c");
  const [fileType, setFileType] = useState("PNG");

  const logoTypes = ["Profile Pic", "Transparent Bg"];
  const logoColors = ["#ffffff", "#000000"];
  const logoBgColors = ["#f5365c", "#172b4d", "#fb6340", "#12bbda", "#5e72e4"];
  const fileTypes = ["PNG", "SVG"];

  const downloadImg = async () => {
    let dataUrl;

    if (!campusCode) return alert("Campus Code is required");

    switch (fileType) {
      case "PNG":
        dataUrl = await htmlToImage.toPng(domEl.current);
        break;
      case "SVG":
        dataUrl = await htmlToImage.toSvg(domEl.current);
        break;
      default:
        dataUrl = await htmlToImage.toPng(domEl.current);
    }

    const link = document.createElement("a");
    link.download = `campus-logo.${fileType.toLowerCase()}`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="flex">
      <div className="flex justify-center items-center gap-24 w-full h-screen p-8 border-r-2 bg-gray-500">
        {/* Square Display */}
        <div
          ref={domEl}
          className="relative w-80 h-80 flex justify-center"
          style={
            logoType === "Transparent Bg"
              ? { backgroundColor: "#00000000", color: logoColor }
              : { backgroundColor: logoBgColor, color: "#ffffff" }
          }
        >
          <img
            src={
              logoType === "Profile Pic"
                ? logoWhite
                : logoColor == "#ffffff"
                ? logoWhite
                : logoBlack
            }
            className="w-2/3"
            alt="Logo"
          />

          {logoType === "Profile Pic" && (
            <img src={stripes} className="absolute w-full h-full" />
          )}

          <span id={styles.campusCode} className="absolute text-2xl">
            {campusCode ? campusCode : "Campus Code"}
          </span>
        </div>

        {/* Round Display */}
        {logoType === "Profile Pic" && (
          <div
            className="relative rounded-full w-80 h-80 flex justify-center"
            style={
              logoType === "Transparent Bg"
                ? { backgroundColor: "#00000000", color: logoColor }
                : { backgroundColor: logoBgColor, color: "#ffffff" }
            }
          >
            <img
              src={
                logoType === "Profile Pic"
                  ? logoWhite
                  : logoColor == "#ffffff"
                  ? logoWhite
                  : logoBlack
              }
              className="w-2/3"
              alt="Logo"
            />

            <img
              src={stripes}
              className="absolute w-full h-full rounded-full"
            />
            <span id={styles.campusCode} className="absolute text-2xl">
              {campusCode ? campusCode : "Campus Code"}
            </span>
          </div>
        )}
        
      </div>
      <form className="w-1/2 max-w-sm h-screen p-8 flex flex-col">
        <label class="block mb-3 text-sm font-medium">Campus Code</label>
        <input
          type="text"
          id="campusCode"
          class="mb-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-muorange focus:border-muorange block w-full p-2.5"
          placeholder="Enter Campus Code"
          value={campusCode}
          onChange={(e) => setCampusCode(e.target.value)}
        />
        <label class="block mb-3 text-sm font-medium">Logo Type</label>
        <div className="flex gap-4 mb-8">
          {logoTypes.map((type) => (
            <div
              className={`${
                logoType === type
                  ? "bg-gray-800 text-white"
                  : "border border-gray-300 text-gray-900"
              } px-4 py-2 rounded-lg cursor-pointer`}
              onClick={() => setLogoType(type)}
            >
              {type}
            </div>
          ))}
        </div>
        {logoType === "Transparent Bg" && (
          <>
            <label class="block mb-3 text-sm font-medium">Logo Color</label>
            <div className="flex mb-8 gap-4">
              {logoColors.map((color) => (
                <div
                  className="w-10 h-10 rounded-lg border border-gray-400"
                  style={{ backgroundColor: color }}
                  onClick={() => setLogoColor(color)}
                ></div>
              ))}
            </div>
          </>
        )}

        {logoType === "Profile Pic" && (
          <>
            <label class="block mb-3 text-sm font-medium">
              Background Color
            </label>
            <div className="flex justify-between mb-8">
              {logoBgColors.map((color) => (
                <div
                  className="w-10 h-10 rounded-lg border-gray-300"
                  style={{ backgroundColor: color }}
                  onClick={() => setLogoBgColor(color)}
                ></div>
              ))}
            </div>
          </>
        )}

        <label class="block mb-3 text-sm font-medium">File Type</label>
        <div className="flex gap-4 mb-8">
          {fileTypes.map((type) => (
            <div
              className={`${
                fileType === type
                  ? "bg-gray-800 text-white"
                  : "border border-gray-300 text-gray-900"
              } px-4 py-2 rounded-lg cursor-pointer`}
              onClick={() => setFileType(type)}
            >
              {type}
            </div>
          ))}
        </div>
        <button
          type="button"
          class="text-white bg-muorange focus:ring-4 font-medium rounded-lg text-sm px-5 py-4"
          onClick={downloadImg}
        >
          Download
        </button>
      </form>
    </div>
  );
};

export default CampusLogoGenerator;
