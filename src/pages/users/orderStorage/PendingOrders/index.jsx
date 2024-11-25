// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const PendingOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchPendingOrders = async () => {
//       const response = await axios.get("/api/orders?status=pending");
//       setOrders(response.data);
//     };

//     fetchPendingOrders();
//   }, []);

//   return (
//     <div className="orders-list">
//       {orders.map((order) => (
//         <div key={order.id} className="order-item">
//           {/* Hiển thị thông tin đơn hàng */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PendingOrders;
