import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <ul>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
          <Link to="/aboutus">About</Link>
        </li>
        <li>
          <Link to="/terms">Terms and conditions</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/contactus">Contact us</Link>
        </li>
        {/* <li>Support</li> */}
      </ul>
    </div>
  );
};

export default Footer;
