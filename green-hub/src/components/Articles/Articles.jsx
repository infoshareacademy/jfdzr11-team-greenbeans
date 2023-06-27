import { useEffect, useState } from 'react';
import styles from './Articles.module.css'
import jsonData from '../../components/Articles/data.json'
import heart from '../../../assets/images/page-articles/heart.png'
// import pinkHeart from '../../../assets/images/page-articles/pinkheart.png'

const Articles = () => {
	const [articleData, setArticleData] = useState(null);

	useEffect(() => {
		setArticleData(jsonData);
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>articles</h1>

			<p className={styles.subtitle}>be aware and get some points</p>

        {articleData && articleData.map((article)=> (
          <div className={styles.articleContainer} key={article.id}>
            <h1 className={styles.articleHeader}>{article.header}</h1>
            <p className={styles.articleAuthor}>{article.author}</p>
            <p className={styles.articleText}>{article.text}</p>
        
            <button className={styles.articleButton}>Learn more</button>
            <div className={styles.imageContainer}>
                <img className={styles.heart} src={heart}/>
            <img className={styles.articleImage} src={article.image} alt="obrazek"/></div>
            </div>
             
            
       )
       )
       }
        </div>
        );
        }

export default Articles;
