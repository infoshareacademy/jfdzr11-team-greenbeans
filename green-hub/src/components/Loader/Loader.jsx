import { ColorRing } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => {
	return (
		<div className={styles.loader_wrapper}>
			<ColorRing
				visible={true}
				height="90"
				width="90"
				ariaLabel="blocks-loading"
				wrapperStyle={{}}
				wrapperClass="blocks-wrapper"
				colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
			/>
		</div>
	);
};

export default Loader;
