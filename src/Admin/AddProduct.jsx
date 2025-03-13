import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const [cartItems, setCartItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: "",
    price: "",
    thumbnail: "",
    description: "",
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleRemove = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleUpdate = (index, newPrice, newTitle, newImage) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index
        ? {
            ...item,
            price: newPrice || item.price,
            title: newTitle || item.title,
            thumbnail: newImage || item.thumbnail,
          }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleAddProduct = () => {
    if (!newItem.title || !newItem.price || !newItem.thumbnail) {
      alert("Please fill in all fields");
      return;
    }
    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setNewItem({ title: "", price: "", thumbnail: "", description: "" });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Admin Panel - Add Products</h2>
      <div className="card p-3 mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Product Title"
          value={newItem.title}
          onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Product Description"
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          }
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Product Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Image URL"
          value={newItem.thumbnail}
          onChange={(e) =>
            setNewItem({ ...newItem, thumbnail: e.target.value })
          }
        />
        <button className="btn btn-success" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      <h2 className="mb-3">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartItems.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card p-3 shadow-sm h-100">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <input
                    type="text"
                    className="form-control mb-2"
                    defaultValue={item.title}
                    onBlur={(e) =>
                      handleUpdate(
                        index,
                        item.price,
                        e.target.value,
                        item.thumbnail
                      )
                    }
                  />
                  <p className="card-text">{item.description}</p>
                  <p className="card-text">
                    <strong>Price:</strong> ${item.price}
                  </p>
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Update Price"
                    onBlur={(e) =>
                      handleUpdate(
                        index,
                        Number(e.target.value),
                        item.title,
                        item.thumbnail
                      )
                    }
                  />
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Update Image URL"
                    onBlur={(e) =>
                      handleUpdate(
                        index,
                        item.price,
                        item.title,
                        e.target.value
                      )
                    }
                  />
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleRemove(index)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() =>
                      handleUpdate(
                        index,
                        item.price,
                        item.title,
                        item.thumbnail
                      )
                    }
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddProduct;
