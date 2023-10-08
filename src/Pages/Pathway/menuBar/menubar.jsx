import React from "react"
import styles from "menubar.module.css"
import img4 from "./assets/logo.webp";


const Contact = () => {
    return (
    <>
    <div class={menu_bar}>
        <div class={logo}>
            <img src={logo}>
        </div>
        <div class={menu}>
            <ul>
                <li>Home</li>
                <li>Course Overview</li>
                <li>Who Should Attend?</li>
                <li>About Pathway</li>
            </ul>
        </div>
        <div class={pre_rg}><button>Pre Register</button></div>
    </div>
    
</>
)
}

export default menuebar

