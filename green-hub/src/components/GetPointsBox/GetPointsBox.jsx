import React from 'react'
import styles from "./GetPointsBox.module.css"
import useAuth from '../../context/AuthContext'
import Modal from 'react-modal'
import { useState } from 'react'
import { UseUserPoints } from "../Utils/UseUserPoints/UseUserPoints";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../config/firebase";

const GetPointsBox = ({icon, title, description, scaler, scale, isButton = true}) => {

  const [visible, setVisible] = useState(false);
  const [score, setScore] = useState(0)

  const { userPoints } = UseUserPoints();
  const {currentUser} = useAuth()

  // const result = userPoints + e.currentTarget.points.value

  const closeBox = () => {
    setVisible(false);
    setScore(0)
  }

  const updateUserPoints = async (e, id) => {
    e.preventDefault()
    const updatedPoints = Number(userPoints) + Number(score)*Number(scale)
    const docRef = doc(db, "users", id)
    
    try {
      await updateDoc(docRef, {points: updatedPoints})
      closeBox()
    }
    catch {
      console.log("nie udało się")
    }
  }

  return (
    <div className={styles.getpointsBox}>
          <div className={styles.img}>
            <img src={icon} />
          </div>
          <div className={styles.paragraph}>
            <p>{title}</p>
            <p>{description}</p>
            <p>{scaler}</p>
            <span>need more info? click here</span>
            <button><img src="../../../assets/images/page-points/about-us.png" /></button>
          </div>
          {isButton && <button disabled={!currentUser?.uid} onClick={() => {setVisible(true)}}>SUBMIT POINTS</button>}
          {!isButton && null}
          <Modal
        isOpen={visible}
        onRequestClose={closeBox}
        className={styles.info}
      >
        <button className={styles.cancel} onClick={closeBox}>✖</button>
        <img src="../../../assets/images/page-main/heart.png" className={styles.background}/>
        
        <h3>{title}</h3>
        <p>Please enter your score:</p>
        <form onSubmit={(e) => {updateUserPoints(e, currentUser.uid)}}>
          <div>
          <span>{scale} * </span><input type="number" name='points' id='points' defaultValue={0} onChange={(e) => {setScore(e.target.value); console.log(e.target.value)}}/><span> = {score*scale}</span>
          </div>
          
          <button>CONFIRM</button>
        </form>
        
               
      </Modal>
        </div>
  )
}

export default GetPointsBox