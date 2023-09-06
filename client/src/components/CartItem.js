import React from "react";
import { CartContext } from "../CartContext";
import { useContext, useEffect } from "react";
import { getProductData } from "../productsStore";
import { Link } from "react-router-dom";

import styles from "./CartItem.module.css";

export default function CartItem(props) {
  const cart = useContext(CartContext);

  const id = props.id;
  const quantity = props.quantity;
  const productData = getProductData(id);

  return (
    <div className={styles.cart}>
      <Link to={`/${productData.title}`}>
        <div
          className={styles.thumb}
          style={{
            background: `center no-repeat url(${productData.url})`,
            backgroundSize: "cover",
          }}
        />
      </Link>

      <div className={styles.productInfo}>
        <div className={styles.title}>{productData.title}</div>

        <div className={styles.content}>
          {productData.time}
          <br />
          {productData.weekday}
        </div>

        <div className={styles.atcFunc}>
          <p>${(quantity * productData.price).toFixed(2)}</p>

          <div className={styles.atcBtn}>
            {/* <div className={styles.adjust}> */}
            <button
              onClick={() => cart.removeOneFromCart(id)}
              className={styles.minus}
            >
              <img src="./cartMinus.svg" alt="Minus Icon" />
            </button>

            <p>{quantity}</p>

            <button
              onClick={() => cart.addOneToCart(id)}
              className={styles.plus}
            >
              <img src="./cartPlus.svg" alt="Plus Icon" />
            </button>

            {/* </div> */}
            <button
              className={styles.remove}
              onClick={() => cart.deleteFromCart(id)}
            >
              <img src="./cartRemove.svg" alt="Remove Icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
