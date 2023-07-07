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
        <li>About</li>
        <li>Therms and conditions</li>
      </ul>
      <ul>
        <li>Contact us</li>
        <li>Support</li>
      </ul>
    </div>
  );
};

export default Footer;
