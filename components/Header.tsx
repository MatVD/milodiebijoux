import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../public/Logo.png";
import styles from "../styles/Header.module.css";
import cart from "../public/shopping-bag.png";
import Cart from "./Cart";
import Loop from "../public/search.png";
import { useState } from "react";
import { useStateContext } from "../context/context";

const Header = () => {
  const [checked, setChecked] = useState(false);
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div
      className={styles.wrapperHeader}
      onClick={() => (checked ? setChecked(!checked) : null)}
    >
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
          <button className={styles.cartIcon} onClick={() => setShowCart(true)}>
            <Image
              className={styles.cart}
              src={cart}
              priority={true}
              alt="Panier"
              width={35}
            />
            {totalQuantities >= 1 && (
              <span className={styles.cartItemQty}>{totalQuantities}</span>
            )}
          </button>
          {showCart && <Cart />}
        </div>
      </header>
    </div>
  );
};

export default Header;
