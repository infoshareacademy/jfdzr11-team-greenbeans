// import { useState, useEffect } from "react";
// import { db } from "../../../config/firebase";
// import useAuth from "../../../context/AuthContext";
// import { collection, onSnapshot, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebase";
import useAuth from "../../../context/AuthContext";

const UseUserPoints = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState("");
  const usersCollectionRef = collection(db, "users");

  const getUser = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
      }));
      const user = filteredData.filter(
        (user) => user.email === currentUser.email
      );
      const userName = `${user[0].name} ${user[0].lastName}`;
      console.log(userName);
      setUser(userName);
    } catch {
      console.log("no user here");
    }
  };

  useEffect(() => {
    getUser();
    console.log(user);
    console.log(usersCollectionRef);
  }, []);

  const q = query(collection(db, "users"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    console.log(data);
  });

  return (
    <>
      <div>
        <p> Points :</p>
      </div>
    </>
  );
  // const currentUser = useAuth();
  // const [points, setPoints] = useState();

  // const userPointsRef = collection(db, "users");

  // v4

  //   // useEffect(() => {
  //   //   onAuthStateChanged(auth, async (user) => {
  //   //     if (user) {
  //   //       const snapshot = await getDoc(doc(db, "users", user.uid));
  //   //       console.log(snapshot.data());
  //   //     }
  //   //   });
  //   // }, []);

  // v1

  //   useEffect(() => {
  //     onSnapshot(collection(db, "users"), (snapshot) => {
  //       setPoints(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     });
  //     console.log(points);
  //     console.log(currentUser);
  //     console.log(userPointsRef);
  //   }, []);

  //   return (
  //     <div>
  //       <p> Points : </p>
  //     </div>
  //   );
  // };

  // export default UseUserPoints;

  // v2

  // import { useEffect, useState } from "react";
  // import useAuth from "../../../context/AuthContext";
  // import { db } from "../../../config/firebase";

  // const PointsComponent = () => {
  //   const { currentUser } = useAuth();
  //   const [points, setPoints] = useState(null);

  //   useEffect(() => {
  //     if (currentUser) {
  //       const userRef = db().collection("users").doc(currentUser.uid);

  //       userRef
  //         .get()
  //         .then((doc) => {
  //           if (doc.exists) {
  //             const userData = doc.data();
  //             setPoints(userData.points);
  //           } else {
  //             console.error("Error: User document not found");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching user document:", error);
  //         });
  //     }
  //   }, [currentUser]);

  //   return (
  //     <div>
  //       <p>Points: {points}</p>
  //     </div>
  //   );
  // };

  // export default PointsComponent;

  // v3

  // const PointsComponent = () => {
  //   const { currentUser } = useAuth();
  //   const [points, setPoints] = useState();
  //   const userPointsRef = collection(db, "users");

  //   useEffect(() => {
  //     onSnapshot(collection(db, "users"), (snapshot) => {
  //       setPoints(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     });
  //     console.log(points);
  //   });
  //   return (
  //     <div>
  //       {" "}
  //       <p key={points}>Points: {points}</p>
  //     </div>
  //   );
  // };

  // export default PointsComponent;

  // const PointsComponent = () => {
  //   const { currentUser } = useAuth();
  //   const [points, setPoints] = useState();

  //   useEffect(() => {
  //     if (currentUser) {
  //       const userRef = collection(db, "users");

  //       const unsubscribe = userRef.onSnapshot((snapshot) => {
  //         if (snapshot.size === 1) {
  //           const userData = snapshot.docs[0].data();
  //           setPoints(userData.points);
  //         } else {
  //           console.error("Error: User not found");
  //         }
  //       });

  //       return () => unsubscribe();
  //     }
  //   }, [currentUser]);

  // return (
  //   // <div>
  //   //   <p>Points: {points}</p>
  //   // </div>
  // );
  // };
};

export default UseUserPoints;
