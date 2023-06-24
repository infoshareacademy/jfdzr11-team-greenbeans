import { Toaster } from "react-hot-toast";
import styles from "./App.module.css";
import { Ideas } from "./components";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<>
			<Toaster />

			<h1>Welcome to GreenHub</h1>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				></Route>
				<Route
					path="/newideas"
					element={<Ideas />}
				></Route>
			</Routes>
		</>
	);
}

export default App;
