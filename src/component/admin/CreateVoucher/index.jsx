import { apiLink } from "../../../config/api";
import "./style.scss";
import React, { useState, useEffect } from "react";

const CreateVoucher = () => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [vouchers, setVouchers] = useState([]); // Trạng thái lưu trữ danh sách voucher

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await fetch(apiLink + "/api/voucher/list");
        const result = await response.json();
        if (response.ok) {
          setVouchers(result.data); // Giả sử API trả về mảng các voucher
        } else {
          setResponseMessage(result.message);
        }
      } catch (error) {
        setResponseMessage(`Error: ${error.message}`);
      }
    };
    fetchVouchers();
  }, []);

  const handleCreateVoucher = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiLink + "/api/voucher/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ code, discount })
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage(`${result.message}`);
        // Thêm voucher mới vào danh sách voucher
        setVouchers((prevVouchers) => [...prevVouchers, { code, discount }]);
        setCode(""); // Reset input
        setDiscount("");
      } else {
        setResponseMessage(`${result.message}`);
      }
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="create-voucher-container">
      <h1>Tạo Voucher</h1>
      <form onSubmit={handleCreateVoucher}>
        <div>
          <label>Voucher Code:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phần trăm giảm giá:</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </div>
        <button type="submit">Tạo mã</button>
      </form>
      {responseMessage && <p className="response-message">{responseMessage}</p>}

      {/* Table for displaying created vouchers */}
      <table className="voucher-table">
        <thead>
          <tr>
            <th>Voucher</th>
            <th>Phần trăm giảm giá</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.length > 0 ? (
            vouchers.map((voucher, index) => (
              <tr key={index}>
                <td>{voucher.code}</td>
                <td>{voucher.discount}%</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Chưa có voucher được tạo</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CreateVoucher;
