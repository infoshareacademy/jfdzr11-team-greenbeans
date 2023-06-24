import React from "react";
import styles from "../Home/Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.home_container}>
      <div className={styles.login_holder}>
        <Link to="/login">
          <button className={styles.loginbtn}>Login</button>
        </Link>
        <Link to="/register">
          <button className={styles.loginbtn}>Register</button>
        </Link>
      </div>
      <div className={styles.text_holder}>
        <h1>Hello friend!</h1>
        <h2>Its nice to meet You!</h2>
        <p> Lets help our planet!</p>
      </div>
      <div className={styles.button_holder}>
        <Link to="/articles">
          <button className={styles.btns}>Articles</button>
        </Link>
        <Link to="getpoints">
          <button className={styles.btns}>Get points</button>
        </Link>
        <Link to="newideas">
          <button className={styles.btns}>New ideas</button>
        </Link>
        <Link to="/prizes">
          <button className={styles.btns}>Prizes</button>
        </Link>
      </div>
      <div className={styles.image_holder}>
        <img src="https://st2.depositphotos.com/3647713/6958/i/600/depositphotos_69587953-stock-photo-green-beans-isolated.jpg" />
      </div>
    </div>
  );
};

export default Home;
