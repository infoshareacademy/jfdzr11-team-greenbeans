import Footer from "../Footer/Footer";
import styles from "../Messages/Messages.module.css";
import Navbar from "../Navbar/Navbar";
import { db } from "../../config/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Messages = () => {
  const messagesCollectionRef = collection(db, "contacts");
  const [messages, setMessages] = useState([]);

  // WIP
  // const handleDelete = () => {
  //   const docRef = doc(db, "contacts", doc.id);
  //   deleteDoc(docRef);
  // };

  const getMessages = async () => {
    try {
      const data = await getDocs(messagesCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        Name: doc.data().name + " " + doc.data().lastName,
        Email: doc.data().email,
        Type: doc.data().type,
        Message: doc.data().message,
        id: doc.id,
      }));
      console.log(filteredData);
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
      <Navbar />
      <div className={styles.messages_container}>
        {messages.length > 0 ? (
          messages.map((messages, idx) => (
            <Fragment key={idx}>
              <p className={styles.msgpara}>
                Contact name: {messages.Name} <br />
                Contact email: {messages.Email} <br />
                Contact from business/private: {messages.Type} <br />
                Contact message: {messages.Message}
              </p>
              <button
                onClick={() => {
                  window.location = `mailto:${messages.Email}`;
                }}
              >
                Reply
              </button>
              {/* <button
                // WIP
                onClick={() => {
                  handleDelete()
                }}
              >
                Delete
              </button> */}
            </Fragment>
          ))
        ) : (
          <p>You dont have any messages yet!</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Messages;
