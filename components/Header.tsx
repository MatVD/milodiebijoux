import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../public/Logo.png";
import styles from "../styles/Header.module.css";
import Cart from "../public/shopping-bag.png";
import Loop from "../public/search.png";
import { useState } from "react";

const Header = () => {
  const [checked, setChecked] = useState(false)


  return (
    <header className={styles.header}>
      <div className={styles.logoAndNav}>
        <Link href="/">
          <Image
            className={styles.logo}
            src={Logo}
            priority={true}
            alt="Logo"
            width={60}
          />
        </Link>

        <input id={styles.menuToggle} type="checkbox" />

        <label
          className={styles.menuButtonContainer}
          htmlFor="menuToggle"
        >
          <div className={styles.menuButton}></div>
        </label>

        <ul className={styles.navul}>
          <li className={styles.navli}>
            <Link href="/products/Boucles">Boucles</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/products/Bracelets">Bracelets</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/products/Colliers">Colliers</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/products/Marques-pages">Marques-pages</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/products/Parures">Parures</Link>
          </li>
        </ul>
      </div>
      <div className={styles.searchAndCart}>
        <div style={{ display: "flex" }}>
          <Image
            className={styles.loop}
            src={Loop}
            alt="Icone d'une loupe"
            width={25}
          />
          <input className={styles.searchBar} type="text" />
        </div>
        <Link href="/cart">
          <Image
            className={styles.cart}
            src={Cart}
            priority={true}
            alt="Cart"
            width={30}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
