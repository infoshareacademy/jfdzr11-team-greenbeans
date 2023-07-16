import Modal from "react-modal";
import { Link } from "react-router-dom";
import styles from "./HomeInfoBox.module.css"

const HomeInfoBox = ({visible, close }) => {
  return (
    <Modal
				isOpen={visible}
				onRequestClose={close}
				className={styles.info}
			>
				<button
					className={styles.cancel}
					onClick={close}
				>
					✖
				</button>
                <p>First time here?<br></br> Let me explain what U can do here!</p>
                <ul>
                    <li>📖 stay aware by reading some <Link to="articles">articles</Link></li>
                    <li>🌳🏆 get some <Link to="getpoints">points</Link> which allows U to get <Link to="prizes">prizes</Link></li>
                    <li>💡 help us to find  <Link to="newideas">ideas</Link> how to take care about ourselves and planet!</li>
                </ul>
                <p>to use our app please <Link to="register">REGISTER</Link></p>
                <p>if U have more question go to <Link to="faq">FAQ</Link></p>
			</Modal>
  )
}

export default HomeInfoBox