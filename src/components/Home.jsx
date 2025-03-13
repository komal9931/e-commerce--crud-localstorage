import { useEffect, useState } from "react";
import Card from "./Card";

const Home = () => {
  const [products, setProduct] = useState([]);

  const url = "https://dummyjson.com/products";
  const productsData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setProduct(data.products);
  };
  useEffect(() => {
    productsData();
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        {" "}
        {/* Bootstrap row to align cards in a row */}
        {products.map((product) => (
          <Card key={product.id} card={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
