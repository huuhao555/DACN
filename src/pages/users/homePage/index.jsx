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
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
