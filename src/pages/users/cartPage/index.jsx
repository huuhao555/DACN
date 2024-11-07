import "./style.scss";
import { RiDeleteBin5Line } from "react-icons/ri";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../../../middleware/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";

const CartPage = () => {
  const { user, updateCartCount } = useContext(UserContext);
  const navigator = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [cart, setCart] = useState(null);

  const getAllCart = useCallback(async () => {
    if (!user || !user.dataUser) return;
    const id = user.dataUser.id;
    try {
      const response = await fetch(
        `http://localhost:3001/api/cart/get-cart/${id}`
      );
      if (!response.ok) throw new Error(response.statusText);
      const dataCart = await response.json();
      setCart(dataCart);
    } catch (error) {
      console.error("Failed to fetch count for users:", error);
    }
  }, [user]); // Thêm user vào mảng phụ thuộc

  useEffect(() => {
    getAllCart(); // Gọi lại getAllCart khi user thay đổi
  }, [getAllCart]);

  const removeFromCart = async (productId, userID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/cart/delete-product-cart/${userID}/product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      await getAllCart();
      const dataProduct = await response.json();

      updateCartCount(dataProduct.data.products.length);
    } catch (error) {
      console.error("Failed to delete product from cart:", error);
    }
  };

  const clearCart = async (userID) => {
    if (!window.confirm("Bạn có chắc chắn muốn giỏ hàng?")) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/cart/delete-cart/${userID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      await response.json();
      setCart("");
      updateCartCount(0);
    } catch (error) {
      console.error("Failed to delete product from cart:", error);
    }
  };

  const handleIncrease = async ({ id }) => {
    if (!user) alert("Vui lòng đăng nhập");
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
            productId: id,
            quantity: 1
          })
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const dataCart = await response.json();
      setCart(dataCart?.data);
      updateCartCount(dataCart.data.products.length);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const handleDecrease = async (id) => {
    try {
      const response = await fetch("http://localhost:3001/api/cart/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.dataUser.id,
          productId: id,
          quantity: 1
        })
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const dataCart = await response.json();

      const updatedCount = dataCart.data.products.length;
      updateCartCount(updatedCount);
      setCart(dataCart?.data);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const paymentCart = () => {
    navigator(ROUTERS.USER.PAYMENT);
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cart && cart.products.length > 0 ? (
        <div className="cart-container">
          <table className="cart-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {cart.products.map((item, key) => {
                return (
                  <tr key={item._id}>
                    <td>{key + 1}</td>
                    <td>{`${item.productId.name}`}</td>
                    <td>{item.productId.prices.toLocaleString("vi-VN")}VNĐ</td>
                    <td>
                      <div className="handle-quantity">
                        <span
                          onClick={() => handleDecrease(item.productId._id)}
                          className="button-decrease"
                        >
                          –
                        </span>
                        <div>{item.quantity}</div>
                        <span
                          onClick={() =>
                            handleIncrease({
                              id: item.productId._id
                            })
                          }
                          className="button-increase"
                        >
                          +
                        </span>
                      </div>
                    </td>
                    <td>
                      {(item.productId.prices * item.quantity).toLocaleString(
                        "vi-VN"
                      )}
                      VNĐ
                    </td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() =>
                          removeFromCart(item.productId._id, user.dataUser.id)
                        }
                      >
                        <RiDeleteBin5Line /> Xoá
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td
                  colSpan="4"
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Tổng tiền:
                </td>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    paddingLeft: "60px"
                  }}
                >
                  {cart.totalPrice.toLocaleString("vi-VN")}VNĐ
                </td>
              </tr>
            </tbody>
          </table>

          <button
            className="clear-cart"
            onClick={() => clearCart(user.dataUser.id)}
          >
            Xoá giỏ hàng
          </button>
          <button className="payment-cart" onClick={() => paymentCart()}>
            Thanh toán
          </button>
        </div>
      ) : (
        <p>Không có sản phẩm trong giỏ hàng.</p>
      )}
    </div>
  );
};

export default CartPage;
