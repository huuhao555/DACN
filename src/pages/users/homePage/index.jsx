import { memo, useState, useEffect } from "react";
import "./style.scss";
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineRight,
  AiOutlinePhone,
  AiOutlineProfile,
  AiOutlineUser
} from "react-icons/ai";
import { Link, Route } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";
import { IMAGES } from "../../../assets/image";
import ProductsGridComponent from "../../../component/user/productGrid";
import ProductsSlideComponent from "../../../component/user/productSlide/index";

const HomePage = () => {
  const [dataMain] = useState([
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
      Memory: "128GB",
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
      Memory: "512GB",
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
      Memory: "1TB",
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
      Memory: "1TB",
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
      Memory: "1TB",
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
      Memory: "512GB",
      Gpu: "Intel Iris Xe Graphics",
      OpSys: "Windows 10",
      Weight: "1.2kg"
    }
  ]);
  const [menuCategories, setMenuCategories] = useState([
    {
      name: "Laptop Gaming",
      title: "laptopgaming",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCT_TYPE,
      child: [
        {
          name: "MAC",
          path: ROUTERS.USER.PRODUCT_TYPE
        },
        {
          name: "ASUS",
          path: ROUTERS.USER.PRODUCT_TYPE
        }
      ]
    },
    {
      name: "Laptop AI",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCT_TYPE
    },
    {
      name: "Laptop đồ họa ",
      title: "laptopdohoa",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCT_TYPE,
      child: [
        {
          name: "Macbook Pro",

          path: ROUTERS.USER.PRODUCT_TYPE
        },
        {
          name: "Macbook Air",
          path: ROUTERS.USER.PRODUCT_TYPE
        }
      ]
    },
    {
      name: "Laptop Văn phòng",
      title: "laptopvanphong",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCT_TYPE
    },

    {
      name: "Laptop Sinh viên",
      title: "laptopsinhvien",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCT_TYPE
    },
    {
      name: "Laptop cảm ứng",
      title: "laptopcamung",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCT_TYPE
    },
    {
      name: "Laptop mỏng nhẹ",
      title: "laptopmongnhẹ",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCT_TYPE
    },
    {
      name: "Laptop cũ",
      title: "laptopcu",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCT_TYPE
    }
  ]);
  const images = [
    {
      urlImage: require("../../../assets/users/slider/slider.webp")
    },
    {
      urlImage: require("../../../assets/users/slider/slider2.jpg")
    },
    {
      urlImage: require("../../../assets/users/slider/slider3.png")
    }
  ];
  const [products, setProducts] = useState(dataMain);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => (prevCounter + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className="header-content">
        <div className="container">
          <div className="row categories-container">
            <div className="col-lg-3">
              <nav className="categories-list">
                <ul className="categories-menu">
                  {menuCategories.map((itemCategory, keyCategory) => {
                    return (
                      <li key={keyCategory}>
                        <Link
                          to={itemCategory.path}
                          state={{
                            title: itemCategory.title
                          }}
                        >
                          {itemCategory.name} {itemCategory.icon}{" "}
                        </Link>{" "}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            <div className="col-lg-9 search-container">
              <div className="search">
                <div className="search-form">
                  <form>
                    <input
                      type="text"
                      name=""
                      value=""
                      placeholder="Bạn cần tìm kiếm gì?"
                    />
                    <button type="submit">Tìm kiếm</button>
                  </form>
                </div>
                <div className="search-phone">
                  <div
                    className="search-phone-icon"
                    style={{ display: "block" }}
                  >
                    <AiOutlinePhone />
                  </div>
                  <div className="search-phone-number">
                    <p>Hotline: 0987.654.321</p>
                    <span>Hỗ trợ 24/7</span>
                  </div>
                </div>
              </div>
              <div className="item-home">
                <img
                  src={images[counter].urlImage}
                  alt={`slider-${counter}`}
                  style={{
                    marginTop: "8px",
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "5px 5px 5px 5px"
                  }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="slide-product">
                <ProductsSlideComponent products={products} />
              </div>
              <div className="grid-product">
                <ProductsGridComponent products={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
