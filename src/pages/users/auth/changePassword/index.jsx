import React, { useState, useContext } from "react";
import "./style.scss";
import { UserContext } from "../../../../middleware/UserContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
  const { user } = useContext(UserContext);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field]
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }
    const id = user.dataUser.id;
    try {
      const response = await fetch(
        `http://localhost:3001/api/user/change-password/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
            confirmNewPassword: passwordData.confirmPassword
          })
        }
      );

      if (!response.ok) {
        alert("Đổi mật khẩu không thành công. Vui lòng thử lại.");
        return;
      }

      alert("Đổi mật khẩu thành công");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  };

  return (
    <div className="change-password-container">
      <div className="content-heading">
        <span>Đổi Mật Khẩu</span>
      </div>
      <div className="box-change-password">
        <form className="form-change-password">
          {["currentPassword", "newPassword", "confirmPassword"].map(
            (field, index) => (
              <div className="form-line-wrapper" key={index}>
                <label>
                  {field === "currentPassword"
                    ? "Mật khẩu hiện tại"
                    : field === "newPassword"
                      ? "Mật khẩu mới"
                      : "Xác nhận mật khẩu mới"}
                </label>
                <div className="input-wrapper">
                  <input
                    required
                    type={showPassword[field] ? "text" : "password"}
                    name={field}
                    className="form-control"
                    placeholder={`Nhập ${field === "currentPassword" ? "mật khẩu hiện tại" : field === "newPassword" ? "mật khẩu mới" : "xác nhận mật khẩu mới"}`}
                    value={passwordData[field]}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() => toggleShowPassword(field)}
                    className="eye-icon"
                  >
                    {showPassword[field] ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </span>
                </div>
              </div>
            )
          )}
          <div className="form-line-wrapper">
            <button
              type="submit"
              className="btn-change-password"
              onClick={handleChangePassword}
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
