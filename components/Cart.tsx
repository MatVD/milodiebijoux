import React, { useRef } from "react";
import {
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import Image from "next/image";
import styles from "../styles/Cart.module.css";
import Button from "./Button";
import { useStateContext } from "../context/context";
import { getStripe } from "../lib/getStripe";

function Cart() {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirection en cours");

    stripe.redirecToCheckout({ sessionId: data.id });
  };

  return (
    <div className={styles.cartWrapper} ref={cartRef}>
      <div className={styles.cartContainer}>
        <button
          type="button"
          className={styles.cartHeading}
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className={styles.headind}>Panier:</span>
          <span className={styles.cartNumItems}>{totalQuantities}</span>
        </button>

        {cartItems.length < 1 && (
          <div className={styles.emptyCart}>
            <AiOutlineShopping size={120} />
            <h3>Votre panier est vide</h3>
            <br />
            <br />
            <br />
            <Button label={"Continuer mes achats"} path={"/"} />
          </div>
        )}

        <div className={styles.productContainer}>
          {cartItems.length >= 1 &&
            cartItems.map((item: any, index: number) => {
              <div className={styles.product}>
                <Image
                  src={item?.image[0]}
                  alt="Image du panier"
                  className={styles.cartProductImage}
                  fill
                />
                <div className={styles.itemDesc}>
                  <div className={`${styles.flex} ${styles.top}`}>
                    <h5>{item.name}</h5>
                    <h4>{item.price} €</h4>
                  </div>
                  <div className={`${styles.flex} ${styles.bottom}`}>
                    <div>
                      <p className={styles.quantityDesc}>
                        <span
                          className={styles.minus}
                          onClick={() => toggleCartItemQuantity(item._id, "dec")}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className={styles.num}>{item.quantity}</span>
                        <span
                          className={styles.plus}
                          onClick={() => toggleCartItemQuantity(item._id, "inc")}
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className={styles.removeItem}
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>;
            })}

          <div>
            {cartItems.length >= 0 && (
              <div className={styles.cartBottom}>
                <div className={styles.total}>
                  <h3>Subtotal: </h3>
                  <h3>{totalPrice} €</h3>
                </div>
                <div className={styles.btnContainer}>
                  <button className={styles.btn} onClick={handleCheckout}>
                    Payement
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
