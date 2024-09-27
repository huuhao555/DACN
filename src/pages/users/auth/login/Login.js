import { memo } from "react";
import "./style.scss"
// import logo from "../../../../assets/users/footer/mmt.jpg"
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";

const LoginPage = () => {
  return (
    <div className="login">
      <form className="login_form">
        <div className="text_login">Đăng nhập</div>
        <div>
          {/* <div>Email</div> */}
          <input className="inputText" type="text" placeholder="Email của bạn" ></input>
        </div>
        <div>
          <input className="inputText" type="password" placeholder="Mật khẩu"></input>
        </div>
        <div>
          <a><Link to={ROUTERS.USER.PRODUCTS}><span>Quên mật khẩu</span></Link>
          </a>
        </div>
        <div className="btn_login">
          <button><span>Đăng nhập</span></button>
        </div>
      </form>




    </div>
  );
};
export default memo(LoginPage);
