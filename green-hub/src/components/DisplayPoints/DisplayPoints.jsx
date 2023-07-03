import { UseUserPoints } from "../Utils/UseUserPoints/UseUserPoints";
import useAuth from "../../context/AuthContext";

const DisplayPoints = () => {
  const { isGuest } = useAuth();
  const { userPoints } = UseUserPoints();
  // console.log(userPoints);
  if (isGuest == false) {
    return <div>{<p>Your points {userPoints}</p>}</div>;
  } else {
    return 
  }
};

export default DisplayPoints;
