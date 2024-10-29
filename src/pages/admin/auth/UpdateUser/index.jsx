import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./style.scss";

const UpdateUser = ({ closeSignUpForm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, id } = location.state || {};
  const [formData, setFormData] = useState({
    email: user.email,
    fullName: user.name,
    phone: user.phone,
    isAdmin: user.isAdmin
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onHandlSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3009/api/user/update-user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );
      if (!response.ok) {
        alert(
          "Chỉnh sửa tài khoản không thành công! Vui lòng kiểm tra lại thông tin."
        );
        return;
      }

      alert("Chỉnh sửa tài khoản thành công");
      navigate("/admin/quan-ly-nguoi-dung");
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="login-overlay-admin">
      <div className="login-form-admin">
        <h2>Sửa thông tin người dùng</h2>
        <AiOutlineClose
          className="icon-close-admin"
          onClick={closeSignUpForm}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="fullName"
          placeholder="Họ tên"
          value={formData.fullName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="isAdmin"
          placeholder="Vai trò"
          value={formData.isAdmin}
          onChange={handleInputChange}
        />
        <button className="btn-signup" onClick={onHandlSignUp}>
          Sửa
        </button>
      </div>
    </div>
  );
};

export default UpdateUser;
