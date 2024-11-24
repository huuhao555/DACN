import React from "react";
import "./style.scss";
import Header from "../../../pages/users/theme/header";
import Footer from "../../../pages/users/theme/footer";
import LoadingSpinner from "../LoadingSpinner";

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="not-found-page">
            <div className="not-found-container">
              <div className="icon">
                <span className="x-icon">✖</span>
              </div>
              <h1 className="title">404 Not Found</h1>
              <p className="description">
                Oops! Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
