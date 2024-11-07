import React, { useEffect } from "react";
import "./style.scss"; // Đảm bảo bạn có các style cần thiết

const NotificationComponent = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Tăng thời gian lên 5 giây

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification">
      <div className="line-animation"></div> {/* Đường viền chạy xung quanh */}
      <div className="message">{message}</div>
    </div>
  );
};

export const NotificationContainer = () => {
  const [notifications, setNotifications] = React.useState([]);

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message }]);

    // Tự động xóa thông báo sau 3 giây
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  return {
    notifications,
    addNotification
  };
};

export default NotificationComponent;
