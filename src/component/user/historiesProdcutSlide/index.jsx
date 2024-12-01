import { useState } from "react";
import { ROUTERS } from "../../../utils/router";
import { Link } from "react-router-dom";

const HistoriesProductSlide = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const getViewedProducts = () => {
        return JSON.parse(localStorage.getItem("viewedProducts")) || [];
    };

    const viewedProducts = getViewedProducts();

    const handleNext = () => {
        if (currentIndex < viewedProducts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="productSlide-wrapper">

            <button className="slider-control prev" onClick={handlePrev}>
                {"<"}
            </button>
            <div
                className="productSlide-list"
                style={{ transform: `translateX(-${currentIndex * 310}px)` }}
            >
                {viewedProducts.map((product) => {
                    console.log(product)
                    return (
                        <div className="productSlide-item" key={product._id}>
                            <Link
                                to={`${ROUTERS.USER.DETAILS}/${product._id}`}
                                state={{ productId: product?._id }}
                            >
                                <img
                                    className="add-to-img"
                                    src={product?.imageUrl}
                                    alt={product?.name}
                                />
                                <div className="item-productSlide-bottom">
                                    <h3>{product?.name}</h3>
                                    <p>{product?.prices?.toLocaleString("vi-VN")} ₫</p>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
            <button className="slider-control next" onClick={handleNext}>
                {">"}
            </button>
        </div>
    );
};

export default HistoriesProductSlide;
