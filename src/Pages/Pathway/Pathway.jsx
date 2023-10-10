import React from 'react'
import styles from './Pathway.module.css'
import Whatispathway from './components/About/About'
import Mainpage from "./components/HeroSection/Mainpage"
import CourseOverview from './components/CourseOverview/CourseOverview'
import Whoshouldattend from './components/WhoShouldAttend/WhoShouldAttend'
import Contact from './components/Contact/Contact'
import Menubar from './components/Menubar/Menubar'

export default function Pathway() {
    return (
        <>
            <Menubar />
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
