import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineShopping,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

function Cart() {
  const router= useRouter()
  const redirect = () => {
    router.push('/')
  }

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => redirect()}
        >
          <AiOutlineLeft />
          <span className="headind">Your cart:</span>
          <span className="cart-num-items"> 0 items</span>
        </button>

        {0 < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping cart is empty</h3>
            <Link href="/">
              <button
                type="button"
                className="btn"
                onClick={() => redirect()}
              >
                Continue shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {1>= 1 && (
              <div className="product">
                <img
                  src={'#'}
                  className="cart-product-image"
                />
                <div className="item-desc">
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
                      className="remove-item"
                      onClick={() => console.log('Enlevé')}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            )}
          <div>
            {1 >= 0 && (
              <div className="cart-bottom">
                <div className="total">
                  <h3>Subtotal: </h3>
                  <h3>totalPrice€</h3>
                </div>
                <div className="btn-container">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => console.log('Presque payé')}
                  >
                    Payment
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