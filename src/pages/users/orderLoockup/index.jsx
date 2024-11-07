import React, { useState } from "react";
import "./style.scss";
import { AiOutlineSearch } from "react-icons/ai";

const OrderLookup = () => {
  const [orderInfo, setOrderInfo] = useState({
    buyerName: "Võ Như Hoàng Huy",
    address: "Cộng Hoà, P13, Tân Bình, TP Hồ Chí Minh",
    orderNumber: "DH123456",
    products: [
      { name: "Laptop ASUS", quantity: 1, price: 15000000 },
      { name: "Macbook M2", quantity: 1, price: 34000000 }
    ],
    totalAmount: 49000000,
    orderDate: "07-11-2024",
    status: "Đang xử lý"
  });
  const [value, setValue] = useState("");

  const handlePriceRange = () => {};
  return (
    <div className="order-lookup-container">
      <h2>Tra cứu Đơn hàng</h2>
      <div className="search-order">
        <input
          className="input-search"
          type="text"
          placeholder="Mã đơn hàng"
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="icon-search">
          <AiOutlineSearch onClick={handlePriceRange} />
        </div>
      </div>
      <div className="order-info">
        <div className="order-header">
          <p>
            <strong>Người mua:</strong> {orderInfo.buyerName}
          </p>
          <p>
            <strong>Địa chỉ nhận hàng:</strong> {orderInfo.address}
          </p>
          <p>
            <strong>Mã đơn hàng:</strong> {orderInfo.orderNumber}
          </p>
          <p>
            <strong>Ngày đặt:</strong> {orderInfo.orderDate}
          </p>
          <p>
            <strong>Trạng thái:</strong> {orderInfo.status}
          </p>
        </div>
        <div className="order-products">
          <h3>Chi tiết sản phẩm</h3>
          <ul>
            {orderInfo.products.map((product, index) => (
              <li key={index} className="product-item">
                <span className="product-name">{product.name}</span>
                <span className="product-quantity">
                  Số lượng: {product.quantity}
                </span>
                <span className="product-price">
                  Giá: {product.price.toLocaleString()} VND
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="order-total">
          <strong>Tổng cộng:</strong> {orderInfo.totalAmount.toLocaleString()}{" "}
          VND
        </div>
      </div>
    </div>
  );
};

export default OrderLookup;
