import React, { useContext, useEffect, useState } from "react";
import { IMAGES } from "../../../assets/image";
import "./style.scss";
import { Link } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";
import { UserContext } from "../../../middleware/UserContext";
import { NotificationContext } from "../../../middleware/NotificationContext";

const ProductManagement = () => {
  const { addNotification } = useContext(NotificationContext);
  const [products, setProducts] = useState([]);
  const { user } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3009/api/product/getAllProduct"
        );
        if (!response.ok) throw new Error(response.statusText);

        const data = await response.json();
        console.log(data);
        setProducts(Array.isArray(data.data) ? data.data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3009/api/product/delete-product/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Network response was not ok: ${errorMessage}`);
      }

      const data = await response.json();

      const deletedProduct = products.find((product) => product._id === id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );

      addNotification(
        `${deletedProduct?.name} đã được xoá khỏi danh sách sản phẩm.`
      );
    } catch (error) {
      console.error("Error deleting product: ", error);
    }
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((n) => n + 1);

  return (
    <div>
      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Nhãn hàng</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="product-info">
                    <img
                      src={`http://localhost:3009/uploads/images/${product.imageUrl}`}
                      alt={product.name}
                    />
                    <div>
                      <h4>{product.name}</h4>
                    </div>
                  </div>
                </td>
                <td>{product.company}</td>
                <td>{product.quantityInStock}</td>
                <td>
                  <span className="price-old"></span>
                  <span className="price-new">đ{product.prices}</span>
                </td>
                <td>
                  <button className="view-btn">👁️</button>
                  <Link
                    to={`${ROUTERS.ADMIN.UPDATE_PRODUCT}/${product._id}`}
                    className="edit-btn"
                    state={{ product: product, id: product._id }}
                  >
                    ✏️
                  </Link>
                  {user?.dataUser?.isAdmin && (
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="delete-btn"
                    >
                      🗑️
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hiển thị số trang */}
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`page-number ${currentPage === number ? "active" : ""}`}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
