import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import styles from "./Courses.module.css"


const Courses = () => {
  return (
    <>
    <Navbar/>
    <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>µLearn Courses</span>
              </p>
              <p className={styles.fv_tagline}>
                There are multiple opportunities around you right now. All you
                have to do is look out for the best one that suits you as well
                as your passion and skills.
              </p>
            </div>
            <div className={styles.fv_images}>
              <img src='assets/courses/fvimg.gif' alt="" className={styles.fv_img} />
            </div>
          </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Courses