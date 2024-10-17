import "./style.scss";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";
import Breadcrumb from "../theme/breadcrumb";
import { IMAGES } from "../../../assets/image";
// import {
//   AiOutlineHeart,
//   AiOutlineShoppingCart,
//   AiFillHeart
// } from "react-icons/ai";
import ProductsComponent from "../../../component/productGrid/index";
import { AiOutlineSearch } from "react-icons/ai";
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

  // const dataProductsNew = [];
  // dataProductsNew.push(products);
  // const [dataProducts, setDataProducts] = useState([products] || []);
  const dataSearch = [];
  const Search = (event) => {
    // const valueInputSearch = event.target.value.toLowerCase();
    // const filteredProducts = products.filter((product) =>
    //   product.Type_name.toLowerCase().includes(valueInputSearch)
    // );
    // setProducts(filteredProducts);
  };

  const Sort = (key) => {
    // const dataNewSort = [...products];
    // if (key === 1) {
    //   dataNewSort.sort((a, b) => a.Price - b.Price);
    // } else if (key === 2) {
    //   dataNewSort.sort((a, b) => b.Price - a.Price);
    // }
    // setProducts(dataNewSort);
    // console.log(dataNewSort);
  };

  const [priceMin, setPriceMin] = useState(null);
  const [priceMax, setPriceMax] = useState(null);

  const handlePriceRange = (event) => {
    // const dataSearchPrice = [...products];
    // const dataNewSearchPrice = [];
    // dataSearchPrice.forEach((item, key) => {
    //   if (item.Price >= priceMin && item.Price <= priceMax) {
    //     dataNewSearchPrice.push(item);
    //     setProducts(dataNewSearchPrice);
    //   } else setProducts(products);
    //   return;
    // });
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
                    <p>Từ </p>
                    <input
                      type="number"
                      value={priceMin || ""}
                      min={0}
                      onChange={(e) => {
                        setPriceMin(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <p>Đến</p>
                    <input
                      type="number"
                      value={priceMax || ""}
                      min={0}
                      onChange={(e) => {
                        setPriceMax(e.target.value);
                      }}
                    />
                  </div>
                  <div>
                    <AiOutlineSearch onClick={handlePriceRange} />
                  </div>
                </div>
              </div>
              <div className="sidebar-item">
                <h3>Sắp xếp</h3>
                <div className="tags">
                  {sorts.map((item, key) => (
                    <div
                      className={`tag ${key}`}
                      key={key}
                      onClick={() => Sort(key)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="sidebar-item">
                <h3>Thể loại khác</h3>
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
              <div className="col-lg-9">
                <ProductsComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ProductPage);
