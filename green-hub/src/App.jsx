import styles from "./App.module.css"
import { Ideas } from "./components";
import { Routes, Route } from "react-router-dom"

function App() {
  return (
	// <h1>Welcome to GreenHub</h1>
    <Routes>
		  <Route path="/newideas" element={<Ideas/>}></Route>
    </Routes>
  );
}

export default App;
