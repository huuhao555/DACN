import "./style.scss";
import { useContext, useState } from "react";
import { CartContext } from "../../../middleware/CartContext";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaApplePay,
  FaGooglePay
} from "react-icons/fa";

const PaymentPage = () => {
  const { cart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.Price * item.quantity,
    0
  );

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handlePayment = () => {
    // Placeholder for payment processing logic
    alert("Payment processed successfully!");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="payment-page">
          <h1>Thanh Toán</h1>
          <div className="payment-form">
            <h2>Thông tin thẻ tín dụng</h2>
            <input
              type="text"
              name="cardNumber"
              placeholder="Số thẻ"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              maxLength="16"
            />
            <input
              type="text"
              name="cardName"
              placeholder="Họ và Tên "
              value={paymentDetails.cardName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={paymentDetails.expiryDate}
              onChange={handleInputChange}
              maxLength="5"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              maxLength="3"
            />
            <button className="complete-payment" onClick={handlePayment}>
              Thanh toán
            </button>
          </div>
          <div className="payment-methods">
            <h3>Hoặc thanh toán bằng</h3>
            <div className="payment-icons">
              <FaCcVisa size={36} />
              <FaCcMastercard size={36} />
              <FaPaypal size={36} />
              <FaApplePay size={36} />
              <FaGooglePay size={36} />
            </div>
          </div>
          <div className="order-summary">
            <h2>Thông tin đơn hàng</h2>
            {cart.map((item) => (
              <div key={item.id} className="order-item">
                <span>
                  {item.Company} {item.Type_name}
                </span>
                <span>${(item.Price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="total-price">
              <strong>Tổng tiền:</strong>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
