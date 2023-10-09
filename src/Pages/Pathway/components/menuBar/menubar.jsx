import React from "react"
import styles from './menubar.module.css'
import img4 from "./assets/logo.webp";
import pre from './assets/pre.png'

export default function menubar() {
    return (
        <div class={styles.menu_bar}>
            <div class={styles.logo}>
                <a href="#"><img src={img4} /></a>
            </div>
            <div class={styles.menu}>
                <a href="#">Home</a>
                <a href="#">Course Overview</a>
                <a href="#">Who Should Attend?</a>
                <a href="#">About Pathway</a>
            </div>
            <div class={styles.pre_rg}>
                <a href="#">
                    <img src={pre} alt="" />
                    Pre-register
                </a>
            </div>
        </div>
    )
}

