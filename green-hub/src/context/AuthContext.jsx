import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

const AuthContext = React.createContext();

const useAuth = () => {
	return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState();
	const [isGuest, setIsGuest] = useState(true);

	function register(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function login(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logout() {
		return signOut(auth);
	}

	useEffect(() => {
		console.log("isGuest:", isGuest);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
			setIsGuest(false);
			console.log(user);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		isGuest,
		register,
		login,
		logout,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export default useAuth;
