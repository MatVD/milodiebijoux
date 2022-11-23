import Link from "next/link";
import React from "react";
import styles from "../styles/Button.module.css";

type Props = {
  label: string,
  path: string,
}

const Button = ({label, path}: Props) => {

  return (
    <Link href={`${path}`}>
      <div className={styles.button}>
        {label}
      </div>
    </Link>
  );
};

export default Button;
