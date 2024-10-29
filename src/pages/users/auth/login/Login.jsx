import React, { useState, useContext } from "react";
import "./style.scss";
import { AiOutlineClose } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../middleware/UserContext";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
const Login = ({ isShowLoginForm, closeLoginForm }) => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

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
      const response = await fetch("http://localhost:3009/api/user/sign-in", {
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
      const isAdminUser = dataUser.dataUser.isAdmin;
      isAdminUser ? navigate("/admin") : navigate("/");

      localStorage.setItem("token", dataUser.access_token);
      localStorage.setItem("user", JSON.stringify(dataUser));

      updateUser(dataUser);
      closeLoginForm();
    } catch (error) {
      alert("error");
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
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <span className="forget-pass">
          <Link>Quên mật khẩu</Link>
        </span>
        <button onClick={onHandlLogIn} disabled={isLoading}>
          {isLoading ? "Đang xử lý..." : "Đăng nhập"}
        </button>
        <span className="signup">
          Bạn chưa có tài khoản?
          <Link to={ROUTERS.USER.SIGNUP}> Đăng ký ngay</Link>
        </span>

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
