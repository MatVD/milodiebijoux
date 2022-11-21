import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../public/Logo.png";
import styles from "../styles/Header.module.css";
import Cart from "../public/shopping-bag.png";
import Loop from "../public/search.png";
import { useState } from "react";

const Header = () => {
  const [checked, setChecked] = useState(false);

  return (
    <header
      className={styles.header}
      onClick={() => (checked ? setChecked(!checked) : null)}
    >
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

        <input
          id={styles.menuToggle}
          type="checkbox"
          checked={checked}
          onChange={() => {}}
        />
        <label className={styles.menuButtonContainer} htmlFor="menuToggle">
          <div
            className={styles.menuButton}
            onClick={() => setChecked(!checked)}
          ></div>
        </label>

        <ul className={styles.navul}>
          <li className={styles.navli}>
            <Link href="/products/boucles">Boucles</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/products/bracelets">Bracelets</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/products/colliers">Colliers</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/products/marquespages">Marques-pages</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/products/parures">Parures</Link>
          </li>
          <li className={`${styles.navli} ${styles.navSearch}`}>
            <div style={{ display: "flex" }}>
              <Image
                className={styles.loop2}
                src={Loop}
                alt="Icone d'une loupe"
                width={25}
              />
              <input className={styles.searchBar2} type="text" />
            </div>
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
        <Link href="/Cart">
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
