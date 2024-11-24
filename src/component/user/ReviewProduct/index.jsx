import React, { useContext, useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import "./style.scss";
import { UserContext } from "../../../middleware/UserContext";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [replyTexts, setReplyTexts] = useState({});
  const { user } = useContext(UserContext);
  const [averageRating, setAverageRating] = useState(0);

  const fetchDataReview = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/product/get-details/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const data = await response.json();

      setAverageRating(data?.data?.averageRating);
      setReviews(data?.data?.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataReview();
  }, [productId]);

  const handleReplySubmit = async (reviewId) => {
    const replyText = replyTexts[reviewId];
    if (!replyText?.trim()) {
      alert("Vui lòng nhập nội dung phản hồi.");
      return;
    }

    const userId = user?.dataUser?.id;
    const username = user?.dataUser?.name;

    try {
      const response = await fetch(
        `http://localhost:3001/api/review/${productId}/review/${reviewId}/add-reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId,
            comment: replyText,
            username
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit reply");
      }

      const data = await response.json();

      setReviews(data?.product?.reviews);
      await fetchDataReview();
      setReplyTexts((prev) => ({
        ...prev,
        [reviewId]: ""
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="review-section">
        <h2 className="review-heading">Đánh giá sản phẩm</h2>
        <div className="average-rating">
          <span className="rating-value">{averageRating?.toFixed(1)}</span>
          <div className="rating-stars">
            {Array.from({ length: 5 }, (_, index) => {
              const filledPercentage = Math.min(
                Math.max((averageRating - index) * 100, 0),
                100
              );
              return (
                <div
                  key={index}
                  className="star"
                  style={{
                    background: `linear-gradient(
              to right,
              #ffcc00 ${filledPercentage}%,
              #ddd ${filledPercentage}%
            )`
                  }}
                ></div>
              );
            })}
          </div>
        </div>

        <div className="reviews-list">
          {reviews?.map((review) => {
            return (
              <div className="review-item" key={review._id}>
                <div className="review-header">
                  <div className="user-avatar">
                    <img
                      src={`https://api.dicebear.com/6.x/identicon/svg?seed=${review.username}`}
                      alt={review.username}
                    />
                  </div>

                  <h4 className="username">{review.username}</h4>

                  <div className="user-rating">
                    {Array.from({ length: 5 }, (_, index) => (
                      <AiFillStar
                        key={index}
                        className={index < review.rating ? "filled" : ""}
                      />
                    ))}
                  </div>

                  <div className="review-footer">
                    <span className="reply-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="review-body">
                    <p className="comment">{review.comment}</p>
                    <div className="reply-comment">
                      {review.replies.map((item) => (
                        <div key={item._id}>
                          <h4 className="reply-username">{`${item.username} phản hồi: `}</h4>
                          <p className="comment">{item.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {user?.dataUser?.isAdmin && (
                    <div className="reply-section">
                      <textarea
                        placeholder="Nhập phản hồi của bạn..."
                        value={replyTexts[review._id] || ""}
                        onChange={(e) =>
                          setReplyTexts((prev) => ({
                            ...prev,
                            [review._id]: e.target.value
                          }))
                        }
                      />
                      <button
                        className="reply-button"
                        onClick={() => handleReplySubmit(review._id)}
                      >
                        Gửi phản hồi
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
