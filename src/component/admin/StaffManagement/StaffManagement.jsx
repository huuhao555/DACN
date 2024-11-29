import React, { useEffect, useState, useContext } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";
import { UserContext } from "../../../middleware/UserContext";
const StaffManagement = () => {
  const [dataUser, setDataUser] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/user/getAllUser"
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Network response was not ok: ${errorMessage}`);
        }
        const dataAllUser = await response.json();
        setDataUser(dataAllUser.data);
      } catch (error) {
        throw new Error(`Network response was not ok: ${error}`);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token không hợp lệ. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/user/delete-user/${id}`,
        {
          method: "DELETE",
          headers: {
            token: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Network response was not ok: ${errorMessage}`);
      }

      await response.json();

      setDataUser((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>STT</th>
          <th>HỌ & TÊN</th>
          <th>SỐ ĐIỆN THOẠI</th>
          <th>EMAIL</th>
          <th>MẬT KHẨU</th>
          <th>VAI TRÒ</th>
          <th>HÀNH ĐỘNG</th>
        </tr>
      </thead>
      <tbody>
        {dataUser.map((userItem, index) => (
          <tr
            key={userItem._id}
            style={{
              backgroundColor: userItem.isAdmin
                ? "rgb(125, 215, 135)"
                : "transparent"
            }}
          >
            <td>{index + 1}</td>
            <td>
              <div className="product-info">
                <div>
                  <h4>{userItem.name}</h4>
                </div>
              </div>
            </td>
            <td>{userItem.phone}</td>
            <td>{userItem.email}</td>
            <td>***********</td>
            <td>{userItem.isAdmin ? "Quản lý" : "Người dùng"}</td>
            <td>
              <Link
                to={`${ROUTERS.ADMIN.UPDATE_USER}/${userItem._id}`}
                className="edit-btn"
                state={{ user: userItem, id: userItem._id }}
              >
                ✏️
              </Link>
              {user?.dataUser?.isAdmin && (
                <button
                  onClick={() => handleDeleteUser(userItem._id)}
                  className="delete-btn"
                >
                  🗑️
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StaffManagement;
