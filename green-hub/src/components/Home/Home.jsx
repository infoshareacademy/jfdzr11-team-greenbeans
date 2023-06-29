import styles from "../Home/Home.module.css";
import { Link } from "react-router-dom";
import useAuth from "../../context/AuthContext";
import { getDocs, collection } from "@firebase/firestore";
import { db } from "../../config/firebase";
import { useState, useEffect } from "react";

const Home = () => {
	const { logout, currentUser } = useAuth();
	const [user, setUser] = useState('')
	const usersCollectionRef = collection(db, "users")

	const getUser = async () => {
		try {
		  const data = await getDocs(usersCollectionRef);
		  const filteredData = data.docs.map((doc) => ({
			...doc.data()
		  }))
		  const user = filteredData.filter(user => user.email === currentUser.email)
		  const userName = `${user[0].name}`
		  console.log(filteredData)
		  setUser(userName);
		} catch {
		  console.log("no user here");
		}
	  }
	  
	  useEffect(() => {
		getUser();
	  }, [])

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={styles.home_container}>
			<Link to="/">
				<h1>Welcome to GreenHub</h1>
			</Link>
			<div className={styles.login_holder}>
				{!currentUser ? (
					<>
						<Link to="/login">
							<button className={styles.loginbtn}>Login</button>
						</Link>
						<Link to="/register">
							<button className={styles.registerbtn}>Register</button>
						</Link>
					</>
				) : (
					<Link to="/">
						<button
							className={styles.logoutbtn}
							onClick={handleLogout}
						>
							Logout
						</button>
					</Link>
				)}
			</div>
			<div className={styles.text_holder}>
				{!currentUser ? (
					<><h1>Hello friend!</h1>
					<h2>Its nice to meet You!</h2></>
				) : (<><h1>Hello {`${user}`}!</h1>
				<h2>It's a pleasure to see U again!</h2></>)}
				<p> Lets help our planet!</p>
			</div>
			<div className={styles.button_holder}>
				<Link to="/articles">
					<button className={styles.btns}>Articles</button>
				</Link>
				<Link to="getpoints">
					<button className={styles.btns}>Get points</button>
				</Link>
				<Link to="newideas">
					<button className={styles.btns}>New ideas</button>
				</Link>
				<Link to="/prizes">
					<button className={styles.btns}>Prizes</button>
				</Link>
			</div>
			<div className={styles.image_holder}>
				<img src="https://st2.depositphotos.com/3647713/6958/i/600/depositphotos_69587953-stock-photo-green-beans-isolated.jpg" />
			</div>
		</div>
	);
};

export default Home;
