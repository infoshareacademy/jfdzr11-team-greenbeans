import React from "react";
import styles from "../AboutUs/AboutUs.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const AboutUs = () => {
  return (
    <div className={styles.about_container}>
      <div className={styles.navbar_container}>
        <Navbar />
      </div>
      <div className={styles.text_container}>
        <h2 className={styles.quote1}>
            Probably the most visible example of unintended consequences, is
            what happens every time humans try to change the natural ecology of
            a place.
        </h2>
        <p className={styles.author1}>
          <b>- Margaret J. Wheatley</b>
        </p>
        <h2 className={styles.quote2}>
            The first law of ecology is that everything is related to everything
            else.
        </h2>
        <p className={styles.author2}>
          <b>- Barry Commoner</b>
        </p>
        <p className={styles.main_text}>
          These two quotas are very important to us. We have decided to create
          Green Hub, to help our mother Earth in recovery from years of
          pollution. We are small startup that launched in june 2023. Located in
          beautiful city of Gdansk, Poland. We put all of our passion and
          emotions into helping everyone in their small efforts that will chain
          into something bigger alltogether. Our idea was born, when we saw
          pollution of Baltic Sea and then we understood, that the problem is in
          global scale, not only our small one, local one.
        </p>
      </div>
      <div className={styles.footer_container}>
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
