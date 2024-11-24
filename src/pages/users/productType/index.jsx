import { Link, useLocation } from "react-router-dom";
import { IMAGES } from "../../../assets/image";
import { useState, useEffect, useContext } from "react";
import ProductsGridComponent from "../../../component/user/productGrid";
import { AiOutlineSearch } from "react-icons/ai";
import "./style.scss";
import { ROUTERS } from "../../../utils/router";
import { BsDeviceSsdFill } from "react-icons/bs";
import { PiFrameCornersBold } from "react-icons/pi";
import { FaMemory } from "react-icons/fa6";
import { RiCpuLine } from "react-icons/ri";
import { UserContext } from "../../../middleware/UserContext";
const ProductType = () => {
  const location = useLocation();
  const { title } = location.state || {};
  const [products, setProducts] = useState();
  const { user } = useContext(UserContext) || {};
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/product/getAllProduct"
        );
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
  const [productsStart, setProductsStart] = useState([]);
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
        case "laptopai":
          filteredProducts = products.filter((product) => {
            const screenResolution = product.screenResolution.toLowerCase();
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
            const memory = product.memory.toLowerCase();
            if (memory.includes("tb")) {
              const valueInGb = parseFloat(memory) * 1024;
              console.log(valueInGb);
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
    console.log(filteredProducts);

    if (filteredProducts.length !== productsStart.length) {
      setProducts(filteredProducts);
      setProductsStart(filteredProducts);
    }
  }, [title, products, productsStart]);

  const Search = (event) => {
    const valueInputSearch = event.target.value.toLowerCase();
    if (valueInputSearch === "") {
      setProducts(productsStart);
      return;
    }

    const searchProducts = products.filter((product) => {
      return (
        product?.Company.toLowerCase().includes(valueInputSearch) ||
        product?.Type_name.toLowerCase().includes(valueInputSearch)
      );
    }, []);

    setProducts(searchProducts);
  };

  const handleOptionMin = (e) => {
    setPriceMin(e.target.value);
  };
  const handleOptionMax = (e) => {
    setPriceMax(e.target.value);
  };

  const [sortProducts, setSortProducts] = useState([]);

  const handlePriceRange = () => {
    const dataNewSearchPrice = productsStart.filter(
      (item) => item.Price >= priceMin && item.Price <= priceMax
    );
    setSortProducts(dataNewSearchPrice);
    setProducts(dataNewSearchPrice);
    return dataNewSearchPrice;
  };
  const Sort = (key) => {
    const dataNewSort = [
      ...(sortProducts?.length > 0 ? sortProducts : products)
    ];

    if (key === 1) {
      dataNewSort.sort((a, b) => a.Price - b.Price);
    } else if (key === 2) {
      dataNewSort.sort((a, b) => b.Price - a.Price);
    }

    setProducts(dataNewSort);
  };

  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);

  const handleCart = async (product) => {
    if (!user) alert("Vui lòng đăng nhập");
    try {
      const response = await fetch(
        "http://localhost:3001/api/cart/add-update",
        {
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
        }
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      alert("thêm giỏ hàng thành công");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };
  return (
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
                    <option value="50000000">50.000.000</option>
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
                    className={`tag ${key}`}
                    key={key}
                    onClick={() => Sort(key)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="sidebar-item">
              <h3>Thể loại khác</h3>
              <ul>
                {categories.map((category, key) => (
                  <li key={key}>
                    <Link to={category.path}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>
        <div className="col-lg-9">
          <div className="row">
            <div className="col-lg-9">
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
                            <h3>{product?.name}</h3>
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
                            <p>
                              {product?.prices.toLocaleString("vi-VN")
                                ? product?.prices.toLocaleString("vi-VN")
                                : "N/A"}
                              đ
                            </p>{" "}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductType;
