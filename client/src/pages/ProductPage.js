import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProductPage.module.css";
import { productsArray } from "../productsStore";
import { CartContext } from "../CartContext";
import { useContext } from "react";

export default function ProductPage(props) {
  const { productId } = useParams();
  let productData = productsArray.find(
    (product) => product.title === productId
  );

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  //   console.log(productData)

  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(productData.id);
  console.log(productQuantity);

  return (
    <div className={styles.productPage}>
      <div
        className={styles.itemImage}
        style={{ background: `no-repeat center url(${productData.url})` }}
      >
        <button className={styles.backArrow} onClick={goBack}>
          <img src="./backArrow.svg" alt="Back Arrow Button"></img>
        </button>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.header}>
          <h1>{productData.title}</h1>
          <h2>{productData.title}</h2>
          <hr />
        </div>

        <div className={styles.details}>
          <h2>Time & Day</h2>
          <div className={styles.timeDay}>
            <p>{productData.time}</p>
            <p>{productData.weekday}</p>
          </div>
          <h2>Location</h2>
          <p>
            26923 Fuerte Drive, Lake Forest, CA 92630 (inside Clava
            SportsFacility)
          </p>
          <h2>Class Size</h2>
          <p>Min 6 / Max 12</p>
        </div>
      </div>

      <div className={styles.cartWrap}>
        <div className={styles.cartFunc}>
          <p>${productData.price}</p>
          {productQuantity > 0 ? (
            <div className={styles.adjust}>
              <button
                onClick={() => cart.removeOneFromCart(productData.id)}
                className={styles.minus}
              >
                <img src="./minusIcon.svg" alt="Minus Icon" />
              </button>
              <p style={{ color: "#000" }}>{productQuantity}</p>
              <button
                onClick={() => cart.addOneToCart(productData.id)}
                className={styles.plus}
              >
                <img src="./plusIcon.svg" alt="Plus Icon" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => cart.addOneToCart(productData.id)}
              className={styles.atcbtn}
            >
              <div className={styles.atctext}>Add To Cart</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
