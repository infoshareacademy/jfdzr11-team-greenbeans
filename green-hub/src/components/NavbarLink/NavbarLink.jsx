import React from "react";
import { NavLink } from "react-router-dom";

const NavbarLink = ({ path, icon, title }) => {
	return (
		<NavLink
			title={title}
			to={path}
			style={({ isActive }) => {
				return {
					mixBlendMode: isActive ? "luminosity" : "",
					opacity: isActive ? "0.8" : "1",
				};
			}}
		>
			<img src={icon} />
		</NavLink>
	);
};

export default NavbarLink;
