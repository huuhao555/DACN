import React from "react";
import "./style.scss"; // Đường dẫn file style của bạn
import { Link } from "react-router-dom";

import { ROUTERS } from "../../../../utils/router";

const ViewedHistoriesProducts = () => {


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
                        <Link
                            key={product?._id}
                            to={`${ROUTERS.USER.DETAILS}/${product?._id}`}
                            state={{ productId: product?._id }}>
                            <div className="viewed-product-item">
                                <img src={product?.imageUrl} alt={product?.name} />
                                <div className="product-info">
                                    <p>{product?.name}</p>
                                    <p>{product?.prices?.toLocaleString("vi-VN")}₫ </p>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewedHistoriesProducts;
