import { UseUserPoints } from "../Utils/UseUserPoints/UseUserPoints";
import useAuth from "../../context/AuthContext";

const DisplayPoints = () => {
  const { isGuest } = useAuth();
  const { userPoints } = UseUserPoints();
  console.log(userPoints);
  if (isGuest == false) {
    return <div>{<p>Your points {userPoints}</p>}</div>;
  } else {
    return (
      <div>
        <p>Log in to check Your points!</p>
      </div>
    );
  }
};

export default DisplayPoints;
