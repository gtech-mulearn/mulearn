import React from "react"
import styles from "menubar.module.css"
import img3 from "./assets/img3.webp";


const what_is_pathway = () => {
    return (
    <>
    <div class={Overview_container_head}>
        <hr>
        <p>What is Pathway</p>
        <hr>
    </div>
    <div class={WhatIsPathway_main}>
        <div class={WhatIsPathway_img}>
            <img src={img3.webp}>

        </div>
        <div class={WhatIsPathway_desc}>
            <P><span>Pathway</span> is an open framework for high-throughput and low-latency <span>real-time data processing</span>. It is used to create Python code which seamlessly combines <span>batch processing, streaming, and real-time API's</span> for LLM apps. Pathway's distributed runtime (🦀-🐍) provides <span>fresh results of your data pipelines</span> whenever new inputs and requests are received.</P>
            <br>
            <p>Pathway provides a high-level programming interface in Python for defining data transformations, aggregations, and other <span>operations on data streams</span>. With Pathway, you can effortlessly <span>design and deploy sophisticated data workflows</span> that efficiently handle high volumes of data in real time.</P>
        </div>

    </div>
    
</>
)
}

export default what_is_pathway
