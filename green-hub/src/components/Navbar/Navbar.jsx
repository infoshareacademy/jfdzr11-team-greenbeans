import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import data from "./NavbarData.json";
import NavbarLink from "../NavbarLink/NavbarLink";
import DisplayPoints from "../DisplayPoints/DisplayPoints";

const Navbar = () => {
	return (
		<>
			<div className={styles.navbar}>
				<nav>
					<NavLink
						to="/"
						title="Home"
					>
						GH
					</NavLink>
					{data.map((link, index) => {
						return (
							<NavbarLink
								key={index}
								path={link.path}
								icon={link.icon}
								title={link.title}
							/>
						);
					})}
				</nav>
				<div>
					<DisplayPoints />
				</div>
			</div>
			<div className={styles.line}></div>
		</>
	);
};

export default Navbar;
