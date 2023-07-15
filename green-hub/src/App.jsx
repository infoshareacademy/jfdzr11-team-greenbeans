import {
  Articles,
  Login,
  Register,
  GetPoints,
  Ideas,
  Home,
  ForgotPassword,
  AboutUs,
  ContactUs,
  Terms,
  Faq,
  Messages,
} from "./components";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Prizes from "./components/Prizes/Prizes";
import {HeartsContext} from "./context/HeartsContext";
import { useState,useEffect} from 'react';
import useAuth from "./context/AuthContext";
import { db } from "./config/firebase";
import { doc, collection,setDoc,deleteDoc ,getDoc,query,getDocs,where} from "firebase/firestore";

function App() {
      const { currentUser } = useAuth();
    const [clickedHearts, setClickedHearts] = useState([]);
    const hearts = {clickedHearts, setClickedHearts};
     useEffect(() => {
   if (currentUser?.uid){
	const q = query(collection(db, "users_hearts"), where("uid", "==", currentUser.uid));
	getDocs(q).then(({docs}) => {
	    setClickedHearts(docs.map(single_row => single_row.data().aid));
	});
      }
  },[currentUser]);
  return (
    <>
    <HeartsContext.Provider value={hearts}>
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/newideas" element={<Ideas />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/getpoints" element={<GetPoints />}></Route>

        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/prizes" element={<Prizes />}></Route>
        <Route path="/faq" element={<Faq />}></Route>
        <Route path="/aboutus" element={<AboutUs />}></Route>
        <Route path="/terms" element={<Terms />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
        <Route path="/messages" element={<Messages />}></Route>
      </Routes>
      </HeartsContext.Provider>
    </>
  );
}

export default App;
