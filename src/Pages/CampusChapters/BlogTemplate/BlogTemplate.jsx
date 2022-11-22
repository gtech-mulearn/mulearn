import React from 'react'
import styles from "./blog.module.css"
// import banner from "./assets/Banner.png"
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'

function BlogTemplate(props) {
    return (
        <>
            <Navbar />
            <div className={styles.blog_container}>
                <img className={styles.img} src={props.img} alt="banner" />
                <p className="blog">
                    {props.paragraph}
                    {props.quote ? <p className={styles.quote}>
                        {props.quote}
                        <br /><br />
                        <p className={styles.quote_name}>- {props.quote_name}</p>
                    </p> : null}
                </p>
            </div>
            <Footer />
        </>
    )
}

export default BlogTemplate