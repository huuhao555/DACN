import { memo, useState } from "react";
import "./style.scss";
import { Link, Route } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";
import Breadcrumb from "../theme/breadcrumb";
import { IMAGES } from "../../../assets/image";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiFillHeart
} from "react-icons/ai";
import ProductsComponent from "../../../component/product";
const ProductPage = () => {
  const sorts = [
    "Mới nhất",
    "Giá thấp đến cao",
    "Giá cao đến thấp",
    "Đang giảm giá"
  ];

  const [categories] = useState([
    {
      name: "Điện thoại, Tablet",
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Laptop",
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Âm thanh",
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Đồ gia dụng",
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Phụ kiện",
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Máy tính để bàn",
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Màn hình",
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Tivi",
      path: ROUTERS.USER.PRODUCTS
    }
  ]);
  const [products, setProducts] = useState([
    {
      laptop_ID: 1,
      Type_name: "Macbook",
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
      Image: IMAGES.USER.PRODUCTS.MACBOOK.MAC_M1,
      Price: 25000000,
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
    },
    {
      laptop_ID: 3,
      Type_name: "Spectre x360",
      Image: IMAGES.USER.PRODUCTS.MACBOOK.MAC_M1,
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
      Image: IMAGES.USER.PRODUCTS.MACBOOK.MAC_M1,
      Price: 30000000,
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
      Image: IMAGES.USER.PRODUCTS.MACBOOK.MAC_M1,
      Price: 35000000,
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
      Image: IMAGES.USER.PRODUCTS.MACBOOK.MAC_M1,
      Price: 25000000,
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
  const dataProductsNew = [];
  dataProductsNew.push(products);
  const [dataProducts, setDataProducts] = useState([products] || []);
  const dataSearch = [];
  const Search = (event) => {
    const valueInputSearch = event.target.value;
    products.forEach((data) => {
      console.log(valueInputSearch);
      if (data.Type_name === valueInputSearch) {
        dataSearch.push(data);
        return setProducts(dataSearch);
      } else {
        return dataProductsNew;
      }
    });
  };
  return (
    <>
      <Breadcrumb />
      <div className="container-product product">
        <div className="row">
          <div className="col-lg-3">
            <div className="sidebar">
              <div className="sidebar-item">
                <h3>Tìm kiếm</h3>
                <input type="text" onChange={Search} />
              </div>
              <div className="sidebar-item">
                <h3> Mức Giá</h3>
                <div className="price-range-wrap">
                  <div>
                    <p>Từ</p>
                    <input type="number" min={0} />
                  </div>
                  <div>
                    <p>Đến</p>
                    <input type="number" min={0} />
                  </div>
                </div>
              </div>
              <div className="sidebar-item">
                <h3>Sắp xếp</h3>
                <div className="tags">
                  {sorts.map((item, key) => (
                    <div
                      className={`tag ${key === 0 ? "active" : ""}`}
                      key={key}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="sidebar-item">
                <h2>Thể loại khác</h2>
                <ul>
                  {categories.map((category, key) => (
                    <li key={key}>
                      <Link to={category.path}>{category.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div lassName="col-lg-9">
                <ProductsComponent products={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProductPage);
