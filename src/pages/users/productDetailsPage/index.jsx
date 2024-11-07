import { useLocation } from "react-router-dom";
import "./style.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ProductsSlideComponent from "../../../component/user/productSlide";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../middleware/UserContext";
import Notification, {
  NotificationContainer
} from "../../../component/user/Notification";
const ProductDetailsPage = () => {
  const { user, updateCartCount } = useContext(UserContext);
  const { notifications, addNotification } = NotificationContainer();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const location = useLocation();
  const { product } = location.state || {};
  const handleAddToCart = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/cart/add-update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: user.dataUser.id,
            productId: product._id,
            quantity: 1,
            prices: product.prices.toLocaleString("vi-VN")
          })
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      addNotification("Thêm giỏ hàng thành công!");
      const dataCart = await response.json();
      const updatedCount = dataCart.data.products.length;

      updateCartCount(updatedCount);
      // alert("Thêm vào giỏ hàng thành công");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
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
                          <h1>{`${product.company} ${product.name} `} </h1>
                        </div>
                        {/* <div className="product-rating">
                          <span className="number">0.0</span>
                          <span className="icon">
                            <AiFillStar />
                          </span>
                        </div> */}
                      </div>
                      <div className="product-description">
                        <span> Bảo hành chính hãng 24 tháng.</span>

                        <span> Hỗ trợ đổi mới trong 7 ngày.</span>

                        <span> Sửa chữa thay mới linh kiện toàn quốc.</span>

                        <span> Miễn phí giao hàng toàn quốc.</span>

                        <span> Tư vấn miễn phí 24/7.</span>

                        <span>
                          Thanh toán khi nhận hàng (COD) trên toàn quốc.
                        </span>

                        <span>
                          Được kiểm tra sản phẩm trước khi thanh toán.
                        </span>

                        <span> Đổi trả dễ dàng nếu sản phẩm lỗi.</span>
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
                              <td>{product.weight} </td>
                            </tr>
                            <tr>
                              <th>Hệ điều hành</th>
                              <td>{product.opsys}</td>
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
      <div className="notifications-wrapper">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            onClose={() => {
              // Dọn dẹp thông báo
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
