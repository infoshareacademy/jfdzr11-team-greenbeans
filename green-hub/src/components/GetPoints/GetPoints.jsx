import React from "react";
import styles from "./GetPoints.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import GetPointsBox from "../GetPointsBox/GetPointsBox";
import data from "./GetPointsData.json"

const GetPoints = () => {
  return (
    <div className={styles.getpoints}>
      <Navbar />
      <main>
        <h1>points</h1>
        <p>everything in your hands! let's make a change!</p>
        {data.map((points, index) => {
          return (
            <GetPointsBox 
          key={index}
          icon={points.icon}
          title={points.title}
          description={points.descritpion}
          scaler={points.scaler}
          scale={points.scale}
          isButton={points.isButton}/>
          )
        })}
      </main>
      <Footer/>
    </div>
  );
};

export default GetPoints;
