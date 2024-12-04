import React, { useState, useEffect, useContext } from "react";
import { apiLink } from "../../../../config/api";
import { UserContext } from "../../../../middleware/UserContext";
import "./style.scss";

const AddressBook = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const user = useContext(UserContext) || {};
  const userId = user?.user?.dataUser?.id;

  const fetchAddresses = async () => {
    try {
      const response = await fetch(apiLink + `/api/address/list/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch addresses");
      const data = await response.json();
      setAddresses(data.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiLink + "/api/address/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          address,
          userId
        })
      });
      if (!response.ok) throw new Error("Failed to create address");
      const data = await response.json();
      setName("");
      setPhone("");
      setEmail("");
      setAddress("");
      fetchAddresses();
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="address-book">
      <h1 className="address-book__title">Địa chỉ khách hàng</h1>

      <form className="address-book__form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Địa chỉ:</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="form-textarea"
          ></textarea>
        </div>
        <div className="grp-form-button">
          <button type="submit" className="form-button">
            Thêm địa chỉ
          </button>
        </div>
      </form>

      <h2 className="address-book__subtitle">Danh sách địa chỉ</h2>
      {addresses.length === 0 ? (
        <p className="no-address">Không tìm thấy địa chỉ.</p>
      ) : (
        <table className="address-list">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Địa chỉ</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((addr, index) => (
              <tr key={index}>
                <td>{addr.name}</td>
                <td>{addr.phone}</td>
                <td>{addr.email}</td>
                <td>{addr.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AddressBook;
