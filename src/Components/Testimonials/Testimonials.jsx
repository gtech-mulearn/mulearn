import React from "react";
import Card from "./Card";
import people from "./testimonials-data.json";
import styles from "./testimonial.module.css";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Marquee from "react-fast-marquee";

const Testimonails = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3.5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 500 },
      items: 2.5,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  };
  // function moveBack() {

  // }
  // function moveForward() {

  // }
  return (
    <>
      <div className={styles.tv_texts}>
        <p className={styles.tv_mainheading}>
          µLearn <span>Testimonials</span>
        </p>

        <p className={styles.tv_tagline}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod velit
          cupiditate atque nisi laudantium? Iure.
        </p>
      </div>
      <div className="py-5 bg-[#f7f3f3]">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1500}
          transitionDuration={1500}
        >
          {people.map((person) => (
            <Card person={person} />
          ))}
        </Carousel>
      </div>
    </>
  );
};
export default Testimonails;
