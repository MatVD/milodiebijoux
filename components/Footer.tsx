import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr className={styles.separate} />
      <div className={styles.wrapperfooter}>
        <p>Copyrigth</p>
        <p>Contact</p>
        <p>Réseaux sociaux</p>
      </div>
    </footer>
  );
};

export default Footer;
