import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar";
// import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cancel from "./pages/Cancel";
import Store from "./pages/Store";
import Success from "./pages/Success";
import CartProvider from "./CartContext";
import ProductPage from "./pages/ProductPage";
import ShoppingCart from "./pages/ShoppingCart";
// localhost:3000 -> Home
// localhost:3000/success -> Success

function App() {
  return (
    <CartProvider>
      {/* <Container> */}
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route index element={<Store />} />
          {/* <Route path="store" element={<Store />} /> */}
          <Route path="cart" element={<ShoppingCart />} />
          <Route path="/:productId" element={<ProductPage />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
        </Routes>
      </BrowserRouter>
      {/* </Container> */}
    </CartProvider>
  );
}

export default App;
