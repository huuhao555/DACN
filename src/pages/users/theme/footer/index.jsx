import { memo } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 .col-sm-6 col-xs-12">
            <div className="footer-about">
              <img src={require("../../../../assets/users/footer/icon7.png")} />
              <ul>
                <li>Địa chỉ: 18A/1 Cộng Hòa, Phường 4</li>
                <li>
                  Phone:{" "}
                  <Link
                    to=""
                    style={{ textDecoration: "none", color: "#1c1c1c" }}
                  >
                    0987-654-321
                  </Link>
                </li>
                <li>Email: N10.DACN@vaa.edu.vn</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 .col-sm-6 col-xs-12">
            <div className="footer-info">
              <ul>
                <li>
                  {" "}
                  <Link to="#">Thông tin tài khoản</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">Cửa hàng</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">Liên hệ</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">Giỏ hàng</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">Chính sách bảo hành</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">Khách hàng doanh nghiệp (B2B)</Link>{" "}
                </li>
              </ul>
              <ul>
                <li>
                  {" "}
                  <Link to="#">Tuyển dụng</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">Mua hàng trả góp Online</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">Tra cứu hoá đơn điện tử</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">Chính sách khui hộp sản phẩm Apple</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">Mua hàng và thanh toán Online</Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="#">Chính sách bảo mật thông tin cá nhân</Link>{" "}
                </li>
              </ul>
              <div className="footer-qr">
                <div className="qr">
                  <img
                    style={{ width: "90px" }}
                    src={require("../../../../assets/users/footer/qrtest.png")}
                  />
                </div>
                <div className="operating-system">
                  <img
                    style={{
                      width: "100px",
                      display: "flex",
                      cursor: "pointer"
                    }}
                    src={require("../../../../assets/users/footer/android.webp")}
                  />
                  <img
                    style={{ width: "100px", cursor: "pointer" }}
                    src={require("../../../../assets/users/footer/ios.webp")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 .col-sm-12 col-xs-12">
            <div className="footer-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.7868440737476!2d106.65377246960023!3d10.800022416684648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292976c117ad%3A0x5b3f38b21051f84!2zSOG7jWMgVmnhu4duIEjDoG5nIEtow7RuZyBWaeG7h3QgTmFtIENTMg!5e0!3m2!1svi!2s!4v1726836515085!5m2!1svi!2s"
                width="320"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
