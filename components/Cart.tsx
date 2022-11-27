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
import getStripe from "../lib/getStripe";
import { Products } from "../typings";

function Cart() {
  const cartRef = useRef(null);
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

    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.status === 500) return;

    const data = await response.json();

    toast.loading("Redirection en cours");

    stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <>
    <div className={styles.cartOverlay} onClick={() => setShowCart(false)}></div>
      <div
        className={styles.cartWrapper}
        ref={cartRef}
        
      >
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
            {console.log(cartItems)}
            {cartItems.length >= 1 &&
              cartItems.map((item: Products, index: number) => {
                return (
                  <div className={styles.product} key={index}>
                    <Image
                      src={item?.images[index]}
                      alt={`Image ${item.title}`}
                      className={styles.cartProductImage}
                      width={75}
                      height={100}
                    />
                    <div className={styles.itemDesc}>
                      <div className={`${styles.flex} ${styles.top}`}>
                        <h5>{item.title} </h5>
                        <h4>{item.price} €</h4>
                      </div>
                      <div className={`${styles.flex} ${styles.bottom}`}>
                        <div>
                          <p className={styles.quantityDesc}>
                            <span
                              className={styles.minus}
                              onClick={() =>
                                toggleCartItemQuantity(item._id, "dec")
                              }
                            >
                              <AiOutlineMinus />
                            </span>
                            <span className={styles.num}>{item.quantity}</span>
                            <span
                              className={styles.plus}
                              onClick={() =>
                                toggleCartItemQuantity(item._id, "inc")
                              }
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
                  </div>
                );
              })}

            <div>
              {cartItems.length >= 1 && (
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
  
    </>
  );
}

export default Cart;
