import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = ({ setIsAuthenticated }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Check authentication status from localStorage
  const isAuthenticated = !!localStorage.getItem("userToken");

  useEffect(() => {
    // Function to update cart data from localStorage
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    };

    // Initial cart update
    updateCart();

    // Listen for custom event when cart is updated
    const handleCartUpdate = () => updateCart();

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Clear user token
    setIsAuthenticated(false); // Update authentication state in App.js
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container">
        <a className="navbar-brand fw-bold text-primary" href="#">
          UrbanNest
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <NavLink
                className="nav-link active text-dark fw-semibold"
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark fw-semibold" to="/admin">
                Admin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark fw-semibold" to="/service">
                Services
              </NavLink>
            </li>
            <span className="nav-link fw-semibold text-primary">
              Cart ({cartItems.length})
            </span>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2 border rounded-pill"
              type="search"
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="btn btn-primary rounded-pill px-4" type="submit">
              Search
            </button>
          </form>
          {/* Show Logout Button Only If User is Logged In */}
          {isAuthenticated && (
            <button
              className="btn btn-danger ms-3 rounded-pill"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
