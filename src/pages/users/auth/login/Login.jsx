import React, { useState, useContext } from "react";
import "./style.scss";
import { AiOutlineClose } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../middleware/UserContext";

const Login = ({ isShowLoginForm, closeLoginForm }) => {
  const { updateUser } = useContext(UserContext); // Get updateUser from context

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
    try {
      const response = await fetch(
        "http://192.168.0.186:3009/api/user/sign-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        }
      );
      if (!response.ok) {
        alert("Đăng nhập không thành công! Vui lòng kiểm tra lại thông tin.");
        return;
      }
      const dataUser = await response.json();
      alert("Đăng nhập thành công!");

      // Lưu thông tin người dùng vào localStorage và context
      localStorage.setItem("user", JSON.stringify(dataUser.data));
      updateUser(dataUser.data); // Update user state in context
      closeLoginForm();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onHandlLogIn();
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
        <button onClick={onHandlLogIn}>Đăng nhập</button>
        <span className="signup">
          Bạn chưa có tài khoản?
          <Link> Đăng ký ngay</Link>
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
