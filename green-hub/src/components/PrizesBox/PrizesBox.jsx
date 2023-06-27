import React from "react";
import styles from "./PrizesBox.module.css";

const PrizesBox = ({ logo, prize, points, value }) => {
  const userPoints = 600;

  return (
    <>
      {userPoints >= value ? (
        <button className={styles.box}>
          <img src={logo} />
          <span>{prize}</span>
          <span className={styles.points}>{points}</span>
        </button>
      ) : (
        <button className={`${styles.box} ${styles.disabled}`}>
          <img src="../../../assets/images/page-prize/lock.png" className={styles.lock} />
          <img src={logo} />
          <span>{prize}</span>
          <span className={styles.points}>{points}</span>
        </button>
      )}
    </>
  );
};

export default PrizesBox;
