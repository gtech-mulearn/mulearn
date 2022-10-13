import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Gallery.module.css";
import kakt from "./Kk.module.css";

import fvimg from "./assets/fvimg.png";

const Newgallery = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Welcome to <span>µLearn </span> Gallery
              </p>
              <p className={styles.fv_tagline}>
                Welcome, to µLearn Gallery, Listed below are the key pictures of
                various milestones accomplished by µLearn in the past one year.
                Together, we learned and witnessed a lot of things and going
                back and taking a look at those wonderful memories again is a
                always something special!.{" "}
              </p>
            </div>
            <div className={styles.fv_images}>
              <img src={fvimg} alt="" className={styles.fv_img} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.second_view_container}>
        <div className={styles.second_view}>
          <div className={styles.sv_texts}>
            <p className={styles.sv_heading}>
              <span>µLearn</span> Community Event Gallery.
            </p>
            <p className={styles.sv_tagline}>
              Beautiful memories often need to be documented, so that you could
              revisit them. These are some of the pictures from our events.
            </p>
          </div>
        </div>
      </div>

      <section className={kakt.gallerySection}>
        {/* <h2 className={kakt.galleryHeading}>Gallery</h2> */}

        <div className={kakt.row}>
          <div className={kakt.column}>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1-5eAtkEWG8ERms-QbYf595dgOyut3ugR"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1aF7AfZfzch3MOfkbdoDiPJ7MqQlc0fIE"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1aa5OxeKsmHevobh6-eS1eHDc6Dcr1ab7"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1vTpReQlDvsdx55b7WnZ4OvSQccBQTwYo"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
          </div>
          <div className={kakt.column}>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1kB5YF1FNn8wQ0mK8t0ouGaztbsIXRaNa"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=11cOAIlrF-Fus5hPSpV6EVKV7pWra5EBL"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=172f3v2CII42uRMEzSJrmwHrtvT0TA1fF"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1_Xlzj62DXhSu9AiLRUvwQZoNTtIeLhDu"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
          </div>

          <div className={kakt.column}>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1mGdayhcAkqMJ6FLVohv92PEjvwfcCBK7"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1SOVGZcQt6Q5GUhLn04IcUOSUfV62Atr_"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1cX-juHiiHQtdhiv7kOEjpyEOA5WPtupD"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
          </div>

          <div className={kakt.column}>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1M2ny3i6BGZyibn0IuA3d7D4--FGcSNQS"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1AcmXBbHUO9A4L6tqsLPPtYt-K2vnMFIi"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1GW75rGpzP5MsWYe_q_ce0uBUkIAsxW7X"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
            <div className={kakt.img_wrapper}>
              <img
                src="https://drive.google.com/uc?export=view&id=1Q2fbYUFDRCvHHbBmNMxNkDuYNdmkitqq"
                alt=""
                className={kakt.gallery_img}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newgallery;
