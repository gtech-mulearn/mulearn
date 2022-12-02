import React from "react";
import Card from "./Card";
import people from "./testimonials-data.json"
import Style from "./testimonial.module.css";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Marquee from "react-fast-marquee";

const Testimonails = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3.5
        },
        tablet: {
            breakpoint: { max: 1024, min: 500 },
            items: 2.5
        },
        mobile: {
            breakpoint: { max: 500, min: 0 },
            items: 1
        }
    };
    // function moveBack() {

    // }
    // function moveForward() {

    // }
    return (
        <>

            <h1 className={Style.head}>Testimonials</h1>
            <div className="py-5 bg-[#f7f3f3]">
                <Carousel responsive={responsive} infinite={true} autoPlay={true} autoPlaySpeed={1500} transitionDuration={1500} >
                    {people.map((person) => <Card person={person} />)}
                </Carousel>
            </div>
            {/* <div className={`${Style.box}`} >
                <div className={`${Style.navigate} left-0 active:scale-[0.95]`} onClick={() => moveBack()} >
                    <ion-icon name="chevron-back-circle" /></div> */}
            {/* <Marquee gradient={false} speed={20}>
                    {people.map((person) => <Card person={person} />)}
                </Marquee> */}
            {/* <div className={`${Style.testimonialOne} `} >
                    <div className={`${Style.testimonialTwo}`} id="#testimonials333" onMouseEnter={(e) => {
                        e.style.animationPlayState = "paused"
                    }} onMouseLeave={(e) => e.style.animationPlayState = "running"} onClick={(e) => console.log("payt")}>
                        {people.map((person) => <Card person={person} />)}
                        {people.map((person) => <Card person={person} />)}
                    </div>
                </div> */}

            {/* <div className={`${Style.navigate} right-0 active:scale-[0.95]`} onClick={() => moveForward()}>
                    <ion-icon name="chevron-forward-circle" />
                </div>
            </div> */}
        </>
    );
};
export default Testimonails