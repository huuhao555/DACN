import React from "react";
import "./style.scss";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
const SignUp = ({ isShowSignUpForm, closeSignUpForm }) => {
  if (!isShowSignUpForm) return null; // Không hiển thị nếu isShowSignUpForm là false

  return (
    <div className="login-overlay">
      <div className="login-form">
        <h2>Đăng Kí</h2>
        <AiOutlineClose className="icon-close" onClick={closeSignUpForm} />
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
      </div>
    </div>
  );
};

export default SignUp;
