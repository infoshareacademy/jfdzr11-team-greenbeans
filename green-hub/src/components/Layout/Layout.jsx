import React from "react";
import styles from "../Layout/Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.app}>
      <div className={styles.navbar}></div>
      <div className={styles.page_content}></div>
    </div>
  );
};

export default Layout;
