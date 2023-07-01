import React from "react";
import styles from "./PrizesBox.module.css";
import useAuth from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import { useState } from "react";

const PrizesBox = ({ logo, prize, points, shop}) => {

  const [visible, setVisible] = useState(false);

  function closeBox() {
    setVisible(false);
  }

  const userPoints = 600;
  const {currentUser} = useAuth()

  return (
    <>
      {currentUser && userPoints >= points ? (
        <>
        <button className={styles.box} onClick={() => {setVisible(true)}}>
          <img src={logo} />
          <span>{prize}</span>
          <span className={styles.points}>{points} points</span>
        </button>
        <Modal
        isOpen={visible}
        onRequestClose={closeBox}
        className={styles.info}
      >
        <button className={styles.cancel} onClick={closeBox}>✖</button>
        <img src="../../../assets/images/page-main/trophy.png" />
        
        <h3>{prize} {shop}</h3>
        <p>points: {points}</p>
        <div>
        <p>activate your prize here: </p>
        <button>ACTIVATE</button>
        </div>
        
        {/* <p>{uuidv4()}</p> */}
        
      </Modal>
      </>
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
