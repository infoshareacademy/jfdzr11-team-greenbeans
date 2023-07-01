import { UseUserPoints } from "../Utils/UseUserPoints/UseUserPoints";

const DisplayPoints = () => {
  const { userPoints } = UseUserPoints();
  console.log(userPoints);
  if (isGuest(false)) {
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
