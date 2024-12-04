import { Link, useLocation } from "react-router-dom";
import { IMAGES } from "../../../assets/image";
import { useState, useEffect, useContext } from "react";
import ProductsGridComponent from "../../../component/user/productGrid";
import { AiOutlineSearch } from "react-icons/ai";
import "./style.scss";
import { AiOutlineClose } from "react-icons/ai";

import { ROUTERS } from "../../../utils/router";
import { BsDeviceSsdFill } from "react-icons/bs";
import { PiFrameCornersBold } from "react-icons/pi";
import { FaMemory } from "react-icons/fa6";
import { RiCpuLine } from "react-icons/ri";
import { UserContext } from "../../../middleware/UserContext";
import { apiLink } from "../../../config/api";
const ProductType = () => {
  const location = useLocation();
  const { title } = location.state || {};
  console.log(title);
  const [products, setProducts] = useState();
  const { user } = useContext(UserContext) || {};
  const [noResults, setNoResults] = useState(false);
  const [activeTag, setActiveTag] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiLink + "/product/getAllProduct");
        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        setProducts(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const sorts = [
    "Mới nhất",
    "Giá thấp đến cao",
    "Giá cao đến thấp",
    "Đang giảm giá"
  ];
  const [productsAll, setProductsAll] = useState([]);
  const [productsMain, setProductsMain] = useState(null);

  useEffect(() => {
    let filteredProducts = [];

    if (products) {
      switch (title) {
        case "laptopmongnhẹ":
          filteredProducts = products.filter(
            (product) => parseFloat(product.weight) < 1.5
          );
          break;
        case "laptopsinhvien":
          filteredProducts = products.filter(
            (product) => parseFloat(product.prices) < 25000000
          );
          break;
        case "laptopgaming":
          filteredProducts = products.filter(
            (product) => parseFloat(product.prices) > 40000000
          );
          break;
        case "discount":
          filteredProducts = products
            .filter((item) => item.discount > 0)
            .sort((a, b) => b.discount - a.discount);
          break;
        case "laptopai":
          filteredProducts = products.filter((product) => {
            const screenResolution = product?.screenResolution?.toLowerCase();
            if (screenResolution.includes("k")) {
              const valueScreen = parseFloat(screenResolution);
              return valueScreen >= 1;
            }
            return false;
          });
          break;
        case "laptopdohoa":
          filteredProducts = products.filter(
            (product) => parseFloat(product.prices) > 50000000
          );
          break;
        case "laptopvanphong":
          filteredProducts = products.filter((product) => {
            const memory = product?.memory?.toLowerCase();
            if (memory.includes("tb")) {
              const valueInGb = parseFloat(memory) * 1024;
              return valueInGb >= 500;
            } else if (memory.includes("gb")) {
              const valueInGb = parseFloat(memory);
              return valueInGb >= 500;
            }
            return false;
          });
          break;
        case "laptopcu":
          filteredProducts = products.filter(
            (product) => parseFloat(product.prices) < 15000000
          );
          break;
        default:
          filteredProducts = products;
      }
    }

    if (productsMain === null && filteredProducts.length > 0) {
      setProductsMain(filteredProducts);
    }

    if (filteredProducts.length !== productsAll.length) {
      setProducts(filteredProducts);
      setProductsAll(filteredProducts);
    }
  }, [title, products, productsAll, productsMain]);

  const Search = (event) => {
    const valueInputSearch = event.target.value.toLowerCase();

    if (valueInputSearch === "") {
      setProducts(productsMain);
      return;
    }

    const searchProducts = products.filter((product) => {
      return (
        product?.company?.toLowerCase().includes(valueInputSearch) ||
        product?.name?.toLowerCase().includes(valueInputSearch)
      );
    }, []);

    setProducts(searchProducts);
    setFilteredProducts(searchProducts);
  };

  const handleOptionMin = (e) => {
    setPriceMin(e.target.value);
  };
  const handleOptionMax = (e) => {
    setPriceMax(e.target.value);
  };
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [sortProducts, setSortProducts] = useState([]);

  const handlePriceRange = () => {
    const min = parseFloat(priceMin);
    const max = parseFloat(priceMax);

    if (min === 0 && max === 0) {
      setFilteredProducts(productsAll);
      setProducts(productsAll);
      setNoResults(false);
    } else {
      const dataNewSearchPrice = productsAll.filter((item) => {
        const price = parseFloat(item.promotionPrice);
        if (min > 0 && max > 0) {
          return price >= min && price <= max;
        } else if (min > 0) {
          return price >= min;
        } else if (max > 0) {
          return price <= max;
        }
        return true;
      });

      if (dataNewSearchPrice.length === 0) {
        setNoResults(true);
        setFilteredProducts([]);
        setProducts([]);
      } else {
        setNoResults(false);
        setFilteredProducts(dataNewSearchPrice);
        setProducts(dataNewSearchPrice);
      }

      return dataNewSearchPrice;
    }
  };
  const Sort = (key) => {
    let dataNewSort = [
      ...(filteredProducts.length > 0 ? filteredProducts : productsMain)
    ];

    switch (key) {
      case 0:
        dataNewSort.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case 1:
        dataNewSort.sort((a, b) => a.promotionPrice - b.promotionPrice);
        break;
      case 2:
        dataNewSort.sort((a, b) => b.promotionPrice - a.promotionPrice);
        break;
      case 3:
        dataNewSort = dataNewSort
          .filter((item) => item.discount > 0)
          .sort((a, b) => b.discount - a.discount);
        break;
      default:
        break;
    }

    setProducts(dataNewSort);
    setFilteredProducts(dataNewSort);
  };

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  const handleCart = async (product) => {
    if (!user) alert("Vui lòng đăng nhập");
    try {
      const response = await fetch(apiLink + "/api/cart/add-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.dataUser.id,
          productId: product._id,
          quantity: 1,
          prices: product.prices.toLocaleString("vi-VN")
        })
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      alert("thêm giỏ hàng thành công");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const handleTagClick = (key) => {
    if (activeTag === key) {
      setActiveTag(null);
      if (filteredProducts.length > 0) {
        setProducts(filteredProducts);
      } else {
        setProducts(productsMain);
      }
    } else {
      setActiveTag(key);
      Sort(key);
    }
  };
  const clearSidebar = () => {
    setProducts(productsMain);
    setNoResults(false);
    setFilteredProducts([]);
    setPriceMin("");

    setPriceMax("");
    setActiveTag(null);
  };
  return (
    <div className="container-product product">
      <div className="row">
        <div className="col-lg-3">
          <div className="sidebar">
            <div className="sidebar-item">
              <div className="top-sidebar-item">
                <h3>Tìm kiếm</h3>
                <AiOutlineClose className="icon-close" onClick={clearSidebar} />
              </div>
              <input type="text" onChange={Search} />
            </div>
            <div className="sidebar-item">
              <h3> Mức Giá</h3>
              <div className="price-range-wrap">
                <div>
                  <p>Từ </p>
                  <select onChange={handleOptionMin} className="optionPrice">
                    <option value="#">---Chọn---</option>
                    <option value="10000000">10.000.000</option>
                    <option value="20000000">20.000.000</option>
                    <option value="30000000">30.000.000</option>
                    <option value="40000000">40.000.000</option>
                  </select>
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
                  <select onChange={handleOptionMax} className="optionPrice">
                    <option value="#">---Chọn---</option>
                    <option value="14500000">14.500.000</option>
                    <option value="60000000">60.000.000</option>
                    <option value="70000000">70.000.000</option>
                    <option value="80000000">80.000.000</option>
                  </select>
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
                    className={`tag ${activeTag === key ? "active" : ""}`}
                    key={key}
                    onClick={() => handleTagClick(key)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-9">
              {noResults ? (
                <h2>Không tìm thấy sản phẩm </h2>
              ) : (
                <div className="product-list">
                  {products?.length > 0 ? (
                    products.map((product) => (
                      <div className="product-item" key={product?._id}>
                        <div className="product-item-image">
                          <Link
                            to={`${ROUTERS.USER.DETAILS}/${product?._id}`}
                            state={{ productId: product?._id }}
                          >
                            <img
                              className="add-to-img"
                              src={product?.imageUrl}
                              alt={product?.name}
                            />
                          </Link>
                        </div>

                        <div className="product-item-bottom">
                          <Link
                            to={`${ROUTERS.USER.DETAILS}/${product?._id}`}
                            state={{ productId: product?._id }}
                          >
                            <div className="item-product-bottom">
                              <h3>{` ${product?.company} ${product?.name}`}</h3>

                              <div className="proloop-technical">
                                {[
                                  {
                                    tag: "ssd",
                                    icon: <BsDeviceSsdFill />,
                                    value: product?.memory
                                  },
                                  {
                                    tag: "lcd",
                                    icon: <PiFrameCornersBold />,
                                    value: `${product?.inches} inch ${product?.screenResolution}`
                                  },
                                  {
                                    tag: "ram",
                                    icon: <FaMemory />,
                                    value: product?.ram
                                  },
                                  {
                                    tag: "cpu",
                                    icon: <RiCpuLine />,
                                    value: product?.cpu
                                  }
                                ].map((item) => (
                                  <div
                                    className="proloop-technical--line"
                                    data-tag={item.tag}
                                    key={item.tag}
                                  >
                                    {item.icon}
                                    <span>{item.value}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="grp-price">
                                {product?.prices ==
                                parseInt(product?.promotionPrice) ? (
                                  <p className="price">
                                    {parseInt(
                                      parseInt(product?.promotionPrice)
                                    )?.toLocaleString("vi-VN")}
                                    ₫
                                  </p>
                                ) : (
                                  <>
                                    <p className="price-old">
                                      {parseInt(
                                        product?.prices
                                      )?.toLocaleString("vi-VN")}
                                      ₫
                                    </p>
                                    <div className="price-new">
                                      <p className="price-discount">
                                        {parseInt(
                                          parseInt(product?.promotionPrice)
                                        )?.toLocaleString("vi-VN")}
                                        ₫
                                      </p>
                                      <p className="discount">
                                        {`-${product?.discount}%`}
                                      </p>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="product-item-cart">
                          <button
                            onClick={() => {
                              handleCart(product);
                            }}
                            type="submit"
                            className="button btn-buyonl"
                            name="buy-onl"
                            id="buy-onl"
                          >
                            <span>Thêm vào giỏ</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No products available</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductType;
