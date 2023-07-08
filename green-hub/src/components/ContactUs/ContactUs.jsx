/* eslint-disable react/no-unescaped-entities */
import styles from "./ContactUs.module.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useState } from "react";
import { collection } from "firebase/firestore";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();
  const contactsCollectionRef = collection(db, "contacts");

  const handleCancel = () => {
    navigate("/");
    toast.success("Returned to main page");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(contactsCollectionRef, {
        type: event.target?.type.value,
        name: event.target?.name.value,
        lastName: event.target?.lastName.value,
        email: event.target?.email.value,
        message: event.target?.message.value,
      }),
        navigate("/");
      toast.success("Message sent");
    } catch (error) {
      console.log(error);
      toast.error("Failed to sent message");
    }
    event.target.reset();
  };

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.contact_container}>
          <h1>
            Want to join our mission?
            <br></br>
            Something is not right?
            <br></br>
            <br></br>
            Fill up this form!
          </h1>
          <form onSubmit={handleSubmit} className={styles.contact_form}>
            <select
              type="text"
              name="type"
              id="type"
              placeholder="Business or private?"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option>Business</option>
              <option>Private</option>
            </select>
            <input
              type="text"
              name="name"
              id="name"
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
            <textarea
              type="text"
              name="message"
              id="message"
              placeholder="Type Your message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <button type="submit">SEND MESSAGE</button>
          </form>
          <button type="submit" onClick={handleCancel}>
            Return
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
