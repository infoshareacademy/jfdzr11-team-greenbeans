import React from "react";
import styles from "./PrizesBox.module.css";
import useAuth from "../../context/AuthContext";

const PrizesBox = ({ logo, prize, points,getPrize }) => {

  const userPoints = 600;
  const {currentUser} = useAuth()

  return (
    <>
      {currentUser && userPoints >= points ? (
        <button className={styles.box} onClick={getPrize}>
          <img src={logo} />
          <span>{prize}</span>
          <span className={styles.points}>{points} points</span>
        </button>
      ) : (
        <button className={`${styles.box} ${styles.disabled}`}>
          <img src="../../../assets/images/page-prize/lock.png" className={styles.lock} />
          <img src={logo} />
          <span>{prize}</span>
          <span className={styles.points}>{points} points</span>
        </button>
      )}
    </>
  );
};

export default PrizesBox;
