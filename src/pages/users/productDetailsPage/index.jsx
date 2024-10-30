import { useLocation } from "react-router-dom";
import "./style.scss";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
// import { FcGoogle } from "react-icons/fc";
import ProductsSlideComponent from "../../../component/user/productSlide";
import React, { useContext } from "react";
import { CartContext } from "../../../middleware/CartContext";

const ProductDetailsPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const { addToCart } = useContext(CartContext);
  console.log(product);
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert(
        `${product.Company} ${product.Type_name} đã được thêm vào giỏ hàng!`
      );
      console.log("success");
    }
  };
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
                    <Zoom>
                      <img
                        src={product.imageUrl}
                        style={{
                          width: "375px",
                          height: "300px",
                          objectFit: "contain"
                        }}
                        alt={product.Type_name}
                      />
                    </Zoom>
                  </div>
                  <div className="col-lg-7 product-info">
                    <div className="info-content">
                      <div className="info-top">
                        <div className="product-name">
                          <h1>{product.name} </h1>
                        </div>
                        <div className="product-rating">
                          <span className="number">0.0</span>
                          <span className="icon">
                            <AiFillStar />
                          </span>
                        </div>
                      </div>
                      <div className="product-description">
                        <span>{`${product.Description}`}</span>
                      </div>
                      <div className="info-bottom">
                        <div className="action-buys">
                          <button
                            type="submit"
                            className="button btn-buyonl"
                            name="buy-onl"
                            id="buy-onl"
                            onClick={() => handleAddToCart(product)}
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
          <div className="col-xl-7 col-sm-12 col-12">
            <div className="product-inner">
              <div className="product-block">
                <div className="product-heading">
                  <h2>Thông tin sản phẩm</h2>
                </div>
                <div className="product-wrap">
                  <div className="product-desc--content">
                    <div className="desc-content">
                      <div className="table-info">
                        <table>
                          <thead>
                            <tr>
                              <th>Thông số kĩ thuật:</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>Màn hình</th>
                              <td>
                                {product.inches +
                                  " inch " +
                                  product.screenResolution}
                              </td>
                            </tr>
                            <tr>
                              <th>CPU</th>
                              <td>{product.cpu}</td>
                            </tr>
                            <tr>
                              <th>RAM</th>
                              <td>{product.ram}</td>
                            </tr>
                            <tr>
                              <th>Ổ cứng</th>
                              <td>{product.memory}</td>
                            </tr>
                            <tr>
                              <th>Card đồ hoạ</th>
                              <td>{product.gpu}</td>
                            </tr>
                            <tr>
                              <th>Trọng lượng</th>
                              <td>{product.weight}</td>
                            </tr>
                            <tr>
                              <th>Hệ điều hành</th>
                              <td>{product.opSys}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-sm-12 col-12">
            <div className="product-inner">
              <div className="product-block">
                <div className="product-heading">
                  <h2>Sản phẩm khác</h2>
                </div>
                <div className="product-wrap">
                  <ProductsSlideComponent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
