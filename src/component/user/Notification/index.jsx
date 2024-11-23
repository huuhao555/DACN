import React, { useEffect } from "react";
import "./style.scss";

const NotificationComponent = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="notification">
      <div className="line-animation"></div>
      <div className="message">{message}</div>
    </div>
  );
};

export const NotificationContainer = () => {
  const [notifications, setNotifications] = React.useState([]);

  const addNotification = (message) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message }]);

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
