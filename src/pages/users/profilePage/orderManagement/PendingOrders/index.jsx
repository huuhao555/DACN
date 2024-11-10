import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../middleware/UserContext";
import "../style.scss";
import { AiOutlineDownCircle } from "react-icons/ai";

const PendingOrders = () => {
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
        setOrders(data?.data.filter((order) => order.status === "Pending"));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchPendingOrders();
  }, [user]);

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
          {orders?.map((order) => (
            <div key={order._id} className="order">
              <AiOutlineDownCircle
                className="icon-down"
                onClick={() => toggleOrderVisibility(order._id)}
              />
              <h2>Thông tin người nhận hàng</h2>
              <p>Tên người nhận: {order.name}</p>
              <p>Địa chỉ: {order.shippingAddress?.address}</p>
              <p>Số điện thoại: {order.phone}</p>
              <p>Trạng thái: Đang xử lý</p>

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
                    {order?.products?.map((item, itemIndex) => (
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
                          {item?.productId?.prices?.toLocaleString("vi-VN")} VNĐ
                        </td>
                        <td>{item?.quantity}</td>
                        <td>
                          {(
                            item?.productId?.prices * item.quantity
                          ).toLocaleString("vi-VN")}{" "}
                          VNĐ
                        </td>
                      </tr>
                    ))}
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
                  Chi phí vận chuyển:
                  {order.shippingFee === 0 ? (
                    <span className="shipping-fee">
                      <span style={{ textDecoration: "line-through" }}>
                        {(200000).toLocaleString("vi-VN")} VNĐ
                      </span>
                      <span style={{ marginLeft: "10px" }}>0 VNĐ</span>
                    </span>
                  ) : (
                    <span>
                      {order.shippingFee?.toLocaleString("vi-VN")} VNĐ
                    </span>
                  )}
                </p>

                <p>
                  Tổng cộng:
                  <span style={{ marginLeft: "10px" }}>
                    {(order.orderTotal + order.shippingFee).toLocaleString(
                      "vi-VN"
                    )}{" "}
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

export default PendingOrders;
