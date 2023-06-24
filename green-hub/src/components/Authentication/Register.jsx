import styles from "./Authentication.module.css";
import { toast } from "react-hot-toast";
import useAuth from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
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
				await register(email, password);
				navigate("/");
				toast.success("Sucessfully registered");
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
				className={styles.form}
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
