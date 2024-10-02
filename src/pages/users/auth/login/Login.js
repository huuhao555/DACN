import { memo } from "react";
import "./style.scss"
// import logo from "../../../../assets/users/footer/mmt.jpg"
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";

const LoginPage = () => {

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
        <div className="form_group">
          <input className="input_pass" type="password" placeholder="Mật khẩu"></input>
        </div>
        <div className="miss_text">
          <Link to={ROUTERS.USER.PRODUCTS}><span>Quên mật khẩu?</span></Link>

        </div>
        <div className="btn_login">
          {/* <button onClick={() => { this.handleLogin }}>Đăng nhập</button> */}
          <button>Đăng nhập</button>
        </div>
        <p class="logup-text">Bạn chưa có tài khoản?
          <Link to={ROUTERS.USER.SIGNUP}><span>Đăng kí ngay</span></Link></p>
      </form>




    </div>
  );
};
export default memo(LoginPage);
