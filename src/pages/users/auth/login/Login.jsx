import React, { useState, useContext } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { UserContext } from "../../../../middleware/UserContext";

import "./style.scss";

import { apiLink } from "../../../../config/api";

const Login = ({ isShowLoginForm, closeLoginForm }) => {
  const { updateUser } = useContext(UserContext);
  const [message, setMessage] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onHandlLogIn = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const messages = [];

    if (!formData.email || !formData.password) {
      messages.push("Vui lòng nhập email hoặc mật khẩu!");
    }
    if (!emailRegex.test(formData.email)) {
      messages.push("Email không hợp lệ!");
    }
    if (messages.length > 0) {
      return setMessage(messages);
    }
    setIsLoading(true);
    try {
      const response = await fetch(apiLink + "/api/user/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        alert("Đăng nhập không thành công! Vui lòng kiểm tra lại thông tin.");
        return;
      }

      const dataUser = await response.json();

      localStorage.setItem("access_token", dataUser.access_token);
      localStorage.setItem("refresh_token", dataUser.refresh_token);
      localStorage.setItem("user", JSON.stringify(dataUser));

      updateUser(dataUser);
      closeLoginForm();
    } catch (error) {
      alert("Lỗi đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onHandlLogIn();
    } else if (e.key === "Escape") {
      closeLoginForm();
    }
  };
  const handleGoogleLogin = () => {
    window.location.href = apiLink + "/auth/google";
  };

  if (!isShowLoginForm) return null;

  return (
    <div className="login-overlay">
      <div className="login-form">
        <h2>Đăng nhập</h2>
        <AiOutlineClose className="icon-close" onClick={closeLoginForm} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
        <span className="forget-pass">
          <span onClick={() => {}}>Quên mật khẩu</span>
        </span>
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
        <button onClick={onHandlLogIn} disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Đăng nhập"}
        </button>

        <div className="other-login">
          <div className="facebook-login">
            <FaFacebook /> <span>Facebook</span>
          </div>
          <div className="google-login">
            <FcGoogle /> <span>Google</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
