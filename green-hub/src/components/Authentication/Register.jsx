import styles from "./Authentication.module.css";
import { toast } from "react-hot-toast";
import useAuth from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "@firebase/firestore";
import { db } from "../../config/firebase";
import React from "react";

const Register = () => {
	const navigate = useNavigate();
	const { register } = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const email = event.target?.email.value;
		const password = event.target?.password.value;
		const password_confirm = event.target?.password_confirm.value;

		if (password !== password_confirm) {
			toast.error("Passwords must match");
		} else {
			try {
				//zmienna do przechwycenia id użytkownika z autentykacji
				const registeredUser = await register(email, password);
				//Dodanie danych do kolekcji users z własnym id
				await setDoc(doc(db, "users", registeredUser.user.uid), {
					name: event.target?.firstName.value,
					lastName: event.target?.lastName.value,
					isAdmin: false,
					email: event.target?.email.value,
					points: 0,
					pointsTotal: 0,
				});
				navigate("/");
				toast.success("Sucessfully registered");
			} catch (error) {
				toast.error(error.code);
			}
			event.target.reset();
		}
	};

	return (
		<div className={styles.layout}>
		<div className={styles.auth_container}>
			<h1>Hi! I'm plant <img src="../../../assets/images/page-main/plant-11.png"/>,<br></br>let introduce yourself!</h1>
			<form
				onSubmit={handleSubmit}
				className={styles.auth_form}
			>
				{/* <label htmlFor="firstName">Name</label> */}
				<input
					type="text"
					name="firstName"
					id="firstName"
					placeholder="what's your name?"
					required
				/>
				{/* <label htmlFor="lastName">Lastname</label> */}
				<input
					type="text"
					name="lastName"
					id="lastName"
					placeholder="what's your lastname?"
					required
				/>
				{/* <label htmlFor="email">Email</label> */}
				<input
					type="email"
					name="email"
					id="email"
					placeholder="enter your email"
					required
				/>
				{/* <label htmlFor="password">Password</label> */}
				<input
					type="password"
					name="password"
					id="password"
					placeholder="create password"
					required
				/>
				{/* <label htmlFor="password_confirm">Password confirmation</label> */}
				<input
					type="password"
					name="password_confirm"
					id="password_confirm"
					placeholder="confirm password"
					required
				/>
				<button type="submit">REGISTER</button>
			</form>
		</div>
		</div>
	);
};

export default Register;
