import React from "react"
import styles from "./mainpage.module.css"
import img2 from "./assets/img2.webp";
import img1 from "./assets/img1.png";
const Contact = () => {
    return (
    <>
    <section class={First}>
        <div class={Container}>
            <div class={Container_image_one}>
                <img src={img2} alt="" srcset="">
            </div>
            <div class={Container_desc}>
            <div class={Container_head}>
                <p class={Head_one}>Breaking into</p>
                <p class={Head_two}>Artificial<br>Intelligence</p>

            </div>
            <div class={Container_img_two}>
                <img src={img1}>
            </div>
            <div class={Container_button}>
                <button class={Container_button_one}>Pre apply</button>
                <button class={Container_button_two}>Explore Beta</button>

            </div>
            </div>
        </div>
        <div class={Lower_desc}>
            <p class={desc}>Join us on an exciting adventure into the world of<span> Artificial Intelligence (AI) </span>through our collaborative</p>
            <p class={desc}>initiative with Pathway. In this comprehensive course. </p>
        </div>
    </section>
    <div class={Lower_red}><p>Only<span> 20 INDIVIDUALS</span> will be selected for the<span> BETA COHORT</span>, while the remaining applicants will be placed on a waiting list.</p></div>
    
    
</>
)
}

export default mainpage
