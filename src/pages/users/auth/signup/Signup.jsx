import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible
} from "react-icons/ai";
import "./style.scss";
import VerifyOtp from "../VerifyOtp";
import Login from "../login/Login";

import { apiLink } from "../../../../config/api";

const SignUp = ({ isShowSignUpForm, closeSignUpForm }) => {
  const [message, setMessage] = useState([]);

  const [isShowLoginForm, setShowLoginForm] = useState(false);
  const closeLoginForm = () => {
    setShowLoginForm(false);
  };
  const [isShowVerityOtpForm, setShowVerityOtpForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onHandlSignUp = async () => {
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const messages = [];

    if (!formData.email) {
      messages.push("Email không được để trống.");
    } else if (!reg.test(formData.email)) {
      messages.push("Email không hợp lệ.");
    }

    if (!formData.fullName) {
      messages.push("Họ tên không được để trống.");
    }

    if (!formData.password) {
      messages.push("Mật khẩu không được để trống.");
    }

    if (!formData.confirmPassword) {
      messages.push("Bạn cần nhập lại mật khẩu.");
    } else if (formData.password !== formData.confirmPassword) {
      messages.push("Mật khẩu không trùng nhau.");
    }

    if (!formData.phone) {
      messages.push("Số điện thoại không được để trống.");
    }

    if (messages.length > 0) {
      return setMessage(messages);
    }

    try {
      const response = await fetch(apiLink + "/api/user/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phone: formData.phone
        })
      });

      if (!response.ok) {
        alert("Đăng ký không thành công! Vui lòng kiểm tra lại thông tin.");
        return;
      }

      setShowVerityOtpForm(true);
    } catch (error) {
      alert("Đã xảy ra lỗi khi đăng ký!");
    }
  };

  if (!isShowSignUpForm) return null;

  return (
    <div>
      {!isShowVerityOtpForm ? (
        <div className="login-overlay">
          <div className="login-form">
            <>
              <h2>Đăng Kí</h2>
              <AiOutlineClose
                className="icon-close"
                onClick={closeSignUpForm}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="fullName"
                placeholder="Họ tên"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <span
                style={{
                  color: "red",
                  fontSize: "14px",
                  listStyle: "none",
                  textAlign: "center"
                }}
              >
                {message && (
                  <ul
                    style={{
                      color: "red",
                      fontSize: "14px",
                      listStyle: "none"
                    }}
                  >
                    {message.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </span>

              <button onClick={onHandlSignUp}>Đăng ký</button>
            </>
          </div>
        </div>
      ) : (
        <VerifyOtp
          email={formData.email}
          isShowVerifyForm={isShowVerityOtpForm}
          closeVerifyForm={() => {
            setShowVerityOtpForm(false);
            closeSignUpForm();
          }}
        />
      )}
      <Login
        isShowLoginForm={isShowLoginForm}
        closeLoginForm={closeLoginForm}
      />
    </div>
  );
};

export default SignUp;
