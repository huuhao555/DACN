import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible
} from "react-icons/ai";
import "./style.scss";
import VerifyOtp from "../VerifyOtp";
import Login from "../login/Login";
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = ({ isShowSignUpForm, closeSignUpForm }) => {
  const [capVal, setCapVal] = useState(null);
  const [message, setMessage] = useState(null);

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

  const [showPassword, setShowPassword] = useState(false); // For password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirm password visibility

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
    if (!isCheckEmail) {
      return setMessage("Email không hợp lệ");
    } else if (formData.password !== formData.confirmPassword) {
      return setMessage("Mật khẩu không trùng nhau");
    } else if (!capVal) {
      return setMessage("Vui lòng chọn ReCap");
    }
    // if (formData.password !== formData.confirmPassword)
    //   return setMessage("Mật khẩu không trùng nhau");

    try {
      const response = await fetch("http://localhost:3001/api/user/sign-up", {
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
              <label>{message}</label>
              <ReCAPTCHA
                sitekey="6Lfg1HgqAAAAABvsZaTk3cTi163YFQPX-HoX_j6Z"
                // 6Lfg1HgqAAAAAAJm9IeG9pcuyR9SzYWAmOTWgOfR
                onChange={(token) => setCapVal(token)}
              />
              <button onClick={onHandlSignUp}>Đăng ký</button>

              <span className="signup">
                Bạn đã có tài khoản?
                <span
                  onClick={() => {
                    setShowLoginForm(true);
                  }}
                >
                  {" "}
                  Đăng nhập ngay
                </span>
              </span>
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
