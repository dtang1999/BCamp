// import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext } from "react";

import { Link } from "react-router-dom";

import styles from "./ProductCard.module.css";

function ProductCard(props) {
  // props.product is the product we are selling
  const product = props.product;
  const cart = useContext(CartContext);
  // const productQuantity = cart.getProductQuantity(product.id);
  console.log(cart.items);
  return (
    // <Card style={{height: '280px', width: '300px'}}>
    //     <Card.Body style={{display: "flex", flexDirection: "column", justifyContent:"end", alignItems:"center"}}>
    //         <Card.Title>{product.title}</Card.Title>
    //         <Card.Text>${product.price}</Card.Text>
    //         { productQuantity > 0 ? // if the item quantity if greater than 0 display the +/- button to add/remove
    //             <>
    //                 <Form as={Row}>
    //                     {/* <Form.Label column="true" sm="6">In Cart: {productQuantity}</Form.Label> */}
    //                     <Col>
    //                         <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">-</Button>
    //                             <span>{productQuantity}</span>
    //                         <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">+</Button>
    //                     </Col>
    //                 </Form>
    //                 {/* <Button variant="danger" onClick={() => cart.deleteFromCart(product.id)} className="my-2">Remove from cart</Button> */}
    //             </>
    //             : // handle the case that 0 item quantity in cart
    //             <Button variant="primary" onClick={() => cart.addOneToCart(product.id)}>Add To Cart</Button>
    //         }
    //     </Card.Body>
    // </Card>
    <div className={styles.pcard}>
      <Link to={`/${product.title}`}>
        <div
          className={styles.bgImage}
          style={{
            background: `center no-repeat url(${product.url})`,
            backgroundSize: "cover",
          }}
        />
      </Link>
      
      {/* Rework on the style */}
      <div className={styles.lower}>
        <div className={styles.text}>
          <div className={styles.itemTitle}>{product.title}</div>
          <div className={styles.itemPrice}>${product.price}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
