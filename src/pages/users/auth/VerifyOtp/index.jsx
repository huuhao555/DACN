import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { ROUTERS } from "../../../../utils/router";

const VerifyOtp = ({ email, isShowVerifyForm, closeVerifyForm }) => {
  const [otpToken, setOtpToken] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setOtpToken(e.target.value);
  };

  const handleVerify = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/otp/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otpToken })
      });

      if (!response.ok) {
        alert("OTP không hợp lệ");
        return;
      }

      alert("Đăng ký thành công");
      closeVerifyForm();
      navigate(ROUTERS.USER.HOME);
    } catch (error) {
      alert("Đã xảy ra lỗi khi xác thực OTP!");
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-form">
        <h2>Xác thực OTP</h2>
        <AiOutlineClose className="icon-close" onClick={closeVerifyForm} />
        <input
          type="text"
          name="otp"
          placeholder="Nhập mã OTP"
          value={otpToken}
          onChange={handleInputChange}
        />
        <button onClick={handleVerify}>Xác nhận</button>
      </div>
    </div>
  );
};

export default VerifyOtp;
