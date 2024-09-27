import "./style.scss";

import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";

const ProductsComponent = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product, key) => (
        <div className="product-item" key={product.laptop_ID}>
          <img
            className="add-to-img"
            src={product.Image}
            alt={product.Type_name}
          />
          <button className="add-to-cart">
            Thêm giỏ hàng
            <AiOutlineShoppingCart />
          </button>
          <div className="item-product-bottom">
            <h3>{product.Company + " " + product.Type_name}</h3>
            <p>{product.Price.toLocaleString()}đ</p>
            <div className="product-rating">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={index < 0 ? "star filled" : "star"}
                >
                  <AiFillStar />
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsComponent;
