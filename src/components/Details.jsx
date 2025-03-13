import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item; // Retrieve data from navigation state

  if (!item) return <p>No item selected</p>;

  return (
    <div className="flex items-center p-5 border rounded-lg shadow-md w-full">
      {/* Left side - Image */}
      <div className="w-1/3 p-3">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-25 h-auto rounded-lg"
        />
      </div>

      {/* Right side - Details */}
      <div className="w-2/3 p-3">
        <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
        <p className="text-gray-700 mb-2">{item.description}</p>
        <p className="text-gray-800 font-semibold">Price: ₹{item.price}</p>
        <p className="text-green-600 font-medium">
          Availability: {item.availabilityStatus}
        </p>
        <p className="text-gray-600">Category: {item.category}</p>
        <p className="text-yellow-500">Rating: {item.rating} ⭐</p>
        <p className="text-gray-600">Return Policy: {item.returnPolicy}</p>
        <p className="text-gray-600">Warranty: {item.warrantyInformation}</p>
        <p className="text-gray-600">Shipping: {item.shippingInformation}</p>

        {/* Back Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Details;
