
import { Articles } from "../src/components/Articles/Articles";
import { Routes, Route } from "react-router-dom";
import { ReactDOM } from "react";
import { Toaster } from "react-hot-toast";
import styles from "./App.module.css";
import { Ideas } from "./components";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <Toaster />

      <h1>Welcome to GreenHub</h1>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/newideas" element={<Ideas />}></Route>
      </Routes>
    </>
  );
}

export default App;
