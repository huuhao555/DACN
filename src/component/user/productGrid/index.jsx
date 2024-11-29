import "./styleGrid.scss";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiCpuLine } from "react-icons/ri";
import { BsDeviceSsdFill } from "react-icons/bs";
import { PiFrameCornersBold } from "react-icons/pi";
import { FaMemory } from "react-icons/fa";
import { ROUTERS } from "../../../utils/router";
import { UserContext } from "../../../middleware/UserContext";
const ProductsGridComponent = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);

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
  // return (
  //   <div className="product-list">
  //     {products.length > 0 ? (
  //       products.map((product) => (
  //         <div className="product-item" key={product?._id}>
  //           <div className="product-item-image">
  //             <Link
  //               to={`${ROUTERS.USER.DETAILS}/${product?._id}`}
  //               state={{ productId: product?._id }}
  //             >
  //               <img
  //                 className="add-to-img"
  //                 src={product.imageUrl}
  //                 alt={product.name}
  //               />
  //             </Link>
  //           </div>

  //           <div className="product-item-bottom">
  //             <Link
  //               to={`${ROUTERS.USER.DETAILS}/${product?._id}`}
  //               state={{ productId: product?._id }}
  //             >
  //               <div className="item-product-bottom">
  //                 <h3>{product.name}</h3>
  //                 <div className="proloop-technical">
  //                   {[
  //                     {
  //                       tag: "ssd",
  //                       icon: <BsDeviceSsdFill />,
  //                       value: product.memory
  //                     },
  //                     {
  //                       tag: "lcd",
  //                       icon: <PiFrameCornersBold />,
  //                       value: `${product.inches} inch ${product.screenResolution}`
  //                     },
  //                     { tag: "ram", icon: <FaMemory />, value: product.ram },
  //                     { tag: "cpu", icon: <RiCpuLine />, value: product.cpu }
  //                   ].map((item) => (
  //                     <div
  //                       className="proloop-technical--line"
  //                       data-tag={item.tag}
  //                       key={item.tag}
  //                     >
  //                       {item.icon}
  //                       <span>{item.value}</span>
  //                     </div>
  //                   ))}
  //                 </div>
  //                 <p>
  //                   {product.prices.toLocaleString("vi-VN")
  //                     ? product.prices.toLocaleString("vi-VN")
  //                     : "N/A"}
  //                   đ
  //                 </p>{" "}
  //               </div>
  //             </Link>
  //           </div>
  //           <div className="product-item-cart">
  //             <button
  //               onClick={() => {
  //                 handleCart(product);
  //               }}
  //               type="submit"
  //               className="button btn-buyonl"
  //               name="buy-onl"
  //               id="buy-onl"
  //             >
  //               <span>Thêm vào giỏ</span>
  //             </button>
  //           </div>
  //         </div>
  //       ))
  //     ) : (
  //       <p>No products available</p>
  //     )}
  //   </div>
  // );
};

export default ProductsGridComponent;
