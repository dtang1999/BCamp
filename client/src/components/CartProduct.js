import Button from 'react-bootstrap/Button';
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { getProductData } from "../productsStore";

function CartProduct(props) {
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const productData = getProductData(id);

    return (
        <>
            <h3>{productData.title}</h3>
            {/* <p>{quantity} total</p> */}
            <p>${ (quantity * productData.price).toFixed(2) }</p>

            <Button sm="6" onClick={() => cart.removeOneFromCart(id)} className="mx-2">-</Button>
            <span>{quantity}</span>
            <Button sm="6" onClick={() => cart.addOneToCart(id)} className="mx-2">+</Button>

            <Button size="sm" variant="danger" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
            <hr></hr>
        </>
    )
}

export default CartProduct;