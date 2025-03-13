import React, { useEffect, useState } from "react";

const Service = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const getCartData = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    };

    getCartData();

    // Listen for updates when items are added to the cart
    const handleCartUpdate = () => getCartData();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-primary">Cart Items</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartItems.map((item, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{item.name}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ₹{item.price}
                  </p>
                  <p className="card-text">
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Service;
