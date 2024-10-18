import "./styleGrid.scss";
import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import { ROUTERS } from "../../utils/router";
import { IMAGES } from "../../assets/image";

const ProductsGridComponent = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product, key) => (
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
          <div className="product-item-cart">
            <Link to={ROUTERS.USER.CART} state={{ product }}>
              <h3>Thêm giỏ hàng</h3>
              <AiOutlineShoppingCart />
            </Link>
          </div>
          <div className="product-item-bottom">
            <Link to={ROUTERS.USER.DETAILS} state={{ product }}>
              <div className="item-product-bottom">
                <h3>{product.Company + " " + product.Type_name}</h3>
                <p>{product.Price.toLocaleString()}đ</p>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsGridComponent;
