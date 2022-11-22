import Link from "next/link";
import React from "react";
import styles from "../styles/Button.module.css";

const Button = () => {
  return (
    <Link href="/products/boucles">
      <div className={styles.button}>Acheter maintenant</div>
    </Link>
  );
};

export default Button;
