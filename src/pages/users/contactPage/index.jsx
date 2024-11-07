import React from "react";
import "./style.scss";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiOutlineMail,
  AiOutlinePhone
} from "react-icons/ai";
import { SiZalo } from "react-icons/si";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h2>Liên hệ với chúng tôi</h2>
      <p>
        Chúng tôi rất sẵn lòng hỗ trợ bạn! Bạn có thể liên hệ với chúng tôi qua
        các phương thức dưới đây:
      </p>

      <div className="contact-methods">
        <div className="contact-item">
          <AiFillFacebook className="icon facebook" />
          <span>
            Facebook:
            <a
              href="https://facebook.com/yourshop"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anh Tuấn Phan
            </a>
          </span>
        </div>

        <div className="contact-item">
          <AiFillInstagram className="icon instagram" />
          <span>
            Instagram:
            <a
              href="https://instagram.com/yourshop"
              target="_blank"
              rel="noopener noreferrer"
            >
              Anh Tuấn Phan
            </a>
          </span>
        </div>

        <div className="contact-item">
          <SiZalo className="icon zalo" />

          <span>
            Zalo:
            <a
              href="https://zalo.me/0987654321"
              target="_blank"
              rel="noopener noreferrer"
            >
              0987 654 321
            </a>
          </span>
        </div>

        <div className="contact-item">
          <AiOutlinePhone className="icon phone" />
          <span>
            Điện thoại:{" "}
            <a
              href=" 0987654321"
              target="_blank"
              rel="noopener noreferrer"
              title="phone"
            >
              0987 654 321
            </a>
          </span>
        </div>

        <div className="contact-item">
          <AiOutlineMail className="icon email" />
          <span>
            Email:
            <a href="mailto:support@yourshop.com"> support@dacnN10.com</a>
          </span>
        </div>
      </div>

      <div className="map-container">
        <h2>Vị trí cửa hàng</h2>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.7868440737476!2d106.65377246960023!3d10.800022416684648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292976c117ad%3A0x5b3f38b21051f84!2zSOG7jWMgVmnhu4duIEjDoG5nIEtow7RuZyBWaeG7h3QgTmFtIENTMg!5e0!3m2!1svi!2s!4v1726836515085!5m2!1svi!2s"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
