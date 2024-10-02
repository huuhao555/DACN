import { memo, useState } from "react";
import "./style.scss";
import { Link, useActionData } from "react-router-dom";
import { ROUTERS } from "../../../../utils/router";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

const SignUpPage = () => {

    const [show, setShow] = useState(false)
    const handleClick = () => {
        setShow(!show)
    }
    return (
        // <div className='login-background'>
        //     <div className='login-container'>
        //         <div className='login-content row'>
        //             <div className='col-12 text-center'> Login </div>
        //             <div className='col-12 form-group'>
        //                 <label>Username</label>
        //                 <input type='text'
        //                     className='form-control'
        //                     placeholder='Username or Email'
        //                 // value={this.state.username}
        //                 // onChange={(event) => this.handleOnChangeUsername(event)}
        //                 />
        //             </div>
        //             <div className='col-12 form-group'>
        //                 <label>Password</label>
        //                 <div className='custom-input-password' >
        //                     <input className='form-control'
        //                         placeholder='Password'

        //                     />
        //                     {/* <span
        //                         onClick={() => { this.handleShowHidePassword() }}



        //                     ><i class={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i></span> */}

        //                 </div>
        //             </div>
        //             <div className='col-12' style={{ color: 'red' }}>
        //                 {/* {this.state.errMessage} */}
        //             </div>
        //             <div className='col-12'>
        //                 <button className='btn-login' >Login</button>
        //             </div>

        //             <div className='col-12'>
        //                 <span>Forgot Password</span>
        //             </div>
        //             <div className='col-12 social-login'>
        //                 <div className='go'><i class="fab fa-google">Google</i></div>
        //                 <div className='fb'><i class="fab fa-facebook-f">acebook</i></div>


        //             </div>


        //         </div>
        //     </div>
        // </div>

        <div className="login">
            <form className="login_form">
                <div className="text_signup">Đăng kí</div>
                <div className="form_group">
                    <input className="input_email" type="text" placeholder="Nhập họ và tên" ></input>
                </div>

                <div className="form_group">
                    <input maxlength="10" required="required" autocomplete="off" className="input_email" type="tel" placeholder="Nhập số điện thoại" ></input>
                </div>


                <div className="form_group">
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
export default memo(SignUpPage);