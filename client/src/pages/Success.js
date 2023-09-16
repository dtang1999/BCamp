import { useContext } from "react";
import { CartContext } from "../CartContext";

function Success() {
  const cart = useContext(CartContext);
  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  // if (productsCount !== 0) {
  //   cart.clearCart();
  // }
  // console.log(cart.checkoutId)

  const paymentStatus = async () => {
    // console.log(cart.checkoutId);
    await fetch("http://localhost:5000/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: cart.checkoutId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response data
        console.log(data.payment_status);
        if (data.payment_status === "paid") {
          cart.clearCart();
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  if (productsCount !== 0) {
    paymentStatus();
  }

  return (
    <>
      <h1>Thank you for your purchase!</h1>
      {/* <button onClick={paymentStatus}>Check Payment Status</button> */}
    </>
  );
}

export default Success;
