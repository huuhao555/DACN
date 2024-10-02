import { memo, useState } from "react";
import "./style.scss"
// import logo from "../../../../assets/users/footer/mmt.jpg"
import { Link, useActionData } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
import Signup from "../signup/Signup";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

const LoginPage = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => {
    setShow(!show)
  }

  // handleLogin = async () => {
  //   this.setState({
  //     errMessage: ''
  //   })

  //   try {
  //     let data = await handleLoginApi(this.state.username, this.state.password);
  //     if (data && data.errCode !== 0) {
  //       this.setState({
  //         errMessage: data.message
  //       })
  //     }
  //     if (data && data.errCode === 0) {
  //       this.props.userLoginSuccess(data.user)
  //       console.log('login succeeds')
  //     }

  //   } catch (error) {
  //     if (error.response) {
  //       if (error.response.data) {
  //         this.setState({
  //           errMessage: error.response.data.message
  //         })
  //       }
  //     }


  //     console.log('hoanghuy', error.response)

  //   }

  // }


  return (
    <div className="login">
      <form className="login_form">
        <div className="text_login">Đăng nhập</div>
        <div className="form_group">
          {/* <div>Email</div> */}
          <input className="input_email" type="text" placeholder="Email của bạn" ></input>
        </div>


        <div className="form_group_bottom">
          <input className="input_pass" type={show ? "text" : "password"} placeholder="Mật khẩu"></input>
          <i onClick={handleClick} >{show ? <FaRegEyeSlash></FaRegEyeSlash> : <IoEyeOutline> </IoEyeOutline>}</i>

        </div>


        <div className="miss_text">
          <Link to={ROUTERS.USER.PRODUCTS}><span>Quên mật khẩu?</span></Link>

        </div>
        <div className="btn_login">
          {/* <button onClick={() => { this.handleLogin }}>Đăng nhập</button> */}
          <button>Đăng nhập</button>
        </div>
        <p class="logup-text">Bạn chưa có tài khoản?
          <span><Link to="/dang-ky">Đăng kí</Link></span>
        </p>
        <div className="btn_icon">
          <p className="gg"><FcGoogle /></p>
          <p className="fb"><FaFacebook /></p>
        </div>

      </form>




    </div>
  );
};
export default memo(LoginPage);
