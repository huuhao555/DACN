import React from "react";
import "./style.scss";
import logo from "../../../assets/users/footer/icon7.png";
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner">
        <div className="circle"></div>
      </div>
      {logo && <img src={logo} alt="Logo" className="logo" />}
    </div>
  );
};

export default LoadingSpinner;
