import React from 'react'
import styles from "./Pathway.module.css"
import Navbar from './components/menuBar/menubar'
import Mainpage from './components/mainpage/mainpage'
import Whatispathway from './components/what_is_pathway/what_is_pathway'
import CourseOverview from './components/course Overview/CourseOverview'
import Whoshouldattend from './components/WhoShouldAttend/WhoShouldAttend'
import Contact from './components/contact/Contact'

export default function Pathway() {
    return (
        <div className={styles.pathway}>
            <Navbar />
            <Mainpage />
            <CourseOverview />
            <Whoshouldattend />
            <Whatispathway />
            <Contact />
        </div>
    )
}
