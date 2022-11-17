import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../public/Logo.png";
import styles from "../styles/Header.module.css";
import Cart from "../public/shopping-bag.png";
import Loop from "../public/search.png";

const Header = () => {
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
        <ul className={styles.navul}>
          <li className={styles.navli}>
            <Link href="/boucles">Boucles</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/bracelets">Bracelets</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/colliers">Colliers</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/marques-pages">Marques-pages</Link>
          </li>
          <li className={styles.navli}>
            <Link href="/parures">Parures</Link>
          </li>
        </ul>
      </div>
      <div className={styles.searchAndCart}>
        <div>
          <Image 
          className={styles.loop} 
          src={Loop} 
          alt="Icone d'une loupe"
          width={20}
          />
          <input className={styles.searchBar} type="text" />
        </div>
        <Link href="/cart">
          <Image
            className={styles.cart}
            src={Cart}
            priority={true}
            alt="Cart"
            width={40}
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
