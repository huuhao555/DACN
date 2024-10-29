import "./style.scss";
import { Link } from "react-router-dom";
import { RiCpuLine } from "react-icons/ri";
import { BsDeviceSsdFill } from "react-icons/bs";
import { PiFrameCornersBold } from "react-icons/pi";
import { FaMemory } from "react-icons/fa";
import { ROUTERS } from "../../../utils/router";
import React, { useEffect, useState } from "react";
import { IMAGES } from "../../../assets/image";
const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3009/api/product/getAllProduct"
        );
        console.log(response);
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
    <div className="product-list">
      {products.map((product) => (
        <div className="product-item" key={product._id}>
          <div className="product-item-image">
            <img
              className="add-to-img"
              src={`http://localhost:3009/uploads/images/${product.imageUrl}`}
              alt={product.name}
            />
          </div>

          <div className="product-item-bottom">
            <div className="item-product-bottom">
              <h3>{product.name}</h3>

              <p>{product.prices}đ</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
