import React, { useEffect, useState } from "react";
import { Navbar, Footer } from "../index";
import { db } from "../../config/firebase.js";
import {
  Timestamp,
  addDoc,
  collection,
  orderBy,
  onSnapshot,
  query,
  getDoc,
  doc
} from "firebase/firestore";
import { Toaster, toast } from "react-hot-toast";
import IdeaCard from "../IdeaCard/IdeaCard";
import styles from "./Ideas.module.css";
import useAuth from "../../context/AuthContext";

const Ideas = () => {
  
  const [idea, setIdea] = useState([]);
  const [user, setUser] = useState('')
  const ideasCollectionRef = collection(db, "ideas");
  const { currentUser } = useAuth();

  // POBIERANIE USERÓW
  const getUserName = async () => {
    try {
      const userData = await getDoc(doc(db, "users", currentUser?.uid))
      const userName = `${userData.data().name} ${userData.data().lastName}`
      setUser(userName)
    } catch (error) {
      console.log("no user here");
      console.error(error)
    }
  }

  useEffect(() => {
    if(currentUser) {getUserName()};
   }, [currentUser])

  // WYŚWIETLANIE POMYSŁÓW UŻYTKOWNIKÓW
  const q = query(ideasCollectionRef, orderBy("date", "desc"));

  const getIdeasFromSnapshot = (querySnapshot) => {
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  const dbListener = (cb) => onSnapshot(q, cb);

  useEffect(() => {
    dbListener((querySnapshot) => setIdea(getIdeasFromSnapshot(querySnapshot)));
  }, []);

  // funkcja do stworzenia obiektu z nowym pomysłem przesłanym przez użytkownika
  const getNewIdea = (e) => {
    const newIdea = {
      user: user,
      idea: e.target.idea.value,
      date: Timestamp.fromDate(new Date()),
      auth: currentUser.uid,
      totalLikes: 0,
      usersLikes: []
    };
    e.target.reset();
    console.log('to czego szukam: ', user)
    return newIdea;
  };

  // DODAWANIE NOWEGO POMYSŁU
  const handleSubmit = async (e) => {
    e.preventDefault();
    const idea = getNewIdea(e);
    console.log(idea.idea, currentUser);

    if (!idea.idea) {
      toast.error(
        "I can't read in your mind 🥺 please write down your idea in field below 😃"
      );
    } else {
      try {
        await addDoc(ideasCollectionRef, idea);
        toast.success("New idea added! 💡");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong! Please try again!");
      }
    }
  };

  return (
    <div className={styles.ideas}>
      <Toaster />
      <Navbar />
      <main>
        <h1>ideas</h1>
        <p>
          Hi! It's time to introduce ourselves!<br></br>We are an association
          that wants to make people aware of the importance of taking care of
          our planet and how much we threaten its health.<br></br>To encourage
          users to take action, we have partnered with large companies, as you
          can see in the Prize section. To learn more about us, click About.
        </p>
        <p>
          We are certain that activities we have proposed are great.<br></br>But
          we are also sure that you have great ideas too, share them here.
          <br></br>If other users also express a desire to take care of the
          planet in this way, we will consider adding this activity in the
          Points section.
        </p>
        <div>
        <div className={styles.imagesPack}>
          <img src="../../../assets/images/page-ideas/tree-12.png" alt="" />
          <img src="../../../assets/images/page-ideas/tree-11.png" alt="" />
          <img src="../../../assets/images/page-ideas/bush.png" alt="" />
        </div>
        <p>On behalf of plants, animals and the whole earth - THANK YOU!</p>
        <div className={styles.imagesPack}>
          <img src="../../../assets/images/page-ideas/rabbit.png" alt="" />
          <img src="../../../assets/images/page-ideas/fox.png" alt="" />
          <img src="../../../assets/images/page-ideas/dolphin.png" alt="" />
        </div>
        </div>
        <img src="../../../assets/images/page-ideas/save.png" />
        {currentUser?.uid ? <form onSubmit={handleSubmit} className={styles.submit}>
          <textarea
            name="idea"
            id="idea"
            type="text"
            placeholder="type your idea here!.."
          ></textarea>
          <button>SUBMIT</button>
        </form> 
        : null
        } 
        {idea
          ? idea.map((idea) => {
              const date = idea?.date?.toDate().toDateString();
              return (
                <IdeaCard
                  key={idea.id}
                  id={idea.id}
                  user={idea.user}
                  date={date}
                  idea={idea.idea}
                  auth={idea.auth}
                  totalLikes={idea.totalLikes}
                  usersLikes={idea.usersLikes}
                />
              );
            })
          : null}
      </main>
      <Footer />
    </div>
  );
};

export default Ideas;
