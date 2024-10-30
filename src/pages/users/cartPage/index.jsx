import "./style.scss";
import { RiDeleteBin5Line } from "react-icons/ri";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../middleware/UserContext";

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user || !user.dataUser) return; // Check if user is defined before accessing dataUser

    const id = user.dataUser.id;
    const fetchCount = async () => {
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

    fetchCount();
  }, [user]);
  console.log(cart);
  const removeFromCart = (productId) => {
    // Define logic to remove item from cart by productId
  };

  const clearCart = () => {
    // Define logic to clear the cart
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cart && cart.data && cart.data.products.length > 0 ? (
        <div className="cart-container">
          <table className="cart-table">
            <thead>
              <tr>
                {/* <th>Image</th> */}
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {cart.data.products.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.productId.name}</td>
                    <td>${item.productId.prices}</td>
                    <td>{item.quantity}</td>
                    <td>{cart.data.totalPrice}</td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <RiDeleteBin5Line /> Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button className="clear-cart" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
