import "./App.css";
import { Articles } from "../src/components/Articles/Articles";
import { Routes, Route } from "react-router-dom";
import { ReactDOM } from "react";


function App() {
	
	return (
		<div>
			<h1>Welcome to GreenHub</h1>
		<Routes>
				<Route path="/articles" element={<Articles/>}/>

				<Route path="/" element={<Home />}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
				
				<Route path="/getpoints" element={<GetPoints/>}/>
				<Route path="/prizes" element={<Prizes/>}/>
				<Route path="/newideas" element={<NewIdeas/>}/>
				
		</Routes>
		</div>
	);
	
}

export default App;
