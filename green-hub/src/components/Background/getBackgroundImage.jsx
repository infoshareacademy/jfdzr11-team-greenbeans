import styles from './Background.module.css'
import { UseUserPoints } from '../Utils/UseUserPoints/UseUserPoints';

export const getBackgroundImage = () => {

  const { userPoints } = UseUserPoints();

  if (userPoints >= 1300) {
    return styles.good;
  } else if (userPoints >= 800 && userPoints < 1300) {
    return styles.semi;
  } else {
    return styles.bad;
  }
};