import React from "react";
import styles from "../Home/Home.module.css";
// import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.home_container}>
      <div className={styles.text_holder}>
        <h1>Hello friend!</h1>
        <h2>Its nice to meet You!</h2>
        <p> Lets help our planet!</p>
      </div>
      <div className={styles.button_holder}>
        <button className={styles.btns}>Articles</button>
        <button className={styles.btns}>Get points</button>
        <button className={styles.btns}>New ideas</button>
        <button className={styles.btns}>Prizes</button>
      </div>
      <div className={styles.image_holder}>
        <img src="https://st2.depositphotos.com/3647713/6958/i/600/depositphotos_69587953-stock-photo-green-beans-isolated.jpg" />
      </div>
    </div>
  );
};

export default Home;
