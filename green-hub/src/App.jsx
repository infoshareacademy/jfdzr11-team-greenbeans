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
} from "./components";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Prizes from "./components/Prizes/Prizes";
import {HeartsContext} from "./context/HeartsContext";
import { useState} from 'react';

function App() {
    const [clickedHearts, setClickedHearts] = useState([]);
    const hearts = {clickedHearts, setClickedHearts};
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
      </Routes>
      </HeartsContext.Provider>
    </>
  );
}

export default App;
