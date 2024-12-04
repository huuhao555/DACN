import React, { useState } from "react";
import "./style.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { apiLink } from "../../../config/api";

const OrderLookup = () => {
  const [orderInfo, setOrderInfo] = useState({
    buyerName: "",
    address: "",
    orderNumber: "",
    products: [],
    totalAmount: 0,
    orderDate: "",
    status: ""
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState("");
  const grandTotal =
    searchTerm.totalPrice + parseInt(searchTerm.VAT) + searchTerm.shippingFee;
  const handlePriceRange = async (id) => {
    try {
      const response = await fetch(apiLink + `/api/order/get/${id}`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();

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
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePriceRange(value);
    }
  };
  return (
    <div className="order-lookup-container">
      <h2>Tra cứu Đơn hàng</h2>
      <div className="search-order">
        <input
          className="input-search"
          type="text"
          placeholder="Nhập mã đơn hàng"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="icon-search">
          <AiOutlineSearch onClick={() => handlePriceRange(value)} />
        </div>
      </div>

      <div className="order-info">
        <div className="order-header">
          <p>
            <strong>Người mua:</strong> {orderInfo?.buyerName}
          </p>
          <p>
            <strong>Địa chỉ nhận hàng:</strong> {orderInfo?.address}
          </p>
          <p>
            <strong>Mã đơn hàng:</strong> {orderInfo?.orderNumber}
          </p>
          <p>
            <strong>Ngày đặt:</strong> {orderInfo?.orderDate}
          </p>
          <p>
            <strong>Trạng thái:</strong> {orderInfo?.status}
          </p>
          <p>
            <strong>Tình trạng:</strong>{" "}
            {orderInfo?.isPaid ? "Đã thanh toán" : " Chưa thanh toán"}
          </p>
        </div>
        {searchTerm && (
          <div>
            <div className="order-products">
              <h3>Chi tiết sản phẩm</h3>
              <table className="product-table">
                <thead>
                  <tr>
                    <th>Hình sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Tổng giá</th>
                  </tr>
                </thead>
                <tbody>
                  {searchTerm?.products.length > 0 ? (
                    searchTerm?.products.map((product, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <img
                              style={{
                                width: "100px",
                                height: "auto",
                                objectFit: "contain"
                              }}
                              src={product?.productId?.imageUrl}
                              alt={product?.productId?.name}
                            />
                          </td>
                          <td>{product?.productId?.name}</td>
                          <td>{product?.quantity}</td>
                          <td>
                            {" "}
                            {parseInt(product?.productId?.prices) ==
                            product?.productId?.promotionPrice ? (
                              <div className="grp-price">
                                <p className="prices">
                                  {`${parseInt(
                                    product?.productId?.prices
                                  ).toLocaleString("vi-VN")} ₫`}
                                </p>
                              </div>
                            ) : (
                              <div className="grp-price">
                                <p className="price-old">
                                  {`${parseInt(
                                    product?.productId?.prices
                                  ).toLocaleString("vi-VN")} ₫`}
                                </p>
                                <div className="grp-price-new">
                                  <p className="price-new">
                                    {`${parseInt(
                                      product?.productId?.promotionPrice
                                    ).toLocaleString("vi-VN")}
                               ₫`}
                                  </p>
                                  <p className="discount">
                                    {`-${product?.productId?.discount}%`}
                                  </p>
                                </div>
                              </div>
                            )}
                          </td>
                          <td
                            style={{
                              fontWeight: "bold",
                              color: "#d70018",
                              fontSize: "18px"
                            }}
                          >
                            {(
                              product?.quantity *
                              product?.productId?.promotionPrice
                            ).toLocaleString("vi-VN")}
                            ₫
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
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#d70018",
                    fontSize: "16px"
                  }}
                >
                  {searchTerm.totalPrice?.toLocaleString("vi-VN")} ₫
                </span>
              </p>
              <p>
                VAT:
                <span>
                  {parseInt(searchTerm.VAT)?.toLocaleString("vi-VN")} ₫
                </span>
              </p>
              <p>
                Chi phí vận chuyển:
                <span>{searchTerm.shippingFee?.toLocaleString("vi-VN")} ₫</span>
              </p>
              <p>
                Tổng cộng:
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#d70018",
                    fontSize: "16px",
                    paddingBottom: " 10px"
                  }}
                >{`${parseInt(grandTotal).toLocaleString("vi-VN")}  ₫`}</span>
              </p>
              <div style={{ borderTop: "solid 2px #ccc", padding: " 10px 0" }}>
                <p>
                  Voucher người dùng:
                  <span>
                    {` (-${(
                      (1 - searchTerm?.orderTotal / grandTotal) *
                      100
                    )?.toLocaleString(
                      "vi-VN"
                    )}%) -${(grandTotal - searchTerm?.orderTotal)?.toLocaleString("vi-VN")}`}
                  </span>
                </p>

                <p>
                  Thành tiền:
                  <span
                    style={{
                      marginLeft: "10px",
                      fontWeight: "bold",
                      color: "#d70018",
                      fontSize: "18px",
                      textAlign: "left"
                    }}
                  >
                    {parseInt(searchTerm?.orderTotal).toLocaleString("vi-VN")} ₫
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderLookup;
