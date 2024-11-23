import React, { useState } from "react";
import "./style.scss";
import { AiOutlineSearch } from "react-icons/ai";

const OrderLookup = () => {
  const [orderInfo, setOrderInfo] = useState({
    buyerName: "",
    address: {
      address: ""
    },
    orderNumber: "",
    products: [],
    totalAmount: 0,
    orderDate: "",
    status: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState("");

  const handlePriceRange = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/order/get/${id}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      setSearchTerm(data.data);

      setOrderInfo({
        buyerName: data.data.name,
        address: data.data.shippingAddress,
        orderNumber: data.data._id,
        products: data.data.products,
        totalAmount: data.data.totalPrice,
        orderDate: data.data.createdAt,
        status: data.data.status
      });
    } catch (error) {
      alert("Tra cứu đơn hàng thất bại");
    }
  };
  console.log(searchTerm);

  return (
    <div className="order-lookup-container">
      <h2>Tra cứu Đơn hàng</h2>
      <div className="search-order">
        <input
          className="input-search"
          type="text"
          placeholder="Nhập mã đơn hàng"
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="icon-search">
          <AiOutlineSearch onClick={() => handlePriceRange(value)} />
        </div>
      </div>

      <div className="order-info">
        <div className="order-header">
          <p>
            <strong>Người mua:</strong> {orderInfo.buyerName}
          </p>
          <p>
            <strong>Địa chỉ nhận hàng:</strong> {orderInfo.address.address}
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
        {searchTerm && (
          <div>
            <div className="order-products">
              <h3>Chi tiết sản phẩm</h3>
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {searchTerm?.products.length > 0 ? (
                    searchTerm?.products.map((product, index) => {
                      console.log(product);
                      console.log(searchTerm);
                      return (
                        <tr key={index}>
                          <td>{product?.productId.name}</td>
                          <td>{product?.quantity}</td>
                          <td>
                            {product?.productId?.prices.toLocaleString("vi-VN")}{" "}
                            VND
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3">Không có sản phẩm</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="order-bottom">
              <h3>Chi tiết thanh toán</h3>
              <p>
                Tổng tiền hàng:
                <span>
                  {searchTerm?.totalPrice?.toLocaleString("vi-VN")} VNĐ
                </span>
              </p>
              <p>
                VAT:
                <span>
                  {parseInt(searchTerm?.VATorder)?.toLocaleString("vi-VN")} VNĐ
                </span>
              </p>
              <p>
                Chi phí vận chuyển:
                <span>
                  {searchTerm?.shippingFee?.toLocaleString("vi-VN")} VNĐ
                </span>
              </p>

              <p>
                Tổng cộng:
                <span style={{ marginLeft: "10px" }}>
                  {searchTerm?.orderTotal?.toLocaleString("vi-VN")}
                  VNĐ
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderLookup;
