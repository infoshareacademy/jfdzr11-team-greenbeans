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

  const handleDelete = async (id) => {
    try {
      const docRef = doc(db, "contacts", id);
      await deleteDoc(docRef);
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== id)
      );
      toast.success("Message deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the message");
    }
  };

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
                Name: {messages.Name} <br />
                Email: {messages.Email} <br />
                Business/private: {messages.Type} <br />
                Message: {messages.Message}
              </p>
              <button
                onClick={() => {
                  window.location = `mailto:${messages.Email}`;
                }}
              >
                Reply
              </button>
              <br />
              <button
                onClick={() => {
                  handleDelete(messages.id);
                }}
              >
                Delete
              </button>
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
