import { useState, useEffect } from "react";
import { db } from "../../../config/firebase";
import useAuth from "../../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";

// pobieranie i wyświetlanie punktów uzytkownika
export const UseUserPoints = () => {
  const { currentUser } = useAuth();
  const [points, setPoints] = useState(null);

  useEffect(() => {
    if (currentUser?.uid) {
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setPoints(doc.data().points);
      });
    } else {
      setPoints(null);
    }
  }, [currentUser]);

  console.log(points);
  return { userPoints: points };
};
