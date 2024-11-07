import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { ROUTERS } from "../../../../utils/router";

const ForgetPassword = ({ isShowVerifyForm, closeVerifyForm }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForget = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/user/request-password-reset",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        }
      );

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
  if (!isShowVerifyForm) return null;
  return (
    <div className="forget-pass-overlay">
      <div className="forget-pass-form">
        <h2>Quên mật khẩu</h2>
        <AiOutlineClose className="icon-close" onClick={closeVerifyForm} />
        <input
          type="text"
          name="email"
          placeholder="Nhập mã email đã đăng ký"
          value={email}
          onChange={handleInputChange}
        />
        <button onClick={handleForget}>Gửi</button>
      </div>
    </div>
  );
};

export default ForgetPassword;
