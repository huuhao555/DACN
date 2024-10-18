import "./style.scss";
import { useLocation } from "react-router-dom";

const CartPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  return (
    <div className="cart-page">
      <div className="container">
        <div className="row">
          <div className=" col-lg-3"></div>
          <div className=" col-lg-6">
            <div className="cart">
              <div className="cart-header">
                <h2>Giỏ hàng của bạn</h2>
                <div className="cart-content">
                  <div className="cart-item">
                    <div className="cart-item-image">
                      <img src={product.Image} alt={product.Type_name} />
                    </div>
                    <div className="cart-item-name">
                      <h3>{product.Type_name}</h3>
                    </div>
                    <div className="cart-item-price">
                      <h3>{product.Price}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-lg-3"></div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
