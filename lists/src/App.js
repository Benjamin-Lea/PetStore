// Information from https://reactrouter.com/en/main/start/examples
import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Offcanvas, Button } from "react-bootstrap";
import Admin from './admin/Admin.js';
import Home from './home/Home.js';
import Catalog from './Catalog/Catalog.js';
import { CartProvider } from "./Cart/CartContext.js";
import { useCart } from "./Cart/CartContext.js";

export default function App() {

  return (
    <CartProvider>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/catalog" element={<Catalog />} />
          </Route>
        </Routes>
      </div>
    </CartProvider>
  );
}

function Layout() {
  const { openCart, cartQuantity } = useCart();
  return (
    <div>
      <nav class="navbar navbar-expand navbar-dark bg-dark sticky-top">
        <div class="container-fluid">
          <div>
            <Link to="/" class="navbar-brand" > Pet Store </Link>
            <Link to="/catalog" class="btn btn-secondary space-right2"> Catalog </Link>
            <Link to="/admin" class="btn btn-secondary"> Login </Link>
          </div>
          <ul class="navbar-nav">
            <li class="nav-item">
              {cartQuantity > 0 && (
                <Button onClick={openCart} style={{ width: "3rem", height: "3rem", position: "relative" }} variant="outline-primary" className="rounded-circle bg-white">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                    </g><g id="SVGRepo_iconCarrier">
                      <path d="M4.78571 5H18.2251C19.5903 5 20.5542 6.33739 20.1225 7.63246L18.4558 12.6325C18.1836 13.4491 17.4193 14 16.5585 14H6.07142M4.78571 5L4.74531 4.71716C4.60455 3.73186 3.76071 3 2.76541 3H2M4.78571 5L6.07142 14M6.07142 14L6.25469 15.2828C6.39545 16.2681 7.23929 17 8.23459 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM11 19C11 20.1046 10.1046 21 9 21C7.89543 21 7 20.1046 7 19C7 17.8954 7.89543 17 9 17C10.1046 17 11 17.8954 11 19Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                  </svg>
                  <div
                    className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                    style={{
                      color: "white",
                      position: "absolute",
                      width: "1.5rem",
                      height: "1.5rem",
                      bottom: "0",
                      right: "0",
                      transform: "translate(25%, 25%)"
                    }}
                  >{cartQuantity}
                  </div>
                </Button>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

const initialCart = { id: 1, quantity: 1 }; // probably load this from localstorage
