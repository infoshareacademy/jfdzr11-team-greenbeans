import React from 'react'
import styles from "./GetPointsBox.module.css"

const GetPointsBox = ({icon, title, description, scaler, isButton = true}) => {
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
          {isButton && <button>SUBMIT POINTS</button>}
          {!isButton && null}
        </div>
  )
}

export default GetPointsBox