import React from "react";
import "./style.scss"; // Đường dẫn file style của bạn

const ViewedHistoriesProducts = () => {
    // Lấy danh sách sản phẩm đã xem từ Local Storage
    const getViewedProducts = () => {
        return JSON.parse(localStorage.getItem("viewedProducts")) || [];
    };

    const viewedProducts = getViewedProducts();

    return (
        <div className="viewed-histories">
            <h3>Lịch sử sản phẩm đã xem</h3>
            <div className="viewed-products-list">
                {viewedProducts.length === 0 ? (
                    <p>Chưa có sản phẩm nào trong lịch sử.</p>
                ) : (
                    viewedProducts.map((product) => (
                        <div key={product._id} className="viewed-product-item">
                            <img src={product.imageUrl} alt={product.name} />
                            <div className="product-info">
                                <p>{product.name}</p>
                                <p>{product.price} VND</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewedHistoriesProducts;
