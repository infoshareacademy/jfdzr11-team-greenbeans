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
  Therms,
  Faq,
} from "./components";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Prizes from "./components/Prizes/Prizes";

function App() {
  return (
    <>
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
        <Route path="/therms" element={<Therms />}></Route>
        <Route path="/contactus" element={<ContactUs />}></Route>
      </Routes>
    </>
  );
}

export default App;
