import styles from "./GetPointsBox.module.css";
import useAuth from "../../context/AuthContext";
import Modal from "react-modal";
import { useState,useContext } from "react";
import { doc, updateDoc,getDoc } from "@firebase/firestore";
import { db } from "../../config/firebase";
import {HeartsContext} from "../../context/HeartsContext";

const GetPointsBox = ({
	icon,
	title,
	description,
	scaler,
	scale,
	isButton = true,
}) => {
	const [visible, setVisible] = useState(false);
	const [score, setScore] = useState(0);
	const { currentUser } = useAuth();
	const {setAdditionalPoints} = useContext(HeartsContext);

	const closeBox = () => {
		setVisible(false);
		setScore(0);
	};

	const updateUserPoints = async (e, id) => {
		e.preventDefault();
		const updatedPoints = Number(score) * Number(scale);
		const docRef = doc(db, "users", id);

		try {
			var docobj = await getDoc(docRef);
			var currentPoints = 0;
			if(docobj.exists){
				currentPoints = docobj.data().points;
			}
			await updateDoc(docRef, { points: currentPoints+updatedPoints });
			setAdditionalPoints(updatedPoints);
			closeBox();
		} catch {
			console.log("nie udało się");
		}
	};

	return (
		<div className={styles.getpointsBox}>
			<div className={styles.img}>
				<img src={icon} />
			</div>
			<div className={styles.paragraph}>
				<p>{title}</p>
				<p>{description}</p>
				<p>{scaler}</p>
				<span>need more info? click here</span>
				<button>
					<img src="../../../assets/images/page-points/about-us.png" />
				</button>
			</div>
			{isButton && (
				<button
					disabled={!currentUser?.uid}
					onClick={() => {
						setVisible(true);
					}}
				>
					SUBMIT POINTS
				</button>
			)}
			{!isButton && null}
			<Modal
				isOpen={visible}
				onRequestClose={closeBox}
				className={styles.info}
			>
				<button
					className={styles.cancel}
					onClick={closeBox}
				>
					✖
				</button>
				<img
					src="../../../assets/images/page-main/heart.png"
					className={styles.background}
				/>

				<h3>{title}</h3>
				<p>Please enter your score:</p>
				<form
					onSubmit={(e) => {
						updateUserPoints(e, currentUser.uid);
					}}
				>
					<div>
						<span>{scale} * </span>
						<input
							type="number"
							name="points"
							id="points"
							defaultValue={0}
							onChange={(e) => {
								setScore(e.target.value);
								console.log(e.target.value);
							}}
						/>
						<span> = {score * scale}</span>
					</div>

					<button>CONFIRM</button>
				</form>
			</Modal>
		</div>
	);
};

export default GetPointsBox;
