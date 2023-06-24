
import { Articles } from "../src/components/Articles/Articles";
import { Routes, Route } from "react-router-dom";
import { ReactDOM } from "react";
import { Toaster } from "react-hot-toast";

import { Ideas } from "./components";


function App() {
  return 
		<>
			<Toaster />
			
	<h1>Welcome to GreenHub</h1>
	<Routes>
		 		<Route path="/newideas" element={<Ideas/>}></Route>
		 		<Route path="/articles" element={<Articles/>}/>
				<Route path="/" element={<Home />}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
				<Route path="/getpoints" element={<GetPoints/>}/>
				<Route path="/prizes" element={<Prizes/>}/>
			
    </Routes>
		</>
  ;
}

export default App;
