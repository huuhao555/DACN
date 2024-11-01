import "./style.scss";
import { RiDeleteBin5Line } from "react-icons/ri";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../middleware/UserContext";
import { useLocation } from "react-router-dom";

const CartPage = () => {
  const { user, countCart, updateCartCount } = useContext(UserContext);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [cart, setCart] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getAllCart = async () => {
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
  };

  useEffect(() => {
    getAllCart();
  }, [user]);

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
      console.log(dataProduct);
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
      const dataProductRemove = await response.json();
      setCart("");
      updateCartCount(0);
    } catch (error) {
      console.error("Failed to delete product from cart:", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cart
    ? cart.products.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cart && cart.products.length > 0 ? (
        <div className="cart-container">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.productId.name}</td>
                  <td>{item.productId.prices.toLocaleString("vi-VN")}đ</td>
                  <td>{item.quantity}</td>
                  <td>
                    {(item.productId.prices * item.quantity).toLocaleString(
                      "vi-VN"
                    )}
                    đ
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
              ))}
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Tổng tiền giỏ hàng:
                </td>
                <td
                  colSpan="2"
                  style={{
                    textAlign: "left",
                    fontWeight: "bold",
                    paddingLeft: "60px"
                  }}
                >
                  {cart.totalPrice.toLocaleString("vi-VN")}đ
                </td>
              </tr>
            </tbody>
          </table>

          <div className="pagination">
            {Array.from(
              { length: Math.ceil(cart.products.length / itemsPerPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>

          <button
            className="clear-cart"
            onClick={() => clearCart(user.dataUser.id)}
          >
            Xoá giỏ hàng
          </button>
        </div>
      ) : (
        <p>Không có sản phẩm trong giỏ hàng.</p>
      )}
    </div>
  );
};

export default CartPage;
