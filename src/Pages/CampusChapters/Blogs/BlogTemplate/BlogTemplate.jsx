import React, { useEffect } from "react";
import styles from "./blog.module.css";
import { useParams } from "react-router-dom";
import Navbar from "../../../../Components/Navbar/Navbar";
import Footer from "../../../../Components/Footer/Footer";

function BlogTemplate() {
  const data = require("../data/data.json");
  let { id } = useParams();
  console.log(data);
  const blogdata = data[id];
  console.log(blogdata);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Navbar />
      <div className={styles.blog_container}>
        <img className={styles.img} src={blogdata[0].img} alt="banner" />
        <p className="blog">
          {blogdata[0].paragraph1 && blogdata[0].paragraph1}
          <br />
          <br />
          {blogdata[0].paragraph2 && blogdata[0].paragraph2}
          <br />
          <br />
          {blogdata[0].paragraph3 && blogdata[0].paragraph3}
          <br />
          <br />
          {blogdata[0].paragraph4 && blogdata[0].paragraph4}
          <br />
          <br />
          {blogdata[0].paragraph5 && blogdata[0].paragraph5}
          <br />
          <br />
          {blogdata[0].quote ? (
            <p className={styles.quote}>
              {blogdata[0].quote}
              <br />
              <br />
              <p className={styles.quote_name}>- {blogdata[0].quote_name}</p>
            </p>
          ) : null}
        </p>
      </div>
      <Footer />
    </>
  );
}

export default BlogTemplate;
