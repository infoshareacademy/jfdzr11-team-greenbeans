import { useEffect, useState } from "react";
import styles from "./Articles.module.css";
import jsonData from "../../components/Articles/data.json";
import heart from "../../../assets/images/page-articles/heart.png";
import pinkHeart from "../../../assets/images/page-articles/pinkheart.png";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import useAuth from "../../context/AuthContext";

const Articles = () => {
  const [articleData, setArticleData] = useState(null);
  const [clickedHearts, setClickedHearts] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    setArticleData(jsonData);
  }, []);

  const handleHeartClick = (articleId) => {
    if (clickedHearts.includes(articleId)) {
      setClickedHearts(clickedHearts.filter((id) => id !== articleId));
    } else {
      setClickedHearts([...clickedHearts, articleId]);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>articles</h1>
        <p className={styles.subtitle}>be aware and get some points</p>
        {articleData &&
          articleData.map((article) => (
            <div className={styles.articleContainer} key={article.id}>
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
                      clickedHearts.includes(article.id) ? styles.pinkHeart : ""
                    }`}
                    src={clickedHearts.includes(article.id) ? pinkHeart : heart}
                    alt="serce"
                    onClick={() => handleHeartClick(article.id)}
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
    </>
  );
};

export default Articles;
