import React, { useEffect, useState } from "react";
import "./style.scss";

const StaffManagement = () => {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3009/api/user/getAllUser"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const dataAllUser = await response.json();
        setDataUser(dataAllUser.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>PASSWORD</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {dataUser.map((user, index) => (
          <tr key={index}>
            <td>
              <div className="product-info">
                <div>
                  <h4>{user.name}</h4>
                  {/* <p>{user.description}</p> */}
                </div>
              </div>
            </td>
            <td>{user.email}</td>
            <td>*************</td>
            <td>
              <button className="view-btn">👁️</button>
              <button className="edit-btn">✏️</button>
              <button className="delete-btn">🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StaffManagement;
