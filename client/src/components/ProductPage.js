import React from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.css";
import { productsArray } from "../productsStore";

export default function ProductPage(props) {
  const { productId } = useParams();
  let productData = productsArray.find(
    (product) => product.title === productId
  );
  //   console.log(productData)

  return (
    <div>
      <div
        className={styles.itemImage}
        style={{ background: `no-repeat center url(${productData.url})` }}
      ></div>
      <div className={styles.infoSection}>
        <h1>{productData.title}</h1>
        <h2>{productData.title}</h2>
        <hr />

        <div className={styles.details}>
          <h2>Time & Day</h2>
          <p>{productData.time}</p>
          <p>{productData.weekday}</p>
          <h2>Location</h2>
          <p>
            26923 Fuerte Drive, Lake Forest, CA 92630 (inside Clava Sports
            Facility)
          </p>
          <h2>Class Size</h2>
          <p>Min 6 / Max 12</p>
        </div>

        <div className={styles.cartFunc}>
          <p>${productData.price}</p>
          <button>
            <div className={styles.atc}>Add To Cart</div>
          </button>
        </div>
      </div>
    </div>
  );
}
