/* eslint-disable react/no-unescaped-entities */
import styles from "./Authentication.module.css";
import { toast } from "react-hot-toast";
import useAuth from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "@firebase/firestore";
import { db } from "../../config/firebase";
import { useState } from "react";
import Loader from "../Loader/Loader";
import isEmail from "validator/lib/isEmail";

const Register = () => {
  //stan ładowania do implementacji loadera
  const [isLoading, setIsLoading] = useState(false);
  //stany dla inputów
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const { register } = useAuth();

  const handleCancel = () => {
    navigate("/");
    toast.success("Returned to main page");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const password = event.target?.password.value;
    const password_confirm = event.target?.password_confirm.value;

    //walidacja email po stronie klienta

    const isValidEmail = isEmail(email);

    if (isValidEmail) {
      if (password !== password_confirm) {
        toast.error("Invalid password confirmation");
      } else {
        try {
          //zmienna do przechwycenia id użytkownika z autentykacji
          const registeredUser = await register(email, password);
          setIsLoading(true);

          //Dodanie danych do kolekcji users z własnym id
          await setDoc(doc(db, "users", registeredUser.user.uid), {
            name: event.target?.firstName.value,
            lastName: event.target?.lastName.value,
            isAdmin: false,
            email: event.target?.email.value,
            points: 0,
            pointsTotal: 0,
          });

          setIsLoading(false);

          navigate("/");
          toast.success("Sucessfully registered");

          //Custom'owe komunikaty błędów
        } catch (error) {
          if (error.code === "auth/email-already-in-use") {
            toast.error("User already exists");
          } else if (error.code === "auth/weak-password") {
            toast.error("Password is too weak");
          } else if (error.code === "auth/invalid-email") {
            toast.error("Please type valid e-mail");
          } else toast.error(error.code);
        }
      }
      event.target.reset();
    } else toast.error("Please type valid e-mail");
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.layout}>
          <div className={styles.auth_container}>
            <h1>
              Hi! I'm plant{" "}
              <img src="/jfdzr11-team-greenbeans/assets/images/page-main/plant-11.png" />,
              <br></br>
              let introduce yourself!
            </h1>
            <form onSubmit={handleSubmit} className={styles.auth_form}>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="what's your name?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="what's your lastname?"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
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
                placeholder="create password"
                required
              />
              <input
                type="password"
                name="password_confirm"
                id="password_confirm"
                placeholder="confirm password"
                required
              />
              <button type="submit">REGISTER</button>
            </form>
            <button className={styles.return} type="submit" onClick={handleCancel}>
              RETURN
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
