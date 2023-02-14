import React, { Fragment } from "react";
// import CareersCard from "../../Components/CareersCard/CareersCard";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Career.module.css";
import ClosedCareers from "../../Components/ClosedCareers/ClosedCareers";
import CareersCard from "../../Components/CareersCard/CareersCard";

import ClosedCarrersData from "./data/data";

// import Swiper core and required modules
import { Navigation, Pagination, Autoplay, Scrollbar, A11y, Keyboard, EffectCreative, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/effect-creative";
import "swiper/css/effect-coverflow";

const Career = () => {
  return (
    <Fragment>
      <Navbar />
      <main>
        <div className={styles.first__section}>
          <div className={styles.fstexts}>
            <p className={styles.fsheading}>
              µLearn <br />
              Career Labs.
            </p>
            <p className={styles.fstagline}>
              In search of a job opportunity / internship? µLearn Career Labs
              helps you connect with opportunities from the industry.
            </p>
          </div>
          <div className={styles.fsimage}>
            <img
              src="/assets/careers/fsimg.gif"
              className={styles.fsillustration}
              alt=""
            />
          </div>
        </div>

        <div className={styles.second_section_container}>
          <Swiper
            // install Swiper modules
            effect={"creative"}
            modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y, Keyboard, EffectCreative]}
            spaceBetween={50}
            // slidesPerView={2}
            navigation
            breakpoints={{
              400: {
                // width: 576,
                slidesPerView: 1,
              },
              1600: {
                // width: 768,
                slidesPerView: 2,
              },
            }}
            loop={true}
            grabCursor={true}
            pagination={{ clickable: true }}
            centeredSlides={true}
            keyboard={true}
            autoplay={{ delay: "8000" }}
          // scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
          >
            <SwiperSlide>
              <div className={styles.second_section_a}>
                <p className={styles.ssheading}>
                  <span className={styles.ssheadingspan}>Techfunic</span> Hiring Call
                </p>
                <p className={styles.sstagline}>
                  Techfunic envisions democratizing education, by providing small
                  group tutoring for children in the US in Math & Coding. We are
                  young, started in June 2020, growing strong and steady with a
                  customer base of 100+ parents and 1000+ classes to date, with a
                  positive revenue flow.
                </p>
                <div className={styles.opportunities}>
                  <CareersCard
                    title="Blockchain Tutor"
                    image="/assets/careers/techfunic_logo.png"
                    duration="Upto 1 year"
                    payment="300 INR/hour (Post completion of Training)"
                    location="Remote"
                    lastdate="10th February"
                    applylink=" https://airtable.com/shrH01GtdWTExjOrx"
                  />
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.second_section_a}>
                <p className={styles.ssheading}>
                  <span className={styles.ssheadingspan}>
                    Calicut Forum for Information Technology - CAFIT
                  </span>{" "}
                  Hiring Call
                </p>
                <p className={styles.sstagline}>
                  CafIT – Calicut forum for IT is a non profit organisation formed by
                  the IT professionals of Calicut to bring the companies under a
                  single umbrella and to promote the city as a viable destination for
                  IT and IT enabled services. The members consist of established
                  software houses from the city and malabar region, Kinfra IT park ,
                  Technology Business Incubator (NITC),Govt Cyberpark and UL
                  Cyberpark.
                </p>
                <div className={styles.opportunities}>
                  <Swiper
                    // install Swiper modules
                    effect={"coverflow"}
                    modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y, Keyboard, EffectCoverflow]}
                    spaceBetween={50}
                    slidesPerView={1}
                    // navigation
                    grabCursor={true}
                    centeredSlides={true}
                    coverflowEffect={{
                      shadow: false,
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    loop={true}
                    // pagination={{ clickable: true }}
                    keyboard={true}
                    autoplay={{ delay: "4000" }}
                  // scrollbar={{ draggable: true }}
                  // onSwiper={(swiper) => console.log(swiper)}
                  // onSlideChange={() => console.log('slide change')}
                  >
                    <SwiperSlide>
                      <CareersCard
                        title="Operations Intern"
                        image="/assets/careers/cafit_logo.jpg"
                        duration="2-3 months"
                        payment="Voluntary"
                        location="Remote"
                        lastdate="12th February"
                        applylink=""
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <CareersCard
                        title="Content Management Intern"
                        image="/assets/careers/cafit_logo.jpg"
                        duration="2-3 months"
                        payment="Voluntary"
                        location="Remote"
                        lastdate="12th February"
                        applylink=""
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.second_section_a}>
                <p className={styles.ssheading}>
                  <span className={styles.ssheadingspan}>
                    Citizen Digital Foundation
                  </span>{" "}
                  Hiring Call
                </p>
                <p className={styles.sstagline}>
                  Citizen Digital Foundation (CDF) is a pioneering non-profit
                  organization, providing knowledge solutions for Digital & Media
                  Literacy and Responsible Tech Innovation across sections of society,
                  business, and government.
                </p>
                <div className={styles.opportunities}>
                  <CareersCard
                    title="Fundraising Intern"
                    image="/assets/careers/cdf_logo.webp"
                    duration="2-3 months"
                    payment="Paid(Based on funds raised)"
                    location="Remote"
                    lastdate="21st February"
                    applylink="https://airtable.com/shrsPBZTpSUBzMVkY"
                  />
                </div>
              </div>
            </SwiperSlide>
            {/* <SwiperSlide>Slide 4</SwiperSlide> */}

          </Swiper>
          {/* <div className={styles.second_section_a}>
            <p className={styles.ssheading}>
              <span className={styles.ssheadingspan}>Techfunic</span> Hiring Call
            </p>
            <p className={styles.sstagline}>
              Techfunic envisions democratizing education, by providing small
              group tutoring for children in the US in Math & Coding. We are
              young, started in June 2020, growing strong and steady with a
              customer base of 100+ parents and 1000+ classes to date, with a
              positive revenue flow.
            </p>
            <div className={styles.opportunities}>
              <CareersCard
                title="Blockchain Tutor"
                image="/assets/careers/techfunic_logo.png"
                duration="Upto 1 year"
                payment="300 INR/hour (Post completion of Training)"
                location="Remote"
                lastdate="10th February"
                applylink=" https://airtable.com/shrH01GtdWTExjOrx"
              />
            </div>
          </div> */}

          {/* <div className={styles.second_section_a}>
            <p className={styles.ssheading}>
              <span className={styles.ssheadingspan}>
                Calicut Forum for Information Technology - CAFIT
              </span>{" "}
              Hiring Call
            </p>
            <p className={styles.sstagline}>
              CafIT – Calicut forum for IT is a non profit organisation formed by
              the IT professionals of Calicut to bring the companies under a
              single umbrella and to promote the city as a viable destination for
              IT and IT enabled services. The members consist of established
              software houses from the city and malabar region, Kinfra IT park ,
              Technology Business Incubator (NITC),Govt Cyberpark and UL
              Cyberpark.
            </p>
            <div className={styles.opportunities}>
              <CareersCard
                title="Operations Intern"
                image="/assets/careers/cafit_logo.jpg"
                duration="2-3 months"
                payment="Voluntary"
                location="Remote"
                lastdate="12th February"
                applylink=""
              />
              <CareersCard
                title="Content Management Intern"
                image="/assets/careers/cafit_logo.jpg"
                duration="2-3 months"
                payment="Voluntary"
                location="Remote"
                lastdate="12th February"
                applylink=""
              />
            </div>
          </div> */}

          {/* <div className={styles.second_section_a}>
            <p className={styles.ssheading}>
              <span className={styles.ssheadingspan}>
                Citizen Digital Foundation
              </span>{" "}
              Hiring Call
            </p>
            <p className={styles.sstagline}>
              Citizen Digital Foundation (CDF) is a pioneering non-profit
              organization, providing knowledge solutions for Digital & Media
              Literacy and Responsible Tech Innovation across sections of society,
              business, and government.
            </p>
            <div className={styles.opportunities}>
              <CareersCard
                title="Fundraising Intern"
                image="/assets/careers/cdf_logo.webp"
                duration="2-3 months"
                payment="Paid(Based on funds raised)"
                location="Remote"
                lastdate="21st February"
                applylink="https://airtable.com/shrsPBZTpSUBzMVkY"
              />
            </div>
          </div> */}

          <div className={styles.closedcareerscontainer}>
            <div className={styles.second_section}>
              <p className={styles.ssheading}>Previous Hiring Calls</p>

              <Swiper
                // effect={"creative"}
                modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y, Keyboard, EffectCreative]}
                spaceBetween={50}
                // slidesPerView={3}
                navigation
                grabCursor={true}
                centeredSlides={true}
                breakpoints={{
                  400: {
                    // width: 576,
                    slidesPerView: 1,
                  },
                  1300: {
                    // width: 768,
                    slidesPerView: 3,
                  },
                }}

                loop={true}
                pagination={{ clickable: true }}
                keyboard={true}
                autoplay={{ delay: "8000" }}
              // scrollbar={{ draggable: true }}
              // onSwiper={(swiper) => console.log(swiper)}
              // onSlideChange={() => console.log('slide change')}
              >
                <div className={styles.opportunities}>
                  {ClosedCarrersData.map((data) => (
                    <SwiperSlide>
                      <ClosedCareers
                        company={data.Company}
                        title={data.Title}
                        duration={data.Duration}
                        payment={data.Stipend || data.Package}
                        criteria={data.Qualifications && data.Qualifications[0]}
                        date={data.date}
                        roles={data.Roles}
                        jdlink={data.poster}
                        location={data.location}
                      />
                    </SwiperSlide>
                  ))}
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Career;
