import React from "react";
import { Card } from "./Card";
import Marquee from "react-fast-marquee";
import Style from "./testimonial.module.css";

export const Testimonail = () => {
  return (
    <div className={`${Style.box} center`}>
      <Marquee speed={50} pauseOnHover={true}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Marquee>
    </div>
  );
};
