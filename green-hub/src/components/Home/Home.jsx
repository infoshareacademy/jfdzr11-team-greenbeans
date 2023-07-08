import styles from "../Home/Home.module.css";
import { Link } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import copywriting from "../../../assets/images/page-main/copywriting.png";
import heart from "../../../assets/images/page-main/heart.png";
import idea from "../../../assets/images/page-main/idea.png";
import trophy from "../../../assets/images/page-main/trophy.png";
import { getDocs, collection } from "@firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import Background from "../Background/Background";
import Footer from "../Footer/Footer";
import DisplayPoints from "../DisplayPoints/DisplayPoints";
import { UseUserPoints } from "../Utils/UseUserPoints/UseUserPoints";
import { toast } from "react-hot-toast";

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
      toast.success("Logged out succesfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const { userPoints } = UseUserPoints();

  const getBackgroundImage = () => {
    if (userPoints >= 1300) {
      return styles.good;
    } else if (userPoints >= 800 && userPoints < 1300) {
      return styles.semi;
    } else {
      return styles.bad;
    }
  };

  return (
    <div className={`${styles.home_container} ${getBackgroundImage()}`}>
      <div className={styles.login_holder}>
        {!currentUser?.uid ? (
          <>
            <Link to="/login">
              <div className={styles.cloud1}>
                <button className={styles.loginbtn}>Log In</button>
              </div>
            </Link>
            <Link to="/register">
              <div className={styles.cloud2}>
                <button className={styles.registerbtn}>Register</button>
              </div>
            </Link>
          </>
        ) : (
          <Link to="/">
            <div className={styles.cloud1}>
              <button className={styles.logoutbtn} onClick={handleLogout}>
                Logout
              </button>
            </div>
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
            <h2>Nice to meet U!</h2>
          </>
        ) : (
          <>
            <h1>Hello {`${user}`}!</h1>
            <h2>Its a pleasure to see U again!</h2>
          </>
        )}
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
      <Background />
      <Footer />
    </div>
  );
};

export default Home;
