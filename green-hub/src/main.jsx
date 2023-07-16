import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Modal from 'react-modal'

Modal.setAppElement('#root')

ReactDOM.createRoot(document.getElementById("root")).render(

	<React.StrictMode>
		<HashRouter>
			<AuthProvider>
				<Routes>
					<Route
						path="/*"
						element={<App />}
					/>
				</Routes>
			</AuthProvider>
		</HashRouter>
	</React.StrictMode>
);
