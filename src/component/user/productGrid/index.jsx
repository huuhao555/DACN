import "./styleGrid.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiCpuLine } from "react-icons/ri";
import { BsDeviceSsdFill } from "react-icons/bs";
import { PiFrameCornersBold } from "react-icons/pi";
import { FaMemory } from "react-icons/fa";
import { ROUTERS } from "../../../utils/router";

const ProductsGridComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3009/api/product/getAllProduct"
        );
        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        setProducts(Array.isArray(data.data) ? data.data : []);
        console.log(data.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="product-item" key={product._id}>
            <div className="product-item-image">
              <Link to={ROUTERS.USER.DETAILS} state={{ product }}>
                <img
                  className="add-to-img"
                  src={`http://localhost:3009/uploads/images/${product.imageUrl}`}
                  alt={product.name}
                />
              </Link>
            </div>

            <div className="product-item-bottom">
              <Link to={ROUTERS.USER.DETAILS} state={{ product }}>
                <div className="item-product-bottom">
                  <h3>{product.name}</h3>
                  <div className="proloop-technical">
                    {[
                      {
                        tag: "ssd",
                        icon: <BsDeviceSsdFill />,
                        value: product.memory
                      },
                      {
                        tag: "lcd",
                        icon: <PiFrameCornersBold />,
                        value: `${product.inches} inch ${product.screenResolution}`
                      },
                      { tag: "ram", icon: <FaMemory />, value: product.ram },
                      { tag: "cpu", icon: <RiCpuLine />, value: product.cpu }
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
                  <p>{product.prices ? product.prices : "N/A"}đ</p>{" "}
                  {/* Check for Price */}
                </div>
              </Link>
            </div>
            <div className="product-item-cart">
              <button
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
        <p>No products available</p> // Display message if products is empty
      )}
    </div>
  );
};

export default ProductsGridComponent;
