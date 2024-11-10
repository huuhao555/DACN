import React, { useState } from "react";
import ShippingOrders from "./ShippingOrders";
import DeliveredOrders from "./DeliveredOrders";
import CancelledOrders from "./CancelledOrders";
import PendingOrders from "./PendingOrders";

const OrderStorage = () => {
  const [activeTab, setActiveTab] = useState("pending");

  const renderTabContent = () => {
    switch (activeTab) {
      case "pending":
        return <PendingOrders />;
      case "shipping":
        return <ShippingOrders />;
      case "delivered":
        return <DeliveredOrders />;
      case "cancelled":
        return <CancelledOrders />;
      default:
        return null;
    }
  };

  return (
    <div className="order-status-page">
      <div className="tabs">
        <button onClick={() => setActiveTab("pending")}>Đang xử lý</button>
        <button onClick={() => setActiveTab("shipping")}>Đang giao</button>
        <button onClick={() => setActiveTab("delivered")}>Đã giao</button>
        <button onClick={() => setActiveTab("cancelled")}>Đã huỷ</button>
      </div>
      <div className="tab-content">{renderTabContent()}</div>
    </div>
  );
};

export default OrderStorage;
