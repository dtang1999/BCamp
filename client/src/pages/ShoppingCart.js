import React from "react";
import { useState, useContext } from "react";
import { CartContext } from "../CartContext";
import CartItem from "../components/CartItem";

import styles from "./ShoppingCart.module.css";

export default function () {
  const cart = useContext(CartContext);
  console.log(cart)

  const checkout = async () => {
    await fetch("https://bcamp-e821b244874c.herokuapp.com/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: cart.items }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.url) {
          window.location.assign(response.url); // Forwarding user to Stripe
        }
      });
  };

  return (
    <div className={styles.cart}>
      <div className={styles.header}>
        <hr className={styles.stroke} />
        <h1 className={styles.title}>Shopping Cart</h1>
      </div>

      <div className={styles.cartItem}>
        {cart.items.map((currentProduct, idx) => (
          <CartItem
            key={idx}
            id={currentProduct.id}
            quantity={currentProduct.quantity}
          ></CartItem>
        ))}
      </div>

      <div className={styles.summary}>
        <h2>Order Summary</h2>
        <div className={styles.line}>
          <p>Subtotal</p>
          <p>${cart.getTotalCost().toFixed(2)}</p>
        </div>
        {/* <div className={styles.line}>
          <p>Discount</p>
          <p>-$5</p>
        </div> */}
        <hr className={styles.stroke} />
        <div className={styles.line}>
          <p>Total</p>
          <p className={styles.total}>${cart.getTotalCost().toFixed(2)}</p>
        </div>

        <button className={styles.paynow} onClick={checkout}>Pay Now</button>
      </div>
    </div>
  );
}
