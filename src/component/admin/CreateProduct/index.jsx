import React, { useContext, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { NotificationContext } from "../../../middleware/NotificationContext";

const CreateProduct = () => {
  const { addNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    productsTypeName: "",
    quantityInStock: "",
    prices: "",
    discount: "",
    inches: "",
    screenResolution: "",
    company: "",
    cpu: "",
    ram: "",
    memory: "",
    gpu: "",
    weight: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleBannerChange = (e) => {
    setBannerFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      });

      if (imageFile) data.append("image", imageFile);
      if (bannerFile) data.append("banner", bannerFile);

      const response = await fetch("http://localhost:3001/api/product/create", {
        method: "POST",
        body: data,
        headers: {}
      });
      console.log(...data);
      if (!response.ok) {
        alert(
          "Thêm sản phẩm không thành công! Vui lòng kiểm tra lại thông tin."
        );
        return;
      }

      alert("Thêm sản phẩm thành công");
      addNotification(`${formData.name} được thêm vào danh sách sản phẩm.`);
      navigate("/admin/quan-ly-san-pham");

      setFormData({
        name: "",
        productsTypeName: "",
        quantityInStock: "",
        prices: "",
        discount: "",
        inches: "",
        screenResolution: "",
        company: "",
        cpu: "",
        ram: "",
        memory: "",
        gpu: "",
        weight: ""
      });
      setImageFile(null);
      setBannerFile(null);
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
        <label style={{ fontWeight: "bold", color: "#555" }}>
          Giảm giá (%)
        </label>
        <div style={{ display: "flex" }}>
          <input
            style={{ width: "12%", marginRight: "20px" }}
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
          ></input>{" "}
          <span
            style={{ marginTop: "10px", fontSize: "18px", marginLeft: "-10px" }}
          >
            %
          </span>
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
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Product Preview"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>
        <div className="banner">
          <label>Banner sản phẩm:</label>
          <input type="file" accept="image/*" onChange={handleBannerChange} />
          {bannerFile && (
            <img
              src={URL.createObjectURL(bannerFile)}
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
        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
};

export default CreateProduct;
