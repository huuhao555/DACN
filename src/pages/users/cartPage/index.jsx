import "./style.scss";
import { useLocation } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CartContext } from "../../../middleware/CartContext";
import React, { useContext } from "react";


const CartPage = () => {
  // const location = useLocation();
  // const { product } = location.state || {};
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  // return (
  //   <div className="cart-page">
  //     <div className="container">
  //       <h2>Giỏ hàng</h2>
  //       <div className="row">
  //         {/* <div className=" col-lg-3"></div>
  //         <div className=" col-lg-6">
  //           <div className="cart">
  //             <div className="cart-header">
  //               <h2>Giỏ hàng của bạn</h2>
  //               <div className="cart-content">
  //                 <div className="cart-item">
  //                   <div className="cart-item-image">
  //                     <img src={product.Image} alt={product.Type_name} />
  //                   </div>
  //                   <div className="cart-item-name">
  //                     <h3>{product.Type_name}</h3>
  //                   </div>
  //                   <div className="cart-item-price">
  //                     <h3>{product.Price}</h3>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div> */}
  //         <div className="col-lg-7 col-12 col-sm-12">
  //           <div className="cart-header">

  //             <div className="checkbox">
  //               <input style={{ width: "10%" }} type="checkbox" />
  //               <span style={{ alignContent: "center", width: "200px" }}>Chọn tất cả</span>
  //             </div>
  //             <button><RiDeleteBin5Line /></button>
  //           </div>
  //           <div className="cart-body"></div>
  //         </div>
  //         <div className="col-lg-4 col-12 col-sm-12"></div>

  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="cart-page">
      <h1>Giỏ hàng của bạn</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <div className="cart-item">
                  <img
                    src={item.Image}
                    alt={item.Type_name}
                    style={{ width: "100px", height: "80px", objectFit: "cover" }}
                  />
                  <div className="cart-item-info">
                    <h2>{item.Company} {item.Type_name}</h2>
                    <p>{item.Description}</p>
                    <button onClick={() => removeFromCart(item.id)}>Xóa</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={clearCart}>Xóa toàn bộ giỏ hàng</button>
        </div>
      )}
    </div>
  );

};

export default CartPage;



