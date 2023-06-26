import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {

	const {path, setPath} = useState()

	const pathname = window.location.pathname
	console.log(pathname)

	// const 

	return (
		<div className={styles.navbar}>
			<ul>
				<Link to="/">GH</Link>
				<Link to="/articles"><img src="../../../assets/images/page-main/copywriting.png"/></Link>
				<Link to="/getpoints"><img src="../../../assets/images/page-main/heart.png"/></Link>
				<Link to="/newideas"><img src="../../../assets/images/page-main/idea.png"/></Link>
				<Link to="/prizes"><img src="../../../assets/images/page-main/trophy.png"/></Link>
			</ul>
			<div>
				<p>Your points: 750</p>
			</div>
		</div>
	);
};

export default Navbar;
