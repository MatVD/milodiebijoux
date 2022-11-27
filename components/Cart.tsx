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

  const handleCheckout = async (event: React.MouseEvent) => {
    const stripe = await getStripe();

    
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
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
              <Button label={"Continuer mes achats"} onClick={() => setShowCart(false)} />
            </div>
          )}

          <div className={styles.productContainer}>
            {cartItems.length >= 1 &&
              cartItems.map((item: Products, index: number) => {
                return (
                  <div className={styles.product} key={index}>
                    <Image
                      src={item?.images[0]}
                      alt={`Image ${item.title}`}
                      className={styles.cartProductImage}
                      width={75}
                      height={100}
                    />
                    <div className={styles.itemDesc}>
                      <div className={`${styles.flex} ${styles.top}`}>
                        <h4>{item.title}</h4>
                        <h5>{item.price} € </h5>
                      </div>
                      <div className={`${styles.flex} ${styles.bottom}`}>
                        <>
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
                        </>
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

            <>
              {cartItems.length >= 1 && (
                <div className={styles.cartBottom}>
                  <div className={styles.total}>
                    <h5>Total panier : </h5>
                    <h5>{totalPrice} €</h5>
                  </div>
                  <div className={styles.btnContainer}>
                    <button className={styles.btn} onClick={handleCheckout}>
                      Payement
                    </button>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
  
    </>
  );
}

export default Cart;
