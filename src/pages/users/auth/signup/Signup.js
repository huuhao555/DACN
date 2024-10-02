import { memo } from "react";
import "./style.scss"
// import { ROUTERS } from "../../../../utils/router";


const SignUpPage = () => {
    return (
        <div className='login-background'>
            <div className='login-container'>
                <div className='login-content row'>
                    <div className='col-12 text-center'> Login </div>
                    <div className='col-12 form-group'>
                        <label>Username</label>
                        <input type='text'
                            className='form-control'
                            placeholder='Username or Email'
                        // value={this.state.username}
                        // onChange={(event) => this.handleOnChangeUsername(event)}
                        />
                    </div>
                    <div className='col-12 form-group'>
                        <label>Password</label>
                        <div className='custom-input-password' >
                            <input className='form-control'
                                placeholder='Password'

                            />
                            {/* <span
                                onClick={() => { this.handleShowHidePassword() }}



                            ><i class={this.state.isShowPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}></i></span> */}

                        </div>
                    </div>
                    <div className='col-12' style={{ color: 'red' }}>
                        {/* {this.state.errMessage} */}
                    </div>
                    <div className='col-12'>
                        <button className='btn-login' >Login</button>
                    </div>

                    <div className='col-12'>
                        <span>Forgot Password</span>
                    </div>
                    <div className='col-12 social-login'>
                        <div className='go'><i class="fab fa-google">Google</i></div>
                        <div className='fb'><i class="fab fa-facebook-f">acebook</i></div>


                    </div>


                </div>
            </div>
        </div>

        // <div className="login">
        //     <form className="login_form">
        //         <div className="text_login">Đăng nhập</div>
        //         <div>
        //             {/* <div>Email</div> */}
        //             <input className="inputText" type="text" placeholder="Email của bạn" ></input>
        //         </div>
        //         <div>
        //             <input className="inputText" type="password" placeholder="Mật khẩu"></input>
        //         </div>
        //         <div>
        //             <a ><Link to={ROUTERS.USER.PRODUCTS}><span>Quên mật khẩu</span></Link>
        //             </a>
        //         </div>
        //         <div>
        //             <button><Link to={ROUTERS.USER.HOME}><span>Đăng nhập</span></Link></button>
        //         </div>
        //     </form>




        // </div>
    );
};
export default memo(SignUpPage);