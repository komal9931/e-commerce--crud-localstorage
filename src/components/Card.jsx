import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ card }) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(card);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Item added to cart!");
  };

  const senddata = (item) => {
    // console.log("Navigating to details with:", item);
    navigate("/detail", { state: { item } }); // Sending selected item data
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card p-3 shadow-sm h-100">
        <img
          src={card.thumbnail}
          alt={card.title}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          <p className="card-text">{card.description}</p>
          <p className="card-text">
            <strong>Price:</strong> ${card.price}
          </p>
          <div className="d-flex gap-5">
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => senddata(card)} // Pass card data here
            >
              Show Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
