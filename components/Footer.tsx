import React from "react";
import styles from "../styles/Footer.module.css";
import Image from "next/image";
import Insta from "../public/instagram.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr className={styles.separate} />
      <div className={styles.wrapperfooter}>
        <p>©<span className={styles.copyrigth}> - Milodie Bijoux</span> </p>
        <div className={styles.confCgvContact}>
          <p>
            <Link href={"/Contact"}>Contact</Link>{" "}
          </p>
          <p>
            <Link href={"/Conf"}>Politique de confidentialité</Link>{" "}
          </p>
          <p>
            <Link href={"/Cgv"}>CGV</Link>{" "}
          </p>
        </div>
        <a href="#">
          <Image src={Insta} alt="Insta" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
