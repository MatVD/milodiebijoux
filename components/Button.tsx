import Link from "next/link";
import React, { AnchorHTMLAttributes, MouseEventHandler } from "react";
import styles from "../styles/Button.module.css";

type Props = {
  label: string,
  onClick: any
}

const Button = ({label, onClick}: Props) => {

  return (
      <div className={styles.button} onClick={onClick}>
        {label}
      </div>
  );
};

export default Button;
