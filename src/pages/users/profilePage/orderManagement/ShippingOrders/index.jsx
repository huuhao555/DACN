import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../middleware/UserContext";
import "../style.scss";
import {
  AiOutlineDown,
  AiOutlineDownCircle,
  AiOutlineDownSquare,
  AiOutlineEye,
  AiOutlineEyeInvisible
} from "react-icons/ai";
const ShippingOrders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext) || {};

  const [visibleOrders, setVisibleOrders] = useState({});

  useEffect(() => {
    const fetchPendingOrders = async () => {
      const userId = user?.dataUser?.id;
      if (!userId) {
        console.error("User ID is not available");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3001/api/order/getAll/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        setOrders(data?.data.filter((order) => order.status === "Shipped"));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchPendingOrders();
  }, [user]);
  const handleSubmidOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/order/deliver`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ orderId: id })
      });

      if (!response.ok) {
        throw new Error("Failed to deliver order");
      }

      const data = await response.json();

      const userId = user?.dataUser?.id;
      const updatedOrdersResponse = await fetch(
        `http://localhost:3001/api/order/getAll/${userId}`
      );

      if (!updatedOrdersResponse.ok) {
        throw new Error("Failed to fetch updated orders");
      }

      const updatedOrders = await updatedOrdersResponse.json();
      setOrders(
        updatedOrders?.data.filter((order) => order.status === "Shipped")
      );
    } catch (error) {
      console.error("Error delivering order:", error);
    }
  };
  const toggleOrderVisibility = (orderId) => {
    setVisibleOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };
  return (
    <div className="orders-list">
      {orders.length > 0 ? (
        <div>
          {orders?.map((order, orderIndex) => (
            <div key={order.id} className="order">
              <button
                className="btn-confirm"
                onClick={() => {
                  handleSubmidOrder(order._id);
                }}
              >
                Nhận hàng
              </button>

              <h2>Thông tin người nhận hàng</h2>
              <p>Tên người nhận: {order?.name}</p>
              <p>Địa chỉ: {order?.shippingAddress}</p>
              <p>Số điện thoại: {order?.phone}</p>
              <p>Trạng thái: {order?.status}</p>
              <p>Mã đơn hàng: {order?._id} </p>
              <h3 className="text-order">
                Chi tiết đơn hàng{" "}
                <span
                  style={{
                    fontSize: "16px",
                    color: "#D70018",
                    fontStyle: "italic"
                  }}
                >
                  ({order?.products?.length} sản phẩm)
                </span>
              </h3>
              <AiOutlineDownCircle
                className="icon-down"
                onClick={() => toggleOrderVisibility(order._id)}
              />
              {visibleOrders[order._id] && (
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Hình sản phẩm</th>
                      <th>Tên sản phẩm</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.products?.map((item, itemIndex) => {
                      return (
                        <tr key={item?.productId?._id}>
                          <td>{itemIndex + 1}</td>
                          <td>
                            <img
                              src={
                                item?.productId?.imageUrl ||
                                "/path/to/fallback.jpg"
                              }
                              alt={
                                item?.productId?.productName || "Product Image"
                              }
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "contain"
                              }}
                            />
                          </td>
                          <td>{item?.productId?.name}</td>
                          <td>
                            {item?.productId?.prices?.toLocaleString("vi-VN")}{" "}
                            VNĐ
                          </td>
                          <td>{item?.quantity}</td>
                          <td>
                            {(
                              item?.productId?.prices * item?.quantity
                            )?.toLocaleString("vi-VN")}{" "}
                            VNĐ
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              <div className="order-bottom">
                <h3>Chi tiết thanh toán</h3>
                <p>
                  Tổng tiền hàng:
                  <span>{order.totalPrice?.toLocaleString("vi-VN")} VNĐ</span>
                </p>
                <p>
                  VAT:
                  <span>
                    {parseInt(order.VAT)?.toLocaleString("vi-VN")} VNĐ
                  </span>
                </p>
                <p>
                  Chi phí vận chuyển:
                  <span>{order.shippingFee?.toLocaleString("vi-VN")} VNĐ</span>
                </p>

                <p>
                  Tổng cộng:
                  <span style={{ marginLeft: "10px" }}>
                    {parseInt(order.orderTotal)?.toLocaleString("vi-VN")}
                    VNĐ
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Không có đơn hàng nào đang xử lý.</p>
      )}
    </div>
  );
};

export default ShippingOrders;
