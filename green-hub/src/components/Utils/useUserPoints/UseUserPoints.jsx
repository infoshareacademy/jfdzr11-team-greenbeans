import { useState, useEffect,useContext } from "react";
import { db } from "../../../config/firebase";
import useAuth from "../../../context/AuthContext";
import {HeartsContext} from "../../../context/HeartsContext";

const POINTS_FOR_SINGLE_ARTICLE_LIKE = 8;

// pobieranie i wyświetlanie punktów uzytkownika
export const UseUserPoints = () => {
  const { currentUser } = useAuth();
  const [points, setPoints] = useState(null);
  const {clickedHearts} = useContext(HeartsContext);

  useEffect(() => {
    if (currentUser?.uid && clickedHearts) {
	setPoints(clickedHearts.length * POINTS_FOR_SINGLE_ARTICLE_LIKE);
    } else {
      setPoints(null);
    }
  }, [currentUser,clickedHearts]);

  // console.log(points);
  return { userPoints: points };
};
