import {
	Articles,
	Login,
	Register,
	GetPoints,
	Ideas,
	Home,
	ForgotPassword,
} from "./components";
import { Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<>
			<Toaster />

			
			<Routes>
				<Route
					path="/"
					element={<Home />}
				></Route>
				<Route
					path="/newideas"
					element={<Ideas />}
				></Route>
				<Route
					path="/login"
					element={<Login />}
				></Route>
				<Route
					path="/register"
					element={<Register />}
				></Route>
				<Route
					path="/forgotpassword"
					element={<ForgotPassword />}
				></Route>
				<Route
					path="/getpoints"
					element={<GetPoints />}
				></Route>

				<Route
					path="/articles"
					element={<Articles />}
				></Route>
			</Routes>
		</>
	);
}

export default App;
