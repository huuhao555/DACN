import React, { useState } from "react";
import "./style.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product = {}, id = "" } = location.state || {};

  const [formData, setFormData] = useState({
    name: product.name || "",
    productsTypeName: product.productsTypeName || "",
    quantityInStock: product.quantityInStock || 0,
    prices: product.prices || 0,
    inches: product.inches || "",
    screenResolution: product.screenResolution || "",
    imageUrl: product.imageUrl || "",
    bannerUrl: product.bannerUrl || "",
    company: product.company || "",
    cpu: product.cpu || "",
    ram: product.ram || "",
    memory: product.memory || "",
    gpu: product.gpu || "",
    weight: product.weight || ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData({ ...formData, imageUrl: URL.createObjectURL(file) });
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setFormData({ ...formData, bannerUrl: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formToSubmit = new FormData();

      Object.keys(formData).forEach((key) => {
        formToSubmit.append(key, formData[key]);
      });

      if (imageFile) formToSubmit.append("image", imageFile);
      if (bannerFile) formToSubmit.append("banner", bannerFile);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Token không hợp lệ. Vui lòng đăng nhập lại.");
        return;
      }

      const response = await fetch(
        `http://localhost:3001/api/product/update/${id}`,
        {
          method: "PUT",
          headers: {
            token: `Bearer ${token}`
          },
          body: formToSubmit
        }
      );

      if (!response.ok) {
        alert(
          "Sửa sản phẩm không thành công! Vui lòng kiểm tra lại thông tin."
        );
        return;
      }
      alert("Sửa sản phẩm thành công");
      navigate(ROUTERS.ADMIN.MANAGE_PRODUCTS);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-product-admin">
      <h1>Sửa Sản Phẩm</h1>
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
          />
        </div>
        <div>
          <label>Độ phân giải màn hình:</label>
          <input
            type="text"
            name="screenResolution"
            value={formData.screenResolution}
            onChange={handleChange}
          />
        </div>
        <div className="image">
          <label>Ảnh sản phẩm:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Product Preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>
        <div className="banner">
          <label>Banner sản phẩm:</label>
          <input type="file" accept="image/*" onChange={handleBannerChange} />
          {formData.bannerUrl && (
            <img
              src={formData.bannerUrl}
              alt="Banner Preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>
        <div>
          <label>Công ty:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>CPU:</label>
          <input
            type="text"
            name="cpu"
            value={formData.cpu}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>RAM:</label>
          <input
            type="text"
            name="ram"
            value={formData.ram}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bộ nhớ:</label>
          <input
            type="text"
            name="memory"
            value={formData.memory}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>GPU:</label>
          <input
            type="text"
            name="gpu"
            value={formData.gpu}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cân nặng:</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Sửa sản phẩm</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
