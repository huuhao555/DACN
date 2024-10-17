import { useLocation } from "react-router-dom";
import "./style.scss";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FcGoogle } from "react-icons/fc";
import ProductsSlideComponent from "../../../component/productSlide/";
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
                    <Zoom>
                      <img
                        src={product.Image}
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
                          <h1>{`${product.Company} ${product.Type_name} `}</h1>
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
                                {product.Inches +
                                  " inch " +
                                  product.ScreenResolution}
                              </td>
                            </tr>
                            <tr>
                              <th>CPU</th>
                              <td>{product.Cpu}</td>
                            </tr>
                            <tr>
                              <th>RAM</th>
                              <td>{product.Ram}</td>
                            </tr>
                            <tr>
                              <th>Ổ cứng</th>
                              <td>{product.Memory}</td>
                            </tr>
                            <tr>
                              <th>Card đồ hoạ</th>
                              <td>{product.Gpu}</td>
                            </tr>
                            <tr>
                              <th>Trọng lượng</th>
                              <td>{product.Weight}</td>
                            </tr>
                            <tr>
                              <th>Hệ điều hành</th>
                              <td>{product.OpSys}</td>
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
                  <ProductsSlideComponent />
                </div>
                <div className="product-wrap"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
