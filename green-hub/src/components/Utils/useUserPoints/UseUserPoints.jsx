import { useState, useEffect,useContext } from "react";
import { db } from "../../../config/firebase";
import useAuth from "../../../context/AuthContext";
import {HeartsContext} from "../../../context/HeartsContext";
import { doc, onSnapshot } from "firebase/firestore";

const POINTS_FOR_SINGLE_ARTICLE_LIKE = 8;

// pobieranie i wyświetlanie punktów uzytkownika
export const UseUserPoints = () => {
  const { currentUser } = useAuth();
  const [points, setPoints] = useState(null);
  const {clickedHearts,additionalPoints} = useContext(HeartsContext);

  useEffect(() => {
    if (currentUser?.uid && clickedHearts) {
        onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
          setPoints(doc.data().points+clickedHearts.length * POINTS_FOR_SINGLE_ARTICLE_LIKE);
        });
    } else {
      setPoints(null);
    }
  }, [currentUser,clickedHearts,additionalPoints]);

  // console.log(points);
  return { userPoints: points };
};
