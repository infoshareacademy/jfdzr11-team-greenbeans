import styles from "./Authentication.module.css";
import { toast } from "react-hot-toast";
import useAuth from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "@firebase/firestore";
import { db } from "../../config/firebase";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
	const navigate = useNavigate();
	const { register } = useAuth();
	const userId = uuidv4();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const email = event.target?.email.value;
		const password = event.target?.password.value;
		const password_confirm = event.target?.password_confirm.value;

		if (password !== password_confirm) {
			toast.error("Passwords must match");
		} else {
			try {
				await register(email, password);
				//Dodanie danych do kolekcji users z własnym id
				await setDoc(doc(db, "users", userId), {
					name: event.target?.firstName.value,
					lastName: event.target?.lastName.value,
					points: 0,
					pointsTotal: 0,
				});
				navigate("/");
				toast.success("Sucessfully registered");
				console.log(userId);
			} catch (error) {
				toast.error(error.code);
			}
			event.target.reset();
		}
	};

	return (
		<div className={styles.auth_container}>
			<form
				onSubmit={handleSubmit}
				className={styles.auth_form}
			>
				<label htmlFor="firstName">Name</label>
				<input
					type="text"
					name="firstName"
					id="firstName"
					required
				/>
				<label htmlFor="lastName">Last Name</label>
				<input
					type="text"
					name="lastName"
					id="lastName"
					required
				/>
				<label htmlFor="email">E-mail</label>
				<input
					type="email"
					name="email"
					id="email"
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					required
				/>
				<label htmlFor="password_confirm">Password confirmation</label>
				<input
					type="password"
					name="password_confirm"
					id="password_confirm"
					required
				/>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;
