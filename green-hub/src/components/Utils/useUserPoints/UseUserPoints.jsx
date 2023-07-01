import { useState, useEffect } from "react";
import { db } from "../../../config/firebase";
import useAuth from "../../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";

export const UseUserPoints = () => {
  const { currentUser } = useAuth();
  const [points, setPoints] = useState(null);
  // const [loggedinmsg, setLoggedinmsg] = useState("");

  // pobieranie i wyświetlanie punktów uzytkownika

  useEffect(() => {
    if (currentUser?.uid) {
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setPoints(doc.data().points);
        // setLoggedinmsg("Your Points : ");
      });
    } else {
      setPoints(null);
      // setLoggedinmsg("Log in to gather points!");
    }
  }, [currentUser]);

  console.log(points);
  return { userPoints: points };
  // (
  // <div>
  //   <p>
  //     {loggedinmsg} {points}
  //   </p>
  // </div>
  // );
};
