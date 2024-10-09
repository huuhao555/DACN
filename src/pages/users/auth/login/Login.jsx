import React from "react";
import "./style.scss";
import { AiOutlineClose } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

import { Link } from "react-router-dom";
const Login = ({ isShowLoginForm, closeLoginForm }) => {
  if (!isShowLoginForm) return null; // Không hiển thị nếu isShowLoginForm là false

  return (
    <div className="login-overlay">
      <div className="login-form">
        <h2>Đăng nhập</h2>
        <AiOutlineClose className="icon-close" onClick={closeLoginForm} />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mật khẩu" />
        <span className="forget-pass">
          <Link>Quên mật khẩu</Link>
        </span>
        <button>Đăng nhập</button>
        <span className="signup">
          Bạn chưa có tài khoản?
          <Link> Đăng ký ngay</Link>
        </span>
        <div className="other-login">
          <div className="facebook-login">
            {" "}
            <FaFacebook /> <span>Facebook</span>
          </div>
          <div className="google-login">
            {" "}
            <FcGoogle /> <span>Google</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
