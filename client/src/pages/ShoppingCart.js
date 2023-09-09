import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import CartItem from "../components/CartItem";

import styles from "./ShoppingCart.module.css";

function ShoppingCart() {
  const cart = useContext(CartContext);
  // console.log(cart)
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  // change fetch url to localhost:5000 for testing
  // https://bcamp-e821b244874c.herokuapp.com/checkout

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

        <div className={styles.title}>
          <button className={styles.backArrow} onClick={goBack}>
            <img src="./backArrow.svg" alt="Back Arrow Button"></img>
          </button>

          <h1>Shopping Cart</h1>
        </div>
      </div>
      {productsCount > 0 ? (
        <>
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

            <button className={styles.paynow} onClick={checkout}>
              Pay Now
            </button>
          </div>
        </>
      ) : (
        // Empty cart page
        <div className={styles.empty}>
          <div className={styles.text}>Your cart is empty</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M80 80C82.6522 80 85.1957 81.0536 87.0711 82.9289C88.9464 84.8043 90 87.3478 90 90C90 92.6522 88.9464 95.1957 87.0711 97.0711C85.1957 98.9464 82.6522 100 80 100C77.3478 100 74.8043 98.9464 72.9289 97.0711C71.0536 95.1957 70 92.6522 70 90C70 84.45 74.45 80 80 80ZM0 0H16.35L21.05 10H95C96.3261 10 97.5979 10.5268 98.5355 11.4645C99.4732 12.4021 100 13.6739 100 15C100 15.85 99.75 16.7 99.4 17.5L81.5 49.85C79.8 52.9 76.5 55 72.75 55H35.5L31 63.15L30.85 63.75C30.85 64.0815 30.9817 64.3995 31.2161 64.6339C31.4505 64.8683 31.7685 65 32.1 65H90V75H30C27.3478 75 24.8043 73.9464 22.9289 72.0711C21.0536 70.1957 20 67.6522 20 65C20 63.25 20.45 61.6 21.2 60.2L28 47.95L10 10H0V0ZM30 80C32.6522 80 35.1957 81.0536 37.0711 82.9289C38.9464 84.8043 40 87.3478 40 90C40 92.6522 38.9464 95.1957 37.0711 97.0711C35.1957 98.9464 32.6522 100 30 100C27.3478 100 24.8043 98.9464 22.9289 97.0711C21.0536 95.1957 20 92.6522 20 90C20 84.45 24.45 80 30 80ZM75 45L88.9 20H25.7L37.5 45H75Z"
              fill="#F9C108"
            />
          </svg>
          <Link to={"/"}>
            <button>Shop Now</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
