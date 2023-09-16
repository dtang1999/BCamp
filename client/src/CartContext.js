import { createContext, useEffect, useState } from "react";
import { productsArray, getProductData } from "./productsStore";

export const CartContext = createContext({
  checkoutId: "",
  setId: () => {},
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  clearCart: () => {},
});

// check if anything stored in the local storage
const getInitialState = () => {
  const cartProducts = sessionStorage.getItem("cartProducts");
  return cartProducts ? JSON.parse(cartProducts) : [];
};

const getId = () => {
  const checkoutId = sessionStorage.getItem("checkoutId");
  return checkoutId ? checkoutId : "";
};

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState(getInitialState);
  const [checkoutId, setCheckoutId] = useState(getId);

  // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]

  // local storage listener
  useEffect(() => {
    sessionStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    sessionStorage.setItem("checkoutId", checkoutId);
  }, [checkoutId]);

  function setId(id) {
    setCheckoutId(id);
    return;
  }

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      // product is not in cart
      setCartProducts([
        ...cartProducts, // "..." is work like making copy of the element
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      // product is in cart
      // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]    add to product id of 2
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.id === id // if condition
              ? { ...product, quantity: product.quantity + 1 } // if statement is true
              : product // if statement is false
        )
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.id === id // if condition
              ? { ...product, quantity: product.quantity - 1 } // if statement is true
              : product // if statement is false
        )
      );
    }
  }

  function deleteFromCart(id) {
    // [] if an object meets a condition, add the object to array
    // [product1, product2, product3]
    // [product1, product3]
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id !== id;
      })
    );
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.map((cartItem) => {
      const productData = getProductData(cartItem.id);
      totalCost += productData.price * cartItem.quantity;
    });
    return totalCost;
  }

  function clearCart() {
    setCartProducts([]);
  }

  const contextValue = {
    checkoutId,
    setId,
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;

// CODE DOWN HERE

// Context (cart, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context
