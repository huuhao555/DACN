import React, { useContext, useState } from "react";
import "./style.scss";
import UserContext from "../../../middleware/UserContext";
import PendingOrdersAdmin from "./PendingOrders/index";
import ShippingOrdersAdmin from "./ShippingOrders/index";
import CancelledOrdersAdmin from "./CancelledOrders/index";
import DeliveredOrdersAdmin from "./DeliveredOrders/index";
const OrderManagementAdmin = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const { user } = useContext(UserContext) || {};

  const renderTabContent = () => {
    switch (activeTab) {
      case "pending":
        return <PendingOrdersAdmin />;
      case "shipping":
        return <ShippingOrdersAdmin />;
      case "delivered":
        return <DeliveredOrdersAdmin />;
      case "cancelled":
        return <CancelledOrdersAdmin />;
      default:
        return null;
    }
  };

  return (
    <div className="order-status-page">
      <div className="tabs">
        <div className="status-indicator">
          <div
            className="status-circle-container"
            onClick={() => setActiveTab("pending")}
          >
            <div
              className={`active ${activeTab === "pending" ? "filled" : ""}`}
            >
              1
            </div>
            <div>Đang xử lý</div>
          </div>

          <div
            className="status-circle-container"
            onClick={() => setActiveTab("shipping")}
          >
            <div
              className={`active ${activeTab === "shipping" ? "filled" : ""}`}
            >
              2
            </div>
            <div>Đang giao</div>
          </div>

          <div
            className="status-circle-container"
            onClick={() => setActiveTab("delivered")}
          >
            <div
              className={`active ${activeTab === "delivered" ? "filled" : ""}`}
            >
              3
            </div>
            <div>Đã giao</div>
          </div>

          <div
            className="status-circle-container"
            onClick={() => setActiveTab("cancelled")}
          >
            <div
              className={`active ${activeTab === "cancelled" ? "filled" : ""}`}
            >
              4
            </div>
            <div>Đã huỷ</div>
          </div>
        </div>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default OrderManagementAdmin;
