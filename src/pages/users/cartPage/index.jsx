import "./style.scss";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CartContext } from "../../../middleware/CartContext";
import React, { useContext } from "react";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {groupedCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          <ul>
            {groupedCart.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.Image}
                  alt={item.Type_name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h2>
                    {item.Company} {item.Type_name}
                  </h2>
                  <p className="item-description">{item.Description}</p>
                  <p className="item-price">Price: ${item.Price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <RiDeleteBin5Line /> Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button className="clear-cart" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
