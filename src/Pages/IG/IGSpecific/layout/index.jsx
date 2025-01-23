import React, { useEffect, useState } from "react";
import ContentsMenu from "../components/menu";
import styles from "./index.module.css";
import Navbar from "../../../../Components/Navbar/Navbar";
import Footer from "../../../../Components/Footer/Footer";

import { useParams } from "react-router-dom";
import { webdev } from "../../data/web-dev";
import { datascience } from "../../data/datascience";
import { gamedev } from "../../data/gamedev";
import { devops } from "../../data/devops";
import { uiuxDesign } from "../../data/uiux";
import { cybersecurity } from "../../data/cybersecurity";
import { arVr } from "../../data/arvr";
import { hr } from "../../data/hr";
import { ai } from "../../data/ai";
import { digitalMarketing } from "../../data/digitalmarketing";
import { productManagement } from "../../data/productmanagement";
import { entrepreneurship } from "../../data/entrepreneurship";

import { iot } from "../../data/IoT";
import InterestGroupLandingPage from "../InterestGroupLandingPage";

const InterestGroupDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadData = () => {
      let selectedData;
      switch (id) {
        case "web-development":
          selectedData = webdev;
          break;
        case "data-science":
          selectedData = datascience;
          break;
        case "game-development":
          selectedData = gamedev;
          break;
        case "cloud-and-devops":
          selectedData = devops;
          break;
        case "internet-of-things":
          selectedData = iot;
          break;
        case "artificial-intelligence":
          selectedData = ai;
          break;
        case "cyber-security":
          selectedData = cybersecurity;
          break;
        case "ui-ux":
          selectedData = uiuxDesign;
          break;
        case "ar-vr":
          selectedData = arVr;
          break;
        case "human-resources":
          selectedData = hr;
          break;
        case "digital-marketing":
          selectedData = digitalMarketing;
          break;
        case "product-management":
          selectedData = productManagement;
          break;
        case "entrepreneurship":
          selectedData = entrepreneurship;
          break;
        default:
          selectedData = null;
      }

      setData(selectedData);

      if (selectedData?.communityPartners) {
        const imagePaths = selectedData.communityPartners.map(
          (partner) => partner.image
        );
        setImages(imagePaths);
      } else {
        setImages([]);
      }
    };

    loadData();
  }, [id]);

  return (
    <div className=" flex flex-col overflow-hidden w-screen">
      <Navbar />
      <div
      className={`${styles.roboto_font} lg:grid grid-cols-[18rem_1fr] bg-[rgba(255,255,255,1)]`}
    >
      <div className="fixed top-20 left-0 h-full w-64">
        <ContentsMenu data={data} />
      </div>
      <div className="col-start-2 w-full overflow-hidden">
        <InterestGroupLandingPage data={data} id={id} images={images} />
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default InterestGroupDetails;
