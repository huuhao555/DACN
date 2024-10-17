import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import { ROUTERS } from "../../utils/router";

const ProductsComponent = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product, key) => (
        <div className="product-item" key={product.laptop_ID}>
          <Link to={ROUTERS.USER.DETAILS} state={{ product }}>
            <img
              className="add-to-img"
              src={product.Image}
              alt={product.Type_name}
            />
          </Link>
          <button className="add-to-cart">
            Thêm giỏ hàng
            <AiOutlineShoppingCart />
          </button>

          <Link to={ROUTERS.USER.DETAILS} state={{ product }}>
            <div className="item-product-bottom">
              <h3>{product.Company + " " + product.Type_name}</h3>
              <p>{product.Price.toLocaleString()}đ</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsComponent;
