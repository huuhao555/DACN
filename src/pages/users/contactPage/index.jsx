import React from "react";
import "./style.scss";
import ImgContact from "../../../assets/users/header/1.png";

const ContactPage = () => {
  return (
    <div className="contact-box">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <img src={ImgContact} alt="" />
          </div>
          <div className="offset-lg-1 col-xl-5">
            <h2>Liên hệ với nhóm10 </h2>
            <form action="" method="POST">
              <div className="row">
                <div>
                  <input type="text" placeholder="Họ và tên" />
                </div>
                <div>
                  <input type="phonenumber" placeholder="Số điện thoại" />
                </div>
                <div>
                  <input type="email" name="" id="" placeholder="Email" />
                </div>
                <div>
                  <label>Nhập nội dung gửi</label>
                  <textarea name="" id=""></textarea>
                </div>
                <div></div>
                <div></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
