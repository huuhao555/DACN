import "./style.scss";
import { memo, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../../../component/admin/Sidebar/Sidebar";
import HeaderAdmin from "../header/header";
import { UserProvider } from "../../../../middleware/UserContext";
import { NotificationProvider } from "../../../../middleware/NotificationContext";
import { ROUTERS } from "../../../../utils/router";

import LoadingSpinner from "../../../../component/general/LoadingSpinner";
import NotFoundPage from "../../../../component/general/NotFoundPage";
import ChatbotWrapper from "../../../../component/general/ChatBox";

const AdminLayout = (props) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshToken = async () => {
    const storedRefreshToken = localStorage.getItem("refresh_token");

    try {
      const response = await fetch("http://localhost:3001/api/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refresh_token: storedRefreshToken })
      });

      if (!response.ok) throw new Error("Unable to refresh token");

      const data = await response.json();

      localStorage.setItem("access_token", data.access_token);
      return data.access_token;
    } catch (error) {
      console.error("Token refresh failed:", error);
      window.location.href = "/login";
      return null;
    }
  };

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          setIsAuthorized(false);
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3001/api/check/admin", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const newToken = await refreshToken();
          if (!newToken) {
            setIsAuthorized(false);
            return;
          }

          const retryResponse = await fetch(
            "http://localhost:3001/api/check/admin",
            {
              headers: {
                Authorization: `Bearer ${newToken}`
              }
            }
          );

          if (!retryResponse.ok) {
            setIsAuthorized(false);
            return;
          }
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Lỗi xác thực:", error.message);
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthorization();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthorized) {
    return <NotFoundPage replace />;
  }
  return (
    <UserProvider>
      <NotificationProvider>
        {/* <ChatbotWrapper /> */}
        <div {...props} className="container-layout">
          <HeaderAdmin />
          <div className="row">
            <div className="col-lg-3">
              <Sidebar />
            </div>
            <div className="col-lg-9 main-content">
              <Outlet />
            </div>
          </div>
        </div>
      </NotificationProvider>
    </UserProvider>
  );
};

export default memo(AdminLayout);
