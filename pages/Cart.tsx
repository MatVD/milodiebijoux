import React, { useRef } from "react";
import {
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Cart.module.css"
import Button from "../components/Button";

function Cart() {
  const router = useRouter()
  const redirect = () => {
    router.push('/')
  }

  return (
    <div className={styles.cartWrapper} onClick={() => redirect()}>
      <div className={styles.cartContainer}>
        <button
          type="button"
          className={styles.cartHeading}
          onClick={() => redirect()}
        >
          <AiOutlineLeft />
          <span className={styles.headind}>Panier:</span>
          <span className={styles.cartNumItems}> 0 items</span>
        </button>

        {0 < 1 && (
          <div className={styles.emptyCart}>
            <AiOutlineShopping size={120} />
            <h3>Votre panier est vide</h3>
            <br /><br /><br />
            <Button label={'Continuer mes achats'} path={'/'}/>
          </div>
        )}

        <div className={styles.productContainer}>
          {0 >= 1 && (
              <div className={styles.product}>
                <Image
                  src={'https://cdn.sanity.io/images/i5ilgqfl/production/69173b1b2dcf9714836781a9c22174dfb3093e6c-779x694.png?w=2000&fit=max&auto=format'}
                  alt="Image du panier"
                  className={styles.cartProductImage}
                  fill
                />
                <div className={styles.itemDesc}>
                  <div className="flex top">
                    <h5>item.name</h5>
                    <h4>item.price€</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() => console.log('1 en moins')}
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">item.quantity</span>
                        <span
                          className="plus"
                          onClick={() => console.log('1 en plus')
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      className={styles.removeItem}
                      onClick={() => console.log('Enlevé')}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            )}
          <div>
            {0 >= 1 && (
              <div className={styles.cartBottom}>
                <div className={styles.total}>
                  <h3>Subtotal: </h3>
                  <h3>totalPrice€</h3>
                </div>
                <div className={styles.btnContainer}>
                <Button label={'Paiement'} path={'/'}/>
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