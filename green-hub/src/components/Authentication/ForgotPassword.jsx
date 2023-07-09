import styles from "./Authentication.module.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
	const handlePasswordReset = async (event) => {
		event.preventDefault();
		try {
			await sendPasswordResetEmail(auth, event.target.email.value);
			toast.success("Password reset initiated");
		} catch (error) {
			toast.error("Wrong e-mail");
		}
		event.target.reset();
	};

	return (
		<div className={styles.layout}>
			<div className={styles.auth_container}>
				<h1>Forgot your password?</h1>
				<form onSubmit={handlePasswordReset} className={styles.auth_form}>
					<label htmlFor="email">Type your email to reset:</label>
					<input
						type="text"
						name="email"
						id="email"
						required
					/>
					<button type="submit">SEND</button>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
