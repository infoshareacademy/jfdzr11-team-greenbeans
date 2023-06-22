import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyC9Ska1ZKPhjPtnMQiVhRNdFjVdj_8tscQ",
	authDomain: "greenhub-66a3d.firebaseapp.com",
	projectId: "greenhub-66a3d",
	storageBucket: "greenhub-66a3d.appspot.com",
	messagingSenderId: "175021899961",
	appId: "1:175021899961:web:6356ed9e7eb9ca1a88db68",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
