import "./styleGrid.scss";
import { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart, AiFillStar } from "react-icons/ai";
import { ROUTERS } from "../../utils/router";
import { IMAGES } from "../../assets/image";

const ProductsGridComponent = (...props) => {
  const [products, setProducts] = useState([
    {
      laptop_ID: 1,
      Type_name: "Macbook ",
      Image: IMAGES.USER.PRODUCTS.MACBOOK.MAC_M1,
      Price: 20000000,
      Description: "This is product 1",
      Company: "Apple",
      Inches: "24",
      ScreenResolution: "2k",
      Cpu: "Intel Core i5 2.3GHz",
      Ram: "8GB",
      Memory: "128GB SSD",
      Gpu: "Intel Iris Plus Graphics 640",
      OpSys: "macOS",
      Weight: "1.37kg"
    },
    {
      laptop_ID: 2,
      Type_name: "XPS 13",
      Image: IMAGES.USER.PRODUCTS.DELL.DELL_XPS,
      Price: 25000000,
      Description:
        "Dell's hello  premium ultraportable laptop with high-end build quality",
      Company: "Dell ",
      Inches: "13.3",
      ScreenResolution: "4k",
      Cpu: "Intel Core i7-1165G7",
      Ram: "16GB",
      Memory: "512GB SSD",
      Gpu: "Intel Iris Xe Graphics",
      OpSys: "Windows 10",
      Weight: "1.2kg"
    },
    {
      laptop_ID: 3,
      Type_name: "Spectre x360",
      Image: IMAGES.USER.PRODUCTS.HP.SPECTRE_16,
      Price: 27000000,
      Description:
        "HP's premium convertible laptop with touch screen and stylus support",
      Company: "HP",
      Inches: "13.3",
      ScreenResolution: "Full HD",
      Cpu: "Intel Core i7-10510U",
      Ram: "16GB",
      Memory: "1TB SSD",
      Gpu: "Intel UHD Graphics",
      OpSys: "Windows 10",
      Weight: "1.3kg"
    },
    {
      laptop_ID: 4,
      Type_name: "ThinkPad X1 Carbon",
      Image: IMAGES.USER.PRODUCTS.LENOVO.THINKPAD,
      Price: 50000000,
      Description:
        "Business-class laptop with superior durability and performance",
      Company: "Lenovo",
      Inches: "14",
      ScreenResolution: "Quad HD",
      Cpu: "Intel Core i7-1165G7",
      Ram: "16GB",
      Memory: "1TB SSD",
      Gpu: "Intel Iris Xe Graphics",
      OpSys: "Windows 11",
      Weight: "1.09kg"
    },
    {
      laptop_ID: 5,
      Type_name: "ROG Strix G15",
      Image: IMAGES.USER.PRODUCTS.ASUS.ROR_G16,
      Price: 5000000,
      Description:
        "High-performance gaming laptop with powerful GPU and RGB lighting",
      Company: "ASUS",
      Inches: "15.6",
      ScreenResolution: "Full HD 144Hz",
      Cpu: "AMD Ryzen 9 5900HX",
      Ram: "16GB",
      Memory: "1TB SSD",
      Gpu: "NVIDIA GeForce RTX 3060",
      OpSys: "Windows 11",
      Weight: "2.3kg"
    },
    {
      laptop_ID: 6,
      Type_name: "XPS 13",
      Image: IMAGES.USER.PRODUCTS.DELL.DELL_XPS,
      Price: 15000000,
      Description:
        "Dell's premium ultraportable laptop with high-end build quality",
      Company: "Dell ",
      Inches: "13.3",
      ScreenResolution: "4k",
      Cpu: "Intel Core i7-1165G7",
      Ram: "16GB",
      Memory: "512GB SSD",
      Gpu: "Intel Iris Xe Graphics",
      OpSys: "Windows 10",
      Weight: "1.2kg"
    }
  ]);
  return (
    <div className="product-list">
      {products.map((product, key) => (
        <div className="product-item" key={product.laptop_ID}>
          <Link to={ROUTERS.USER.DETAILS} state={{ product }}>
            <img
              className="add-to-img"
              src={product.Image}
              alt={product.Type_name}
            />
          </Link>
          <button className="add-to-cart">
            Thêm giỏ hàng
            <AiOutlineShoppingCart />
          </button>

          <Link to={ROUTERS.USER.DETAILS} state={{ product }}>
            <div className="item-product-bottom">
              <h3>{product.Company + " " + product.Type_name}</h3>
              <p>{product.Price.toLocaleString()}đ</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductsGridComponent;
