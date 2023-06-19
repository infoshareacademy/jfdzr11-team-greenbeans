import styles from "./Authentication.module.css";
// import useAuth from "../../context/setAuth";
import { toast } from "react-hot-toast";

export const Register = () => {
	// const { register } = useAuth();

	const handleSubmit = async (event) => {
		event.preventDefault();

		const email = event.target?.email.value;
		const password = event.target?.password.value;
		const password_confirm = event.target?.password_confirm.value;

		if (password !== password_confirm) {
			toast.error("Password must be confirmed");
		} else {
			// await register(email, password);
			toast.success("Successfully regstered");
			event.target.reset();
		}
	};

	return (
		<div className={styles.auth_container}>
			<form
				onSubmit={handleSubmit}
				className={styles.form}
			>
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
