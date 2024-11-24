import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { UserContext } from "../../../middleware/UserContext";
import "./style.scss";
import ReviewSection from "../../user/ReviewProduct";

const ProductDetail = () => {
  const { user, updateCartCount } = useContext(UserContext);
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

      const dataCart = await response.json();
      const updatedCount = dataCart.data.products.length;
      updateCartCount(updatedCount);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  return (
    <div className="product-detail-body">
      <div className="product-detail-container">
        <div className="row">
          <div className="col-lg-3 product-image-section">
            <Zoom>
              <img
                src={product?.imageUrl}
                className="product-image"
                alt={product?.Type_name}
              />
            </Zoom>
          </div>
          <div className="col-lg-9 product-info-section">
            <div className="product-info-content">
              <h1>{`${product?.company} ${product?.name}`}</h1>
              <div className="product-detail-block">
                <table className="table-info">
                  <tbody>
                    <tr>
                      <th>Màn hình</th>
                      <td>{`${product?.inches} inch ${product?.screenResolution}`}</td>
                    </tr>
                    <tr>
                      <th>CPU</th>
                      <td>{product?.cpu}</td>
                    </tr>
                    <tr>
                      <th>RAM</th>
                      <td>{product?.ram}</td>
                    </tr>
                    <tr>
                      <th>Ổ cứng</th>
                      <td>{product?.memory}</td>
                    </tr>
                    <tr>
                      <th>Card đồ hoạ</th>
                      <td>{product?.gpu}</td>
                    </tr>
                    <tr>
                      <th>Trọng lượng</th>
                      <td>{product?.weight}</td>
                    </tr>
                    <tr>
                      <th>Hệ điều hành</th>
                      <td>{product?.opsys}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewSection productId={product?._id} />
    </div>
  );
};

export default ProductDetail;
