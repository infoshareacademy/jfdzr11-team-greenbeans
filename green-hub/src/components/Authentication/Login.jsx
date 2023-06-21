import styles from "./Authentication.module.css";
import { toast } from "react-hot-toast";
import useAuth from "../../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

export const Login = () => {
	const { login, currentUser } = useAuth();

	const handleSubmit = async (formEvent) => {
		formEvent.preventDefault();

		const email = formEvent.target?.email.value;
		const password = formEvent.target?.password.value;

		try {
			await login(email, password);
			toast.success("Logged in succesfully");
		} catch (error) {
			toast.error("Please try again!");
		}
	};
	return (
		<>
			{!currentUser ? (
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
						<p>
							You do not have an account yet?
							<Link to="/register">Register now!</Link>
						</p>
					</form>
				</div>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
};
