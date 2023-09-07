import { Button, Navbar, Modal, Nav } from "react-bootstrap";
import { useState, useContext } from "react";
import { CartContext } from "../CartContext";
// import CartProduct from "./CartProduct";
import { Link } from "react-router-dom";

function NavbarComponent() {
  const cart = useContext(CartContext);

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

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

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <>
      <Navbar
        className="justify-content-between"
        style={{ padding: "10px 20px" }}
      >
        <Navbar.Brand>
          <Link to={"/"}>
            <img
              style={{ width: "100px", height: "40px" }}
              src="./connectedLogo.png"
              alt="Connected Sports Logo"
            />
          </Link>
        </Navbar.Brand>

        <Link to={"./cart"}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src="./cartLogo.svg"
              alt="Shopping Cart Logo"
              style={{ width: "30px", height: "30px" }}
            />
            {productsCount > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  backgroundColor: "#EC4242",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "700",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {productsCount}
              </div>
            )}
          </div>
        </Link>
      </Navbar>

      {/* <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ?
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map( (currentProduct, idx) => (
                                <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                            ))}

                            <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>

                            <Button variant="success" onClick={checkout}>
                                Purchase items!
                            </Button>
                        </>
                    :
                        <h1>There are no items in your cart!</h1>
                    }
                </Modal.Body>
            </Modal> */}
    </>
  );
}

export default NavbarComponent;
