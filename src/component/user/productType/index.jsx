import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.scss";
import { ROUTERS } from "../../../utils/router";

const ProductTypeComponent = ({ title, heading }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigator = useNavigate();
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
      }
    };
    fetchProducts();
  }, []);

  // Filter products based on title
  useEffect(() => {
    if (products.length > 0) {
      let filtered = [];
      switch (title) {
        case "laptopmongnhẹ":
          filtered = products.filter(
            (product) => parseFloat(product.weight) < 1.5
          );
          break;
        case "laptopsinhvien":
          filtered = products.filter(
            (product) => parseFloat(product.prices) < 25000000
          );
          break;
        case "laptopgaming":
          filtered = products.filter(
            (product) => parseFloat(product.prices) > 40000000
          );
          break;
        case "laptopai":
          filtered = products.filter((product) => {
            const screenResolution = product?.screenResolution?.toLowerCase();
            return (
              screenResolution.includes("k") &&
              parseFloat(screenResolution) >= 1
            );
          });
          break;
        case "laptopdohoa":
          filtered = products.filter(
            (product) => parseFloat(product.prices) > 50000000
          );
          break;
        case "laptopvanphong":
          filtered = products.filter((product) => {
            const memory = product?.memory?.toLowerCase();
            const valueInGb = memory.includes("tb")
              ? parseFloat(memory) * 1024
              : parseFloat(memory);
            return valueInGb >= 500;
          });
          break;
        case "laptopcu":
          filtered = products.filter(
            (product) => parseFloat(product.prices) < 15000000
          );
          break;
        default:
          filtered = products;
      }
      setFilteredProducts(filtered);
    }
  }, [title, products]);
  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleProductType = () => {
    navigator(ROUTERS.USER.PRODUCT_TYPE, { state: { title } });
  };
  return (
    <div className="product-slider">
      <h2 onClick={handleProductType} className="product-slider-title">
        {heading}
      </h2>

      <div className="productSlide-wrapper">
        <div
          className="product-slider-container"
          style={{ transform: `translateX(-${currentIndex * 310}px)` }}
        >
          {filteredProducts.map((product) => (
            <div className="product-item" key={product._id}>
              <div className="product-item-image">
                <Link
                  to={`${ROUTERS.USER.DETAILS}/${product._id}`}
                  state={{ productId: product?._id }}
                >
                  <img src={product.imageUrl} alt={product.name} />
                </Link>
              </div>
              <div className="product-item-details">
                <h3>{product.name}</h3>
                <p className="price">
                  {product.prices.toLocaleString("vi-VN")} ₫
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Nút điều khiển */}
        <div className="slider-controls">
          <button className="slider-control prev" onClick={handlePrev}>
            {"<"}
          </button>
          <button className="slider-control next" onClick={handleNext}>
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTypeComponent;
