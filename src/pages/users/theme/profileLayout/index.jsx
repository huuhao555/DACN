import { memo, useContext, useEffect, useState } from "react";
import "./style.scss";

import { Outlet } from "react-router-dom";
import { UserProvider, UserContext } from "../../../../middleware/UserContext";
import SideBarProfile from "../../../../pages/users/profilePage/sidebarProfile";
import Footer from "../footer";
import Header from "../header";
import ChatbotWrapper from "../../../../component/general/ChatBox";
import NotFoundPage from "../../../../component/general/NotFoundPage";
import LoadingSpinner from "../../../../component/general/LoadingSpinner";

const ProfilePageLayout = (props) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setIsAuthorized(false);
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:3001/api/check/user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response);
        if (!response.ok) {
          setIsAuthorized(false);
          return;
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
      <ChatbotWrapper />
      <Header />
      <div {...props} className="profile-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 colleft ">
              <SideBarProfile />
            </div>
            <div className="col-lg-9 colright ">
              <div className="right-main">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </UserProvider>
  );
};

export default memo(ProfilePageLayout);
