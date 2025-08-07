import React, { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";

import styles from "./campusLogoGen.module.css";
import logoBlack from "./images/campuslogo/logo-black.svg";
import logoWhite from "./images/campuslogo/logo-white.svg";
import logoViolet from "./images/campuslogo/logo-violet.svg";
import logoBlue from "./images/campuslogo/logo-blue.svg";
import logoGradient from "./images/campuslogo/logo-gradient.svg";
import stripes from "./images/campuslogo/stripes.svg";

import HomeNav from "../../Common/HomeNav/HomeNav";
import Footer from "../../Common/Footer/Footer";

import yipLogoRed from "./images/yip_logo/yip-logo-red.svg";
import yipLogoBlack from "./images/yip_logo/yip-logo-black.svg";
import yipLogoDark from "./images/yip_logo/yip-logo-dark.svg";

const CampusLogoGenerator = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    document.title = "Campus Logo Generator";
    setLogoColor("#fefefe");
    
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      setBottomOffset(mobile ? "4rem" : "5.5rem");
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const domEl = useRef<HTMLDivElement>(null);

  const [campusCode, setCampusCode] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [logoType, setLogoType] = useState<"MuLearn" | "YIP">("MuLearn");
  const [muLogoVariant, setMuLogoVariant] = useState<"Profile Pic" | "Transparent Bg">("Profile Pic");
  const [yipLogoVariant, setYipLogoVariant] = useState<"Black" | "Red" | "Dark">("Black");
  const [logoColor, setLogoColor] = useState("#fefefe");
  const [logoBgColor, setLogoBgColor] = useState("#AF2EE6");
  const [logoFgVarient, setLogoFgVarient] = useState(logoWhite);
  const [fileType, setFileType] = useState<"PNG" | "SVG">("PNG");
  const [bottomOffset, setBottomOffset] = useState(window.innerWidth < 640 ? "4rem" : "5.5rem");
  const [isDownloading, setIsDownloading] = useState(false);

  const MAX_CHARS = 15;

  const logoTypes = ["MuLearn", "YIP"] as const;
  const muLogoVariants = ["Profile Pic", "Transparent Bg"] as const;
  const yipLogoVariants = ["Black", "Red", "Dark"] as const;
  const logoBgColors = ["#AF2EE6", "#2E85FE", "#252525"];
  const logoFgVarients = [
    { svg: logoWhite, color: "#fefefe" },
    { svg: logoBlue, color: "#3498db" },
    { svg: logoViolet, color: "#8e44ad" },
    { svg: logoGradient, color: "#810FFB" },
  ];
  const fileTypes = ["PNG", "SVG"];

  const yipLogoImages = {
    Black: yipLogoBlack,
    Red: yipLogoRed,
    Dark: yipLogoDark,
  };

  const yipLogoTextColors = {
    Black: "#262626",
    Red: "#FA5252",
    Dark: "#fefefe",
  };

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    if (value.length <= MAX_CHARS) {
      setCampusCode(value);
      setCharCount(value.length);
    }
  }

  const downloadImg = async () => {
    let dataUrl;

    if (!campusCode) return alert("Campus Code is required");
    if (!domEl.current) return alert("Logo element not found");

    setIsDownloading(true);

    try {
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
      const prefix = logoType === "MuLearn" ? "mulearn" : "yip";
      link.download = `${prefix}-campus-logo.${fileType.toLowerCase()}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error downloading image:", error);
      alert("Error downloading image. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <HomeNav />
      <div className="flex flex-col sm:flex-row min-h-screen bg-gray-100 " style={{ border: "2px solid #ccc", marginBottom: "-5rem" }}>
        <div className="flex justify-center items-center gap-8 sm:gap-16 w-full py-8 sm:py-6 px-4 sm:px-6 sm:h-screen border-b-2 sm:border-b-0 sm:border-r-2 bg-gradient-to-br from-gray-700 to-gray-900">
        {/* Square Display */}
        <div
          ref={domEl}
          className="relative overflow-hidden w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 flex justify-center shadow-lg"
          style={
            logoType === "MuLearn"
              ? muLogoVariant === "Transparent Bg"
                ? { backgroundColor: "#00000000", color: logoColor }
                : { backgroundColor: logoBgColor, color: "#fefefe" }
              : yipLogoVariant === "Dark"
              ? { backgroundColor: "#262626", color: "#fefefe" }
              : { backgroundColor: "#fefefe", color: "#000" }
          }
        >
          {logoType === "MuLearn" && muLogoVariant === "Profile Pic" && (
            <div className="absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden">
              <img
                alt="stripes background"
                src={stripes}
                className="min-w-full min-h-full w-full h-full object-fill"
                style={{ objectPosition: "center", transform: "scale(1.05)" }}
              />
            </div>
          )}
          
          <img
            src={
              logoType === "MuLearn"
                ? muLogoVariant === "Profile Pic"
                  ? logoFgVarient
                  : logoColor === "#fefefe"
                  ? logoFgVarient
                  : logoFgVarient
                : yipLogoImages[yipLogoVariant]
            }
            className={
              logoType === "MuLearn"
                ? "w-2/3 absolute top-1/2 transform -translate-y-1/2 z-10"
                : yipLogoVariant === "Dark"
                ? "ml-4 w-3/5 top-6 absolute"
                : "w-1/2 top-6 absolute"
            }
            alt="Logo"
          />

          <span
            className={
              logoType === "MuLearn"
                ? styles.campusCodeMulearn
                : styles.campusCodeYip
            }
            style={
              logoType === "YIP"
                ? {
                    color: yipLogoTextColors[yipLogoVariant],
                    fontFamily: "Nasa",
                    position: "absolute",
                    bottom: "1.5rem",
                    zIndex: 20
                  }
                : {
                    position: "absolute",
                    bottom: bottomOffset,
                    zIndex: 20
                  }
            }
          >
            {campusCode ? campusCode : "Campus"}
          </span>
        </div>

        {/* Round Display */}
        {(logoType === "YIP" || muLogoVariant === "Profile Pic") && (
          <div
            className="relative overflow-hidden hidden rounded-full w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:flex justify-center shadow-lg"
            style={
              logoType === "MuLearn"
                ? muLogoVariant === "Transparent Bg"
                  ? { backgroundColor: "#00000000", color: logoColor }
                  : { backgroundColor: logoBgColor, color: "#fefefe" }
                : yipLogoVariant === "Dark"
                ? { backgroundColor: "#262626", color: "#fefefe" }
                : { backgroundColor: "#fefefe", color: "#000" }
            }
          >
            {logoType === "MuLearn" && muLogoVariant === "Profile Pic" && (
              <div className="absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden rounded-full">
                <img
                  src={stripes}
                  alt="stripes background"
                  className="min-w-full min-h-full w-full h-full object-fill"
                  style={{ objectPosition: "center", transform: "scale(1.05)" }}
                />
              </div>
            )}
            
            <img
              src={
                logoType === "MuLearn"
                  ? muLogoVariant === "Profile Pic"
                    ? logoFgVarient
                    : logoColor === "#fefefe"
                    ? logoWhite
                    : logoBlack
                  : yipLogoImages[yipLogoVariant]
              }
              className={
                logoType === "MuLearn"
                  ? "w-2/3 absolute top-1/2 transform -translate-y-1/2 z-10"
                  : yipLogoVariant === "Dark"
                  ? "ml-4 w-3/5 top-6 absolute"
                  : "w-1/2 top-6 absolute"
              }
              alt="Logo"
            />
            <span
              className={
                logoType === "MuLearn"
                  ? styles.campusCodeMulearn
                  : styles.campusCodeYip
              }
              style={
                logoType === "YIP"
                  ? {
                      color: yipLogoTextColors[yipLogoVariant],
                      fontFamily: "Nasa",
                      position: "absolute",
                      bottom: "1.5rem",
                      zIndex: 20
                    }
                  : {
                      position: "absolute",
                      bottom: "5.5rem",
                      zIndex: 20
                    }
              }
            >
              {campusCode ? campusCode : "Campus"}
            </span>
          </div>
        )}
      </div>

      {/* Controls */}
      <form className="w-full sm:w-1/2 md:w-1/3 sm:max-w-lg sm:h-screen p-4 sm:p-6 sm:pl-10 lg:p-8 lg:pl-14 flex flex-col overflow-y-auto ">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5 text-gray-800 border-b pb-3">Logo Generator</h2>
        <label className="block mb-1.5 text-sm font-semibold text-gray-700 h-5">Campus Code</label>
        <input
          type="text"
          id="campusCode"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-muorange focus:border-muorange block w-full h-11 px-3 shadow-sm"
          style={{ paddingLeft: '1rem' }}
          placeholder="Enter Campus Code"
          value={campusCode}
          onChange={handleTextChange}
        />
        <span className="mb-4 mt-1 text-sm text-gray-500 self-end h-5">
          {charCount}/{MAX_CHARS}
        </span>

        <label className="block mb-1.5 text-sm font-semibold text-gray-700 h-5">Logo Type</label>
        <div className="flex gap-3 mb-5">
          {logoTypes.map((type) => (
            <div
              key={type}
              className={`${
                logoType === type
                  ? "text-white shadow-md"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-100"
              } px-4 h-10 rounded-lg cursor-pointer flex-1 font-medium transition-all duration-200 flex items-center justify-center text-center`}
              style={{
                backgroundColor: logoType === type ? "#456ff6" : "transparent"
              }}
              onClick={() => setLogoType(type as "MuLearn" | "YIP")}
            >
              {type}
            </div>
          ))}
        </div>

        <label className="block mb-1.5 text-sm font-semibold text-gray-700 h-5">Logo Variant</label>
        <div className="flex gap-2 mb-5">
          {logoType === "MuLearn" &&
            muLogoVariants.map((variant) => (
              <div
                key={variant}
                className={`${
                  muLogoVariant === variant
                    ? "text-white shadow-md"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                } px-3 h-10 rounded-lg cursor-pointer flex-1 font-medium transition-all duration-200 text-sm flex items-center justify-center`}
                style={{
                  backgroundColor: muLogoVariant === variant ? "#456ff6" : "transparent"
                }}
                onClick={() => setMuLogoVariant(variant as "Profile Pic" | "Transparent Bg")}
              >
                {variant}
              </div>
            ))}
          {logoType === "YIP" &&
            yipLogoVariants.map((variant) => (
              <div
                key={variant}
                className={`${
                  yipLogoVariant === variant
                    ? "text-white shadow-md"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                } px-3 h-10 rounded-lg cursor-pointer flex-1 font-medium transition-all duration-200 flex items-center justify-center`}
                style={{
                  backgroundColor: yipLogoVariant === variant ? "#456ff6" : "transparent"
                }}
                onClick={() => setYipLogoVariant(variant as "Black" | "Red" | "Dark")}
              >
                {variant}
              </div>
            ))}
        </div>

        {muLogoVariant === "Transparent Bg" && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-5 h-auto">
            <label className="block mb-3 text-sm font-semibold text-gray-700 h-5">Logo Color</label>
            <div className="flex justify-evenly">
              {logoFgVarients.map((varient) =>
                varient.svg !== logoGradient ? (
                  <div
                    key={varient.color}
                    className={`w-12 h-12 rounded-lg border-2 cursor-pointer transition-transform hover:scale-105 shadow-md ${logoFgVarient === varient.svg ? 'border-purple-500 ring-2 ring-purple-300 shadow-purple-200' : 'border-gray-300'}`}
                    style={{ backgroundColor: varient.color }}
                    onClick={() => setLogoFgVarient(varient.svg)}
                  ></div>
                ) : (
                  <div
                    key="gradient"
                    className={`w-12 h-12 rounded-lg border-2 cursor-pointer transition-transform hover:scale-105 shadow-md ${logoFgVarient === varient.svg ? 'border-purple-500 ring-2 ring-purple-300 shadow-purple-200' : 'border-gray-300'} overflow-hidden`}
                    onClick={() => setLogoFgVarient(varient.svg)}
                    style={{ 
                      background: 'linear-gradient(45deg, #8e44ad, #3498db, #AF2EE6, #810FFB)',
                      backgroundSize: '300% 300%',
                      animation: 'gradient-animation 4s ease infinite',
                      boxShadow: logoFgVarient === varient.svg ? '0 0 0 2px white, 0 0 0 4px #AF2EE6' : '0 0 0 1px rgba(0,0,0,0.1)',
                      border: logoFgVarient === varient.svg ? '2px solid #AF2EE6' : '2px solid transparent'
                    }}
                  ></div>
                )
              )}
            </div>
          </div>
        )}
        <br />  

        {logoType === "MuLearn" && muLogoVariant === "Profile Pic" && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-5">
            <label className="block mb-3 text-sm font-semibold text-gray-700 h-5">
              Foreground Color
            </label>
            <div className="flex justify-evenly mb-6 ">
              {logoFgVarients.map((varient) =>
                varient.svg !== logoGradient ? (
                  <div
                    key={varient.color}
                    className={`w-12 h-12 rounded-lg border-2 cursor-pointer transition-transform hover:scale-105 shadow-md ${logoFgVarient === varient.svg ? 'border-purple-500 ring-2 ring-purple-300 shadow-purple-200' : 'border-gray-300'}`}
                    style={{ backgroundColor: varient.color }}
                    onClick={() => setLogoFgVarient(varient.svg)}
                  ></div>
                ) : (
                  <div
                    key="gradient"
                    className={`w-12 h-12 rounded-lg border-2 cursor-pointer transition-transform hover:scale-105 shadow-md ${logoFgVarient === varient.svg ? 'border-purple-500 ring-2 ring-purple-300 shadow-purple-200' : 'border-gray-300'} overflow-hidden`}
                    onClick={() => setLogoFgVarient(varient.svg)}
                    style={{ 
                      background: 'linear-gradient(45deg, #8e44ad, #3498db, #AF2EE6, #810FFB)',
                      backgroundSize: '300% 300%',
                      animation: 'gradient-animation 4s ease infinite',
                      boxShadow: logoFgVarient === varient.svg ? '0 0 0 2px white, 0 0 0 4px #AF2EE6' : '0 0 0 1px rgba(0,0,0,0.1)',
                      border: logoFgVarient === varient.svg ? '2px solid #AF2EE6' : '2px solid transparent'
                    }}
                  ></div>
                )
              )}
            </div>
            <br />
            <label className="block mb-2 text-sm font-semibold text-gray-700 h-5">
              Background Color
            </label>
            <div className="flex justify-evenly">
              {logoBgColors.map((color) => (
                <div
                  key={color}
                  className={`w-12 h-12 rounded-lg border-2 cursor-pointer transition-transform hover:scale-105 shadow-md ${logoBgColor === color ? 'border-purple-500 ring-2 ring-purple-300 shadow-purple-200' : 'border-gray-300'}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setLogoBgColor(color)}
                ></div>
              ))}
            </div>
          </div>
        )}
      <br />
        <label className="block mb-1.5 text-sm font-semibold text-gray-700 h-5">File Type</label>
        <div className="flex gap-3 mb-6">
          {fileTypes.map((type) => (
            <div
              key={type}
              className={`${
                fileType === type
                  ? "text-white shadow-md"
                  : "border border-gray-300 text-gray-700 hover:bg_gray-100"
              } px-4 h-10 rounded-lg cursor-pointer flex-1 font-medium transition-all duration-200 flex items-center justify-center`}
              style={{
                backgroundColor: fileType === type ? "#456ff6" : "transparent"
              }}
              onClick={() => setFileType(type as "PNG" | "SVG")}
            >
              {type}
            </div>
          ))}
        </div>
        <br />
        <button
          type="button"
          className="text-white font-medium rounded-lg text-base px-6 py-3.5 h-14 shadow-lg transition-all duration-200 w-full sm:w-full mt-4 mb-4 sm:mb-8 z-10 relative overflow-hidden"
          style={{ backgroundColor: isDownloading ? '#6B7280' : '#456ff6' }}
          onClick={downloadImg}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Downloading...
            </div>
          ) : (
            "Download Logo"
          )}
        </button>
      </form>
    </div>
    <Footer />
    </>
  );
};

export default CampusLogoGenerator;
