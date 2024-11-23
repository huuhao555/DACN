// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import axios, { all } from "axios";
// import { ROUTERS } from "../utils/router";

// const PrivateAdminRoute = () => {
//   const [isAuthorized, setIsAuthorized] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuthorization = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           setIsAuthorized(false);
//           setLoading(false);
//           return;
//         }

//         const response = await fetch("http://localhost:3001/admin", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         console.log(response);
//         if (!response.ok) {
//           setIsAuthorized(false);
//           return;
//         }
//         setIsAuthorized(true);
//       } catch (error) {
//         console.error("Lỗi xác thực:", error.message);
//         setIsAuthorized(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuthorization();
//   }, []);

//   if (loading) {
//     return <div>Đang kiểm tra quyền...</div>;
//   }

//   if (!isAuthorized) {
//     return (
//       alert("Bạn không có quyền truy cập"),
//       (<Navigate to={ROUTERS.USER.HOME} replace />)
//     );
//   }

//   return <Outlet />;
// };

// export default PrivateAdminRoute;
