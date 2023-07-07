import styles from "../Home/Home.module.css";
import { Link } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import copywriting from "../../../assets/images/page-main/copywriting.png";
import heart from "../../../assets/images/page-main/heart.png";
import idea from "../../../assets/images/page-main/idea.png";
import trophy from "../../../assets/images/page-main/trophy.png";
import cloud from "../../../assets/images/page-main/cloud.png";
import bad from "../../../assets/images/backgrounds/helptransparent.png";
import semi from "../../../assets/images/backgrounds/bettertransparent.png";
import good from "../../../assets/images/backgrounds/thebesttransparent.png";
import background from "../../../assets/images/backgrounds/good.svg";

import { getDocs, collection } from "@firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import { useTotalPoints } from "../Utils/useTotalPoints/useTotalPoints";
import DisplayPoints from "../DisplayPoints/DisplayPoints";
import Footer from "../Footer/Footer";

const Home = () => {
  const { logout, currentUser } = useAuth();
  const [user, setUser] = useState("");
  const usersCollectionRef = collection(db, "users");

  const getUser = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      const user = filteredData.filter(
        (user) => user.email === currentUser.email
      );
      const userName = `${user[0].name}`;
      setUser(userName);
    } catch {
      console.log("no user here");
    }
  };

  useEffect(() => {
    getUser();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };
  const { pointsTotal } = useTotalPoints();

  const getBackgroundImage = () => {
    if (pointsTotal >= 1500) {
      return good;
    } else if (pointsTotal >= 1000 && pointsTotal < 1500) {
      return semi;
    } else {
      return bad;
    }
  };

  return (
    <div
      className={styles.home_container}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={styles.login_holder}>
        {!currentUser?.uid ? (
          <>
            <Link to="/login">
              <button
                className={styles.loginbtn}
                style={{ backgroundImage: `url(${cloud})` }}
              >
                Log In
              </button>
            </Link>
            <Link to="/register">
              <button
                className={styles.registerbtn}
                style={{ backgroundImage: `url(${cloud})` }}
              >
                Register
              </button>
            </Link>
          </>
        ) : (
          <Link to="/">
            <button
              className={styles.logoutbtn}
              style={{ backgroundImage: `url(${cloud})` }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </Link>
        )}
        <div className={styles.points_container}>
          <DisplayPoints />
        </div>
      </div>
      <div className={styles.text_holder}>
        {!currentUser?.uid ? (
          <>
            <h1>Hello friend!</h1>
            <h2>Its nice to meet You!</h2>
          </>
        ) : (
          <>
            <h1>Hello {`${user}`}!</h1>
            <h2>Its a pleasure to see U again!</h2>
          </>
        )}
        <p> Lets help our planet!</p>
      </div>
      <div className={styles.button_holder}>
        <Link to="/articles">
          <button className={styles.btns}>
            Articles
            <img className={styles.icon} src={copywriting}></img>
          </button>
        </Link>
        <Link to="getpoints">
          <button className={styles.btns}>
            Get points!
            <img className={styles.icon} src={heart}></img>
          </button>
        </Link>
        <Link to="newideas">
          <button className={styles.btns}>
            New ideas
            <img className={styles.icon} src={idea}></img>
          </button>
        </Link>
        <Link to="/prizes">
          <button className={styles.btns}>
            Prizes
            <img className={styles.icon} src={trophy}></img>
          </button>
        </Link>
      </div>
      <div
        className={styles.main_image}
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
      ></div>
    </div>
  );
};

export default Home;
