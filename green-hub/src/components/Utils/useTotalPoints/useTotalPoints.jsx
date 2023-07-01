import { useState, useEffect } from "react";
import { db } from "../../../config/firebase";
import useAuth from "../../../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";

// pobieranie i wyświetlanie punktów uzytkownika do rendera warunkowego
export const useTotalPoints = () => {
  const { currentUser } = useAuth();
  const [pointsTotal, setPointsTotal] = useState(null);

  useEffect(() => {
    if (currentUser?.uid) {
      onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setPointsTotal(doc.data().pointsTotal);
      });
    }
  }, [currentUser]);
  return { pointsTotal };
};
