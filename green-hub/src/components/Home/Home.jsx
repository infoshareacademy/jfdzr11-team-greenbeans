import styles from "../Home/Home.module.css";
import { Link } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import copywriting from "../../../assets/images/page-main/copywriting.png";
import heart from "../../../assets/images/page-main/heart.png";
import idea from "../../../assets/images/page-main/idea.png";
import trophy from "../../../assets/images/page-main/trophy.png";
import { getDoc, doc } from "@firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import DisplayPoints from "../DisplayPoints/DisplayPoints";
import { toast } from "react-hot-toast";
import Background from "../Background/Background";
import { getBackgroundImage } from "../Background/getBackgroundImage";

const Home = () => {
  const { logout, currentUser } = useAuth();
  const [user, setUser] = useState("");
  const [admin, setAdmin] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out succesfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const getUserName = async () => {
    try {
      const userData = await getDoc(doc(db, "users", currentUser?.uid));
      const userName = `${userData.data().name}`;
      const userAdmin = userData.data().isAdmin;
      setAdmin(userAdmin);
      setUser(userName);
    } catch (error) {
      console.log("no user here");
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setUser(getUserName());
    }
  }, [currentUser]);

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
        <Link to="/messages">
          {admin ? <button className={styles.btns}>Messages</button> : null}
        </Link>
      </div>
      <Background />
      <Footer />
    </div>
  );
};

export default Home;
