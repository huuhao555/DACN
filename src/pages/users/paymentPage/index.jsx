import "./style.scss";
import { useState, useEffect, useCallback, useContext } from "react";
import { CartContext } from "../../../middleware/CartContext";
import {
  FaCcVisa,
  FaCcMastercard,
  FaPaypal,
  FaApplePay,
  FaGooglePay
} from "react-icons/fa";
import { UserContext } from "../../../middleware/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";

const OrderPage = (state) => {
  const navigator = useNavigate();
  const location = useLocation();
  const { selectedProducts } = location.state || {};

  const { user } = useContext(UserContext) || {};

  const [dataOrder, setDataOrder] = useState(null); // Đảm bảo `dataOrder` bắt đầu với `null`
  const [cart, setCart] = useState(null);
  const getAllCart = useCallback(async () => {
    if (!user || !user.dataUser) return;
    const id = user.dataUser.id;
    try {
      const response = await fetch(
        `http://localhost:3001/api/cart/get-cart/${id}`
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      const filteredData = data.products.filter((product) =>
        selectedProducts.includes(product.productId._id)
      );

      setDataOrder({ ...data, products: filteredData });
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    }
  }, [user]);

  useEffect(() => {
    getAllCart();
  }, [getAllCart]);

  const totalPrice = dataOrder
    ? dataOrder.products.reduce(
        (acc, item) => acc + item.productId.prices * item.quantity,
        0
      )
    : 0;

  const [paymentDetails, setPaymentDetails] = useState({
    cardName: user?.dataUser?.name || "",
    phone: user?.dataUser?.phone || "",
    email: user?.dataUser?.email || "",
    address: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handlePayment = async () => {
    if (window.confirm("Bạn có chắc chắn đặt hàng không?")) {
      try {
        const response = await fetch("http://localhost:3001/api/order/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: paymentDetails.cardName,
            phone: paymentDetails.phone,
            email: paymentDetails.email,
            userId: user.dataUser.id,
            cartId: dataOrder._id,
            shippingAddress: {
              address: paymentDetails.address
            },
            productIds: selectedProducts
          })
        });

        if (!response.ok) {
          throw new Error(response.statusText, dataOrder._id);
        }
        const data = await response.json();

        navigator(ROUTERS.USERPROFILE.ORDER_MANAGERMENT);
      } catch (error) {
        alert("Đặt hàng thất bại");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="payment-page">
          <h1>Thanh Toán</h1>
          <div className="payment-form">
            <h2>Thông tin đặt hàng</h2>

            <input
              type="text"
              name="cardName"
              placeholder="Tên người nhận "
              value={paymentDetails.cardName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại "
              value={paymentDetails.phone}
              onChange={handleInputChange}
              maxLength="10"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={paymentDetails.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Địa chỉ nhận hàng"
              value={paymentDetails.address}
              onChange={handleInputChange}
            />
            <button className="complete-payment" onClick={handlePayment}>
              Thanh toán
            </button>
          </div>
          {/* <div className="payment-methods">
            <h3>Hoặc thanh toán bằng</h3>
            <div className="payment-icons">
              <FaCcVisa size={36} />
              <FaCcMastercard size={36} />
              <FaPaypal size={36} />
              <FaApplePay size={36} />
              <FaGooglePay size={36} />
            </div>
          </div> */}
          <div className="order-summary">
            <h2>Thông tin đơn hàng</h2>
            {dataOrder &&
            dataOrder.products &&
            dataOrder.products.length > 0 ? (
              <div className="order-container">
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Sản phẩm</th>
                      <th>Giá</th>
                      <th>Số lượng</th>
                      <th>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataOrder.products.map((item, key) => (
                      <tr key={item._id}>
                        <td>{key + 1}</td>
                        <td>{item.productId.name}</td>
                        <td>
                          {item.productId.prices.toLocaleString("vi-VN")} VNĐ
                        </td>
                        <td>{item.quantity}</td>
                        <td>
                          {(
                            item.productId.prices * item.quantity
                          ).toLocaleString("vi-VN")}{" "}
                          VNĐ
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td
                        colSpan="4"
                        style={{ textAlign: "right", fontWeight: "bold" }}
                      >
                        Tổng tiền:
                      </td>
                      <td style={{ textAlign: "left", fontWeight: "bold" }}>
                        {totalPrice.toLocaleString("vi-VN")} VNĐ
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Không có sản phẩm trong giỏ hàng.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
