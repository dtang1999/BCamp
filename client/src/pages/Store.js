import { Row, Col } from "react-bootstrap";
import { productsArray } from "../productsStore";
import ProductCard from "../components/ProductCard";

import styles from "./Store.module.css";
// [{... }, {... }, {... }]
function Store() {
  return (
    <div style={{marginLeft: "20px", marginRight: "20px"}}>
      <hr className={styles.stroke} />
      {/* <h1 >Available Classes</h1> */}

      <h1 className={styles.title}>Available Classes</h1>
      {/* <h1 align="center" className="p-3">Welcome to the store!</h1> */}
      
      <Row className="g-3">
        {productsArray.map((product, idx) => (
          <Col xs={6} md={6}  className="d-flex justify-content-center" key={idx}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {/* <div className={styles.centerflex}>
        <div className={styles.itemContainer}>
          {productsArray.map((product, idx) => (
            <div className={styles.itemCard} key={idx}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default Store;
