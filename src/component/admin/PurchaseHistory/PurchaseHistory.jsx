import React, { useContext, useState } from "react";
import { NotificationContext } from "../../../middleware/NotificationContext";
import "./style.scss";

const PurchaseHistory = () => {
  const { notifications } = useContext(NotificationContext) || {};
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const notificationsByDate = notifications.reduce((acc, notification) => {
    const { date, message, time, user } = notification;
    if (!acc[date]) acc[date] = [];
    acc[date].push({ message, time, user, date });
    return acc;
  }, {});

  const totalNotifications = Object.keys(notificationsByDate).reduce(
    (total, date) => total + notificationsByDate[date].length,
    0
  );

  const totalPages = Math.ceil(totalNotifications / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = Object.keys(notificationsByDate)
    .flatMap((date) => notificationsByDate[date])
    .slice(startIndex, endIndex);

  return (
    <div className="purchase-history">
      <table className="notification-table">
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Thời gian</th>
            <th>Người thao tác</th>
            <th>Nội dung</th>
          </tr>
        </thead>
        <tbody>
          {currentNotifications.map((note, index) => (
            <tr key={index}>
              <td className="notification-date">{note.date}</td>{" "}
              <td className="notification-time">{note.time}</td>
              <td className="notification-user">{note.user}</td>
              <td className="notification-message">{note.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
