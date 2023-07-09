import Footer from "../Footer/Footer";
import styles from "../Messages/Messages.module.css";
import Navbar from "../Navbar/Navbar";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Messages = () => {
  const messagesCollectionRef = collection(db, "contacts");
  const [messages, setMessages] = useState([]);
  console.log(messages);

  const getMessages = async () => {
    try {
      const data = await getDocs(messagesCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        Name: doc.data().name + " " + doc.data().lastName,
        Email: doc.data().email,
        Type: doc.data().type,
        Message: doc.data().message,
      }));

      setMessages(filteredData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user messages");
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className={styles.main_container}>
      <div className={styles.navbar_container}>
        <Navbar />
      </div>
      <div className={styles.messages_container}>
        {messages.length > 0 ? (
          messages.map((messages) => {
            <Fragment key={messages.id}>
              <p>
                <span>Contact name: {messages.Name}</span>
                <span>Contact email: {messages.Email}</span>
                <span>Contact from business/private: {messages.Type}</span>
                <span>Contact message: {messages.message}</span>
              </p>
            </Fragment>;
          })
        ) : (
          <p>You dont have any messages yet!</p>
        )}
      </div>
      <div className={styles.footer_container}>
        <Footer />
      </div>
    </div>
  );
};

export default Messages;

// onst[(studentsGrades, setStudentsGrades)] = useState([]);

// const studentsCollectionRef = collection(db, "students");

// const getStudents = async () => {
//   try {
//     const data = await getDocs(studentsCollectionRef);

//     const filteredData = data.docs.map((doc) => ({
//       studentName: doc.data().name + " " + doc.data().lastName,
//       grades: doc.data().grades,
//       id: doc.id,
//     }));

//     setStudentsGrades(filteredData);
//   } catch (error) {
//     console.error(error);
//   }
// };

// useEffect(() => {
//   getStudents();
// }, []);
