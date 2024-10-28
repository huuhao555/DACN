import React, { useEffect, useState } from "react";
import { IMAGES } from "../../../assets/image";
import "./style.scss";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3009/api/product/getAllProduct"
        );
        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        setProducts(Array.isArray(data.data) ? data.data : []);
        console.log(data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>PRODUCT</th>
          <th>COMPANY</th>
          <th>SCREEN SIZE</th>
          <th>PRICE</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product._id}>
            <td>
              <div className="product-info">
                <img src={product.imageUrl} alt={product.name} />
                <div>
                  <h4>{product.Type_name}</h4>
                  {/* <p>{product.Description}</p> */}
                </div>
              </div>
            </td>
            <td>{product.company}</td>
            <td>{product.inches}</td>
            <td>
              <span className="price-old">
                {/* đ{(product.Price * 1.2).toFixed(0)} */}
              </span>
              <span className="price-new">đ{product.prices}</span>
            </td>
            <td>
              <button className="view-btn">👁️</button>
              <button className="edit-btn">✏️</button>
              <button className="delete-btn">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductManagement;
