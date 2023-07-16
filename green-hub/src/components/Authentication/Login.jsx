import styles from "./Authentication.module.css";
import { toast } from "react-hot-toast";
import useAuth from "../../context/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useState } from "react";

const Login = () => {
  //stan ładowania do implementacji loadera
  const [isLoading, setIsLoading] = useState(false);
  //stan input
  const [email, setEmail] = useState("");

  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
    toast.success("Returned to main page");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const email = event.target?.email.value;
    const password = event.target?.password.value;

    try {
      await login(email, password);
      setIsLoading(false);
      toast.success("Logged in succesfully");
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/user-not-found") {
        toast.error("Invalid login");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Invalid password");
      } else toast.error("Something went wrong");
    }
  };
  return (
    <>
      {!currentUser?.uid && isLoading ? (
        <Loader />
      ) : (
        <div className={styles.layout}>
          <div className={styles.auth_container}>
            <h1>Hello!</h1>
            <form onSubmit={handleSubmit} className={styles.auth_form}>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                required
              />
              <button type="submit">LOGIN</button>
              <p>Forgot password?</p>
              <Link to="/forgotpassword">RESET</Link>
              <p>You do not have an account yet?</p>
              <Link to="/register">Register now!</Link>
            </form>
            <button className={styles.return} type="submit" onClick={handleCancel}>
              RETURN
            </button>
          </div>
        </div>
      )}
      {currentUser?.uid && !isLoading && <Navigate to="/" />}
    </>
  );
};

export default Login;
