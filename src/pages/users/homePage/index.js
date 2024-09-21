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

const HomePage = () => {
  const [menuCategories, setMenuCategories] = useState([
    {
      name: "Điện thoại, Tablet",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCTS,
      child: [
        {
          name: "Iphone",
          path: ROUTERS.USER.PRODUCTS
        },
        {
          name: "Samsung",
          path: ROUTERS.USER.PRODUCTS
        }
      ]
    },
    {
      name: "Laptop",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCTS,
      child: [
        {
          name: "MAC",
          path: ROUTERS.USER.PRODUCTS
        },
        {
          name: "ASUS",
          path: ROUTERS.USER.PRODUCTS
        }
      ]
    },
    {
      name: "Âm thanh",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Đồ gia dụng",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Phụ kiện",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Máy tính để bàn",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Màn hình",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCTS
    },
    {
      name: "Tivi",
      icon: <AiOutlineRight />,
      path: ROUTERS.USER.PRODUCTS
    }
  ]);
  const images = [
    {
      urlImage: require("../../../assets/users/slider.webp")
    },
    {
      urlImage: require("../../../assets/users/slider2.jpg")
    },
    {
      urlImage: require("../../../assets/users/slider3.png")
    }
  ];
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
                        <Link to={itemCategory.path}>
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
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
