import { useState, useEffect } from "react";
import { db } from "../../../config/firebase";
import useAuth from "../../../context/AuthContext";
import { collection, doc, onSnapshot } from "firebase/firestore";

const UseUserPoints = () => {
  const { currentUser } = useAuth();
  const [points, setPoints] = useState("");
  const usersCollectionRef = collection(db, "users");
  // v1

  useEffect(() => {
    if (currentUser?.uid) {
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setPoints(doc.data().points);
        console.log(doc.data());
      });
      console.log(currentUser);
      console.log(usersCollectionRef);
      console.log(points);
    } else {
      setPoints(0);
    }
  }, [currentUser]);

  return (
    <div>
      <p> Points : {points} </p>
    </div>
  );
};
export default UseUserPoints;
