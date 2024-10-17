import { useLocation } from "react-router-dom";
import "./style.scss";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";

const ProductDetailsPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  return (
    <div className="product-body">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            {" "}
            <div className="product-inner">
              <div className="product-main">
                <div className="d-flex flex-wrap">
                  <div className="col-lg-4 product-image">
                    <img
                      src={product.Image}
                      style={{ width: "375px" }}
                      alt={product.Type_name}
                    />
                  </div>
                  <div className="col-lg-7 product-info">
                    <div className="info-content">
                      <div className="info-top">
                        <div className="product-name">
                          <h1>{`${product.Company} ${product.Type_name} `}</h1>
                        </div>
                        <div className="product-rating">
                          <span className="number">0.0</span>
                          <span className="icon">
                            <AiFillStar />
                          </span>
                        </div>
                      </div>
                      <div className="info-bottom">
                        <div></div>
                        <div></div>
                        <div className="action-buys">
                          <button
                            type="submit"
                            class="button btn-buyonl"
                            name="buy-onl"
                            id="buy-onl"
                          >
                            <span className="icon-addtocart">
                              <AiOutlineShoppingCart />
                            </span>
                            Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-7"></div>
          <div className="col-xl-5"></div>
          <div className="col-xl-12"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
