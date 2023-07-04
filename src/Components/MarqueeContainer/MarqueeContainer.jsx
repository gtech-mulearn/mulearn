import React from 'react'
import styles from './MaruqeeContainer.module.css'

import Marquee from "react-fast-marquee";

export default function MarqueeContainer(props) {
  
  const marqueeChildren = [
    {
      text:'Click now to register for the BEYOND US HACKATHON!',
      link:'https://harmless-editorial-5d7.notion.site/Beyond-Us-65c490bd2a1c4de1a3250eaf90c33412#03057d834cea436e99c7a6dc944f2b4b'
    },
  ]
  
  return (
    <Marquee
      className={styles.Container}
      pauseOnHover = {true}
      direction={props.direction}
    >
      {marqueeChildren.map(
        (child)=>
          <a 
          href={child.link}
          className={styles.anchor}
          >
            {child.text}
          </a>
        )
      }
    </Marquee>
  )
}
