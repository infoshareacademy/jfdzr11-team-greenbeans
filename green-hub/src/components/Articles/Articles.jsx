import { useEffect, useState } from "react";
import styles from "./Articles.module.css";
import jsonData from "../../components/Articles/data.json";
import heart from "../../../assets/images/page-articles/heart.png";
import pinkHeart from "../../../assets/images/page-articles/pinkheart.png";
import Navbar from "../Navbar/Navbar";
import useAuth from "../../context/AuthContext";
import Footer from "../Footer/Footer";
import { db } from "../../config/firebase.js";
import { updateDoc, doc } from "firebase/firestore";

const Articles = () => {
  const [articleData, setArticleData] = useState(null);
  
  const { currentUser } = useAuth();

  const [isLiked, setIsLiked] = useState(false);
  const [usersLikes, setUsersLikes] = useState([]);


  useEffect(() => {
    setArticleData(jsonData);
  }, []);

   useEffect(() => {
    if (currentUser?.uid) {
      setUsersLikes(usersLikes);
      setIsLiked(usersLikes.includes(currentUser.uid));
    }
  }, [currentUser?.uid, usersLikes]);

 

  const handleHeartClick = async (id) => {
    const docRef = doc(db, "articles", id);
    console.log(docRef)
    


    if (!isLiked) {
      try {
        await updateDoc(docRef, { usersLikes: [...usersLikes, currentUser.uid] });
        setIsLiked(true);
        setUsersLikes([...usersLikes, currentUser.uid]);
        console.log(usersLikes, currentUser.uid);

      } catch (error) {
        console.log("nie udało się polubić artykułu", error);
      }
      } 
    }
  
    


  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>articles</h1>
        <p className={styles.subtitle}>be aware and get some points</p>
        {articleData &&
          articleData.map((article) => (
            <div className={styles.articleContainer} key={article.firebaseId}>
              <h1 className={styles.articleHeader}>{article.header}</h1>
              <p className={styles.articleAuthor}>{article.author}</p>
              <p className={styles.articleText}>{article.text}</p>
              <a href={article.link} className={styles.articleLink}>
                <button className={styles.articleButton}>Learn more</button>
              </a>
              <div className={styles.imageContainer}>
                {currentUser?.uid ? (
                  <img
                    className={`${styles.heart} ${
                      isLiked ? styles.pinkHeart
                        : ""
                    }`}
                    src={isLiked
                        ? pinkHeart
                        : heart
                    }
                    alt="serce"
                    onClick={() => handleHeartClick(article.firebaseId)}
                  />
                ) : null}
                <div
                  className={styles.articleImage}
                  style={{ backgroundImage: `url(${article.image})` }}
                ></div>
              </div>
            </div>
          ))}
      </div>
      <Footer />
    </>
  );
};


export default Articles;
