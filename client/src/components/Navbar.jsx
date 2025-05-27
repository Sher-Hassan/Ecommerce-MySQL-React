import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import axios from "../utils/axios";
import "../styles/Navbar.css";

const Navbar = ({ user = null, handleLogout }) => {
  console.log("Navbar user prop:", user);
  console.log("Navbar user?.UserID:", user?.UserID);

  const { cart, setCart } = useCart();
  const [showCart, setShowCart] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`/cart/${user?.UserID}`);
        setCart(res.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (user?.UserID) {
      fetchCart();
    }
  }, [user, setCart]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.Price * item.Quantity, 0);

  const handleLogoutAndClearCart = () => {
    setCart([]);
    handleLogout();
  };

  const handleClearCart = async () => {
    try {
      await axios.delete(`/cart/clearCart/${user.UserID}`);
      setCart([]);
      console.log("Cart cleared.");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-left">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Products">Products</Link>
          </li>
          <li>
            <Link to="/About">About Us</Link>
          </li>
        </ul>
      </div>
      <div className="logo">GIZMO</div>
      <div style={{ position: "relative" }}>
        <ul className="nav-links">
          {user ? (
            <>
              <li style={{ position: "relative" }}>
                <span
                  onClick={() => setShowCart((v) => !v)}
                  style={{ cursor: "pointer" }}
                >
                  Cart{" "}
                  {cart.length > 0 && (
                    <span className="cart-count">{cart.length}</span>
                  )}
                </span>
                {showCart && (
                  <div className="cart-dropdown">
                    <h3>Cart</h3>
                    {cart.length === 0 ? (
                      <div>No items in cart.</div>
                    ) : (
                      cart.map((item, idx) => (
                        <div key={idx} className="cart-item">
                          <img src={item.Cover} alt={item.ProductName} />
                          <div>
                            <span>{item.ProductName}</span>
                            <span>Qty: {item.Quantity}</span>
                            <span>Size: {item.Size}</span>
                          </div>
                          <span>${(item.Price * item.Quantity).toFixed(2)}</span>
                        </div>
                      ))
                    )}
                    <div>Total: ${total.toFixed(2)}</div>
                    <button onClick={handleClearCart}>Clear Cart</button>
                  </div>
                )}
              </li>
              <li>{user.UserName}</li>
              <li onClick={handleLogoutAndClearCart}>Logout</li>
            </>
          ) : (
            <>
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/Register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;