import React, { useState } from "react";
import "./style.scss";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
const SignUp = ({ isShowSignUpForm, closeSignUpForm }) => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onHandlSignUp = async () => {
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(formData.email);
    if (!isCheckEmail) return alert("Email");
    if (formData.password !== formData.confirmPassword)
      return alert("Mật khẩu không trùng nhau");
    try {
      const response = await fetch("http://localhost:3009/api/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
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
      alert("Đăng ký thành công!");
      const data = await response.json();
    } catch (error) {
      alert({ message: error.message });
    }
  };
  if (!isShowSignUpForm) return null;
  return (
    <div className="login-overlay">
      <div className="login-form">
        <h2>Đăng Kí</h2>
        <AiOutlineClose className="icon-close" onClick={closeSignUpForm} />
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
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <button onClick={onHandlSignUp}>Đăng ký</button>

        <span className="signup">
          Bạn đã có tài khoản?
          <Link> Đăng nhập ngay</Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
