// src/pages/admin/createProductAdmin/CreateProductAdmin.js
import React, { useState } from "react";
import "./style.scss";
import { forEach } from "abc/lib/async";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    productsTypeName: "",
    quantityInStock: "",
    prices: "",
    inches: "",
    screenResolution: "",
    imageUrl: null,
    bannerUrl: null,
    company: "",
    cpu: "",
    ram: "",
    memory: "",
    gpu: "",
    weight: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, imageUrl, imageFile: file });
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const bannerUrl = URL.createObjectURL(file);
      setFormData({ ...formData, bannerUrl, bannerFile: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formToSubmit = new FormData();
      const response = await fetch("http://localhost:3009/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        alert(
          "Thêm sản phẩm không thành công! Vui lòng kiểm tra lại thông tin."
        );
        return;
      }
      const data = await response.json();
      console.log();
      alert("Thêm sản phẩm thành công");
      setFormData({
        name: "",
        productsTypeName: "",
        quantityInStock: "",
        prices: "",
        inches: "",
        screenResolution: "",
        imageUrl: null,
        bannerUrl: null,
        company: "",
        cpu: "",
        ram: "",
        memory: "",
        gpu: "",
        weight: ""
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-product-admin">
      <h1>Tạo Sản Phẩm</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Loại sản phẩm:</label>
          <input
            type="text"
            name="productsTypeName"
            value={formData.productsTypeName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Số lượng trong kho:</label>
          <input
            type="number"
            name="quantityInStock"
            value={formData.quantityInStock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Giá:</label>
          <input
            type="number"
            name="prices"
            value={formData.prices}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Kích thước (Inches):</label>
          <input
            type="text"
            name="inches"
            value={formData.inches}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Độ phân giải màn hình:</label>
          <input
            type="text"
            name="screenResolution"
            value={formData.screenResolution}
            onChange={handleChange}
            required
          />
        </div>
        <div className="image">
          <label>Ảnh sản phẩm:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {formData.imageUrl && (
            <img src={formData.imageUrl} alt="Product Preview" />
          )}
        </div>
        <div className="banner">
          <label>Banner sản phẩm:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            required
          />
          {formData.bannerUrl && (
            <img src={formData.bannerUrl} alt="Banner Preview" />
          )}
        </div>

        <div>
          <label>Công ty:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CPU:</label>
          <input
            type="text"
            name="cpu"
            value={formData.cpu}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>RAM:</label>
          <input
            type="text"
            name="ram"
            value={formData.ram}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bộ nhớ:</label>
          <input
            type="text"
            name="memory"
            value={formData.memory}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>GPU:</label>
          <input
            type="text"
            name="gpu"
            value={formData.gpu}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Cân nặng:</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Gửi đi</button>
      </form>
    </div>
  );
};

export default CreateProduct;
