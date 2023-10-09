import React from 'react'
import styles from './Pathway.module.css'
import Navbar from './components/Navbar/menubar'
import Mainpage from './components/HeroSection/mainpage'
import Whatispathway from './components/About/About'
import CourseOverview from './components/course Overview/CourseOverview'
import Whoshouldattend from './components/WhoShouldAttend/WhoShouldAttend'
import Contact from './components/contact/Contact'

export default function Pathway() {
    return (
        <>
            <Navbar />
            <Mainpage />
            <div className={styles.pathway}>
                <CourseOverview />
                <Whoshouldattend />
                <Whatispathway />
            </div>
            <Contact />
        </>
    )
}
