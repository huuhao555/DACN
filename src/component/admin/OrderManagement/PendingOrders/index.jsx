import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../middleware/UserContext";
import "../style.scss";
import { AiOutlineDownCircle } from "react-icons/ai";

const PendingOrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(UserContext) || {};
  const [visibleOrders, setVisibleOrders] = useState({});

  const fetchPendingOrders = async () => {
    const userId = user?.dataUser?.id;
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/order/getAll`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data?.data.filter((order) => order.status === "Pending"));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, [user]);

  const toggleOrderVisibility = (orderId) => {
    setVisibleOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const handleSubmidOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/order/ship`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ orderId: id })
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      const data = await response.json();

      fetchPendingOrders();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  const handleCancelOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/order/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ orderId: id })
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      const data = await response.json();

      fetchPendingOrders();
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };
  return (
    <div className="orders-list-admin">
      {orders.length > 0 ? (
        <div>
          {orders?.map((order) => {
            return (
              <div key={order._id} className="order-admin">
                <button
                  className="btn-confirm"
                  onClick={() => {
                    handleSubmidOrder(order._id);
                  }}
                >
                  Xác nhận
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => {
                    handleCancelOrder(order._id);
                  }}
                >
                  Huỷ đơn
                </button>
                <h2>Thông tin người nhận hàng</h2>
                <p>Tên người nhận: {order.name}</p>
                <p>Địa chỉ: {order.shippingAddress}</p>
                <p>Số điện thoại: {order.phone}</p>
                <p>Trạng thái: {order.status}</p>
                <p>Mã đơn hàng: {order._id} </p>

                <h3 className="text-order">
                  Chi tiết đơn hàng
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#D70018",
                      fontStyle: "italic"
                    }}
                  >
                    {` (${order?.products?.length} sản phẩm)`}
                  </span>
                </h3>
                <AiOutlineDownCircle
                  className="icon-down-admin"
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
                                  item?.productId?.productName ||
                                  "Product Image"
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
                                item?.productId?.prices * item.quantity
                              ).toLocaleString("vi-VN")}{" "}
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
                    <span>
                      {order.shippingFee?.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </p>

                  <p>
                    Tổng cộng:
                    <span style={{ marginLeft: "10px" }}>
                      {order.orderTotal.toLocaleString("vi-VN")}
                      VNĐ
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Không có đơn hàng nào đang xử lý.</p>
      )}
    </div>
  );
};

export default PendingOrdersAdmin;
