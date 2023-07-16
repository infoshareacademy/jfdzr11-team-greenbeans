import styles from "./PrizesBox.module.css";
import useAuth from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import Modal from "react-modal";
import { useState } from "react";
import { UseUserPoints } from "../Utils/UseUserPoints/UseUserPoints";
import { doc, updateDoc } from "@firebase/firestore";
import { db } from "../../config/firebase";

const PrizesBox = ({ logo, prize, points, shop }) => {
	const [visible, setVisible] = useState(false);
	const [isActivated, setIsActivated] = useState(false);

	const { userPoints } = UseUserPoints();
	const { currentUser } = useAuth();

	const closeBox = () => {
		setVisible(false);
		setIsActivated(false);
	};

	const updateUserPoints = async (id, prizePoints) => {
		setIsActivated(true);
		const updatedPoints = userPoints - prizePoints;
		const docRef = doc(db, "users", id);

		try {
			await updateDoc(docRef, { points: updatedPoints });
		} catch {
			console.log("nie udało się");
		}
	};

	return (
		<>
			{currentUser && userPoints >= points ? (
				<>
					<button
						className={styles.box}
						onClick={() => {
							setVisible(true);
						}}
					>
						<img src={logo} />
						<span>{prize}</span>
						<span className={styles.points}>{points} points</span>
					</button>
				</>
			) : (
				<button className={`${styles.box} ${styles.disabled}`}>
					<img
						src="/jfdzr11-team-greenbeans/assets/images/page-prize/lock.png"
						className={styles.lock}
					/>
					<img src={logo} />
					<span>{prize}</span>
					<span className={styles.points}>{points} points</span>
				</button>
			)}
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
					src="/jfdzr11-team-greenbeans/assets/images/page-main/trophy.png"
					className={styles.background}
				/>

				<h3>
					{prize} {shop}
				</h3>
				<p>points: {points}</p>
				{!isActivated && (
					<div>
						<p>activate your prize here: </p>
						<button
							onClick={() => {
								updateUserPoints(currentUser.uid, points);
							}}
						>
							ACTIVATE
						</button>
					</div>
				)}
				{isActivated && (
					<div className={styles.activated}>
						<img src="/jfdzr11-team-greenbeans/assets/images/page-prize/code.png" />
						<p className={styles.code}>{uuidv4()}</p>
					</div>
				)}
			</Modal>
		</>
	);
};

export default PrizesBox;
