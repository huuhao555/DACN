import React, { useState, useContext } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { UserContext } from "../../../../middleware/UserContext";
import SignUp from "../signup/Signup";
import "./style.scss";
import { Link } from "react-router-dom";

const Login = ({ isShowLoginForm, closeLoginForm }) => {
  const { updateUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowSignUpForm, setShowSignUpForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const closeSignUpForm = () => {
    setShowSignUpForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onHandlLogIn = async () => {
    if (!formData.email || !formData.password) {
      alert("Vui lòng nhập email và mật khẩu!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Email không hợp lệ!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/user/sign-in", {
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

      localStorage.setItem("token", dataUser.access_token);
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
    window.location.href = "http://localhost:3001/auth/google";
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
        <button onClick={onHandlLogIn} disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
        <span className="signup">
          Bạn chưa có tài khoản?
          <span
            onClick={() => {
              setShowSignUpForm(true);
            }}
          >
            Đăng ký ngay
          </span>
        </span>

        <div className="other-login">
          <div className="facebook-login">
            <FaFacebook /> <span>Facebook</span>
          </div>
          <div className="google-login">
            <button
              onClick={handleGoogleLogin}
              style={{ display: "flex", alignItems: "center" }}
            >
              <FcGoogle /> <span>Google</span>
            </button>
          </div>
        </div>
      </div>
      <SignUp
        isShowSignUpForm={isShowSignUpForm}
        closeSignUpForm={closeSignUpForm}
      />
    </div>
  );
};

export default Login;
