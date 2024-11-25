import React, { useContext, useEffect, useState } from "react";

import "./style.scss";
import { UserContext } from "../../../middleware/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";

const AddReview = () => {
  const { user } = useContext(UserContext) || {};
  const navigator = useNavigate();
  const [item, setItem] = useState([]);
  const location = useLocation();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { productId } = location.state || {};

  let userId = user?.dataUser?.id;
  useEffect(() => {
    const fetchPendingOrders = async () => {
      if (!userId) {
        console.error("User ID is not available");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3001/api/product/get-details/${productId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        setItem(data?.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchPendingOrders();
  }, [user, productId]);

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const suggestedComments = [
    "Sản phẩm rất tốt",
    "Giao hàng nhanh",
    "Đóng gói cẩn thận",
    "Chất lượng không như mong đợi",
    "Sẽ ủng hộ lần sau"
  ];

  const submitReview = async () => {
    const username = user?.dataUser?.name;
    try {
      const response = await fetch(
        `http://localhost:3001/api/review/${productId}/add-review/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            rating,
            comment,
            username,
            productId
          })
        }
      );
      await response.json();
      setRating("");
      setComment("");
      setMessage("Cảm ơn bạn đã đánh giá sản phẩm!");
      navigator(ROUTERS.USER.HOME);
      alert("Đánh giá sản phẩm thành công");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="add-review">
      {item ? (
        <div>
          <div key={item.id} className="order">
            <table>
              <thead>
                <tr>
                  <th>Hình sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                <tr key={item?._id}>
                  <td>
                    <img
                      src={item?.imageUrl}
                      alt={item?.productName || "Product Image"}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "contain"
                      }}
                    />
                  </td>
                  <td>{item?.name}</td>
                  <td>{item?.prices?.toLocaleString("vi-VN")} VNĐ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Không có đơn hàng nào đang xử lý.</p>
      )}

      <div className="rating-stars">
        <h3>Đánh giá</h3>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "filled" : ""}`}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your comment"
      />

      <div className="suggested-comments">
        {suggestedComments.map((suggestion, index) => (
          <button
            key={index}
            onClick={() =>
              setComment((prev) =>
                prev ? `${prev}, ${suggestion}` : suggestion
              )
            }
          >
            {suggestion}
          </button>
        ))}
      </div>

      <button onClick={submitReview}>Submit</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddReview;
