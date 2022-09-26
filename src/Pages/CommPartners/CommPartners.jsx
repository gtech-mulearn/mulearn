import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./CommPartners.module.css";

import partners from "./data/partners";
import events from "./data/events";

import fvimg from "./assets/fvimg.gif";
import asap from "./assets/partners/asap.png";
import blockchain from "./assets/partners/blockchain.png";
import foxlab from "./assets/partners/foxlab.png";
import ieee from "./assets/partners/ieee.png";
import kites from "./assets/partners/kites.png";
import pygrammers from "./assets/partners/pygrammers.png";
import xtrudar from "./assets/partners/xtrudar.png";
import ksum from "./assets/partners/ksum.png";
import kdisc from "./assets/partners/kdisc.png";
import ether_logo from "./assets/partners/ether_logo.png";
import productpack from "./assets/partners/productpack.png";
import kuttycoders from "./assets/partners/kuttycoders.jpeg";

const CommunityPartner = () => {
  return (
    <>
      <Navbar />
      <div className={styles.mmain_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>µLearn Community</span> Partners
              </p>
              <p className={styles.fv_tagline}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
                laborum vitae obcaecati vero excepturi recusandae placeat
                dolorum hic sequi dolorem.
              </p>
            </div>
            <div className={styles.fv_images}>
              <img src={fvimg} alt="" className={styles.fv_img} />
            </div>
          </div>
        </div>
		<div className={styles.supportsviewmain_container}>
        <div className={styles.supportersview_container}>
          <p className={styles.supporter_heading}>
            Community Partners at <span>µLearn.</span>{" "}
          </p>
          <div className={styles.supporters}>
            <a
              href="https://kdisc.kerala.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={kdisc} alt="" className={styles.supporter} />
            </a>
            <a
              href="https://iedc.startupmission.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ksum} alt="" className={styles.supporter} />
            </a>
            <a
              href="https://asapkerala.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={asap} alt="" className={styles.supporter} />
            </a>
            <a
              href="https://ieeekerala.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ieee} alt="" className={styles.supporter} />
            </a>
            <a href="https://kba.ai/" target="_blank" rel="noopener noreferrer">
              <img src={blockchain} alt="" className={styles.supporter} />
            </a>
            <a
              href="https://kitesfoundation.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={kites} alt="" className={styles.supporter} />
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              {" "}
              <img src={foxlab} alt="" className={styles.supporter} />
            </a>
            <a
              href="https://etherindia.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ether_logo} alt="ether" className={styles.supporter} />
            </a>
            <a
              href="http://pygrammers.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={pygrammers} alt="" className={styles.supporter} />
            </a>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              {" "}
              <img src={xtrudar} alt="" className={styles.supporter} />
            </a>
            <a
              href="https://www.productpack.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={productpack}
                alt="product pack"
                className={styles.supporter}
              />
            </a>
            <a
              href="https://kuttycoders.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={kuttycoders}
                alt="Kutty Coders"
                className={styles.supporter}
              />
            </a>
          </div>
        </div>
      </div>
        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.sv_cards_container}>
			{partners.slice(0)
                .map((cp) => (
                  <div className={styles.tv_cards}>
                    <div className={styles.tcard}>
                      <img src={cp.image} alt="" className={styles.tcard_img} />
                      <p className={styles.tcard_name}>{cp.partnerName}</p>

                      <p className={styles.tcard_description}>
                        {cp.description.substring(0, 250)}{" "}
                        {cp.description.length >= 20 && "..."}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                Community <span>Events</span>
              </p>
              <p className={styles.sv_tagline}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                ratione ducimus repellat dignissimos cum officiis?
              </p>
            </div>
            <div className={styles.tv_cards_container}>
            {events.slice(0)
                .map((cp) => (
                  <div className={styles.tv_cards}>
                    <div className={styles.tcard}>
                      <img src={cp.image} alt="" className={styles.tcard_img} />
                      <p className={styles.tcard_name}>{cp.partnerName}</p>

                      <p className={styles.tcard_description}>
                        {cp.description.substring(0, 250)}{" "}
                        {cp.description.length >= 20 && "..."}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommunityPartner;
