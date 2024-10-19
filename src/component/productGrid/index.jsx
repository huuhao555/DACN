import "./styleGrid.scss";
import { memo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import { RiCpuLine } from "react-icons/ri";
import { BsDeviceSsdFill } from "react-icons/bs";
import { PiFrameCornersBold } from "react-icons/pi";
import { FaMemory } from "react-icons/fa";
import { ROUTERS } from "../../utils/router";
import { IMAGES } from "../../assets/image";
import React, { useContext } from "react";
import { CartContext } from "../../middleware/CartContext";



const ProductsGridComponent = ({ products }) => {
  // const location = useLocation();
  // const { products } = location.state || {};
  const { addToCart } = useContext(CartContext);


  const handleAddToCart = () => {
    if (products) {
      addToCart(products); // Thêm sản phẩm vào giỏ hàng
      alert(`${products.Company} ${products.Type_name} đã được thêm vào giỏ hàng!`);
    }
  };


  return (
    <div className="product-list">
      {products.map((product) => (
        <div className="product-item" key={product.laptop_ID}>
          <div className="product-item-image">
            <Link to={ROUTERS.USER.DETAILS} state={{ product }}>
              <img
                className="add-to-img"
                src={product.Image}
                alt={product.Type_name}
              />
            </Link>
          </div>

         

          <div className="product-item-bottom">
            <Link to={ROUTERS.USER.DETAILS} state={{ product }}>
              <div className="item-product-bottom">
                <h3>{product.Company + " " + product.Type_name}</h3>
                <div className="proloop-technical">
                  {[
                    { tag: "ssd", icon: <BsDeviceSsdFill />, value: product.Memory },
                    { tag: "lcd", icon: <PiFrameCornersBold />, value: `${product.Inches} inch ${product.ScreenResolution}` },
                    { tag: "ram", icon: <FaMemory />, value: product.Ram },
                    { tag: "cpu", icon: <RiCpuLine />, value: product.Cpu }
                  ].map((item) => (
                    <div className="proloop-technical--line" data-tag={item.tag} key={item.tag}>
                      {item.icon}
                      <span>{item.value}</span>
                    </div>
                  ))}
                </div>

                <p>{product.Price.toLocaleString()}đ</p>
              </div>
            </Link>
          </div>
          <div className="product-item-cart">
            <button
              type="submit"
              className="button btn-buyonl"
              name="buy-onl"
              id="buy-onl"
              onClick={() => handleAddToCart(product)}>
              <span>Thêm vào giỏ</span>
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default ProductsGridComponent;
