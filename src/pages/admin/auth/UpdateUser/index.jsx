import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import SuccessComponent from "../../../../component/general/Success";

const UpdateUser = () => {
  const [message, setMessage] = useState("");
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, id } = location.state || {};
  const [formData, setFormData] = useState({
    email: user.email,
    fullName: user.name,
    phone: user.phone,
    isAdmin: user.isAdmin.toString()
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
        `http://localhost:3001/api/user/update-user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            isAdmin: formData.isAdmin === "true"
          })
        }
      );

      if (!response.ok) {
        setMessage(
          "Chỉnh sửa tài khoản không thành công! Vui lòng kiểm tra lại thông tin."
        );
        setTrigger(true);
        setTimeout(() => setTrigger(false), 3000);
        return;
      }

      setMessage("Chỉnh sửa tài khoản thành công");
      setTrigger(true);
      setTimeout(() => {
        setTrigger(false);
        navigate("/admin/quan-ly-nguoi-dung");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
      setTrigger(true);
      setTimeout(() => setTrigger(false), 3000);
    }
  };

  return (
    <div className="login-overlay-admin">
      <div className="login-form-admin">
        <h2>Sửa thông tin người dùng</h2>
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
        <select
          name="isAdmin"
          value={formData.isAdmin}
          onChange={handleInputChange}
          className="role-select"
        >
          <option value="true">Quản lý</option>
          <option value="false">Người dùng</option>
        </select>

        <button className="btn-signup" onClick={onHandlSignUp}>
          Sửa
        </button>
      </div>
      <SuccessComponent message={message} trigger={trigger} />
    </div>
  );
};

export default UpdateUser;
