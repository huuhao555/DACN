import { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../../../middleware/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../../utils/router";
import "./style.scss";

const OrderPage = () => {
  const { pathname } = useLocation();
  const navigator = useNavigate();
  const location = useLocation();
  const { selectedProducts } = location.state || {};
  const { user } = useContext(UserContext) || {};
  const [cartId, setCartId] = useState();
  const [dataOrder, setDataOrder] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    name: user?.dataUser?.name || "",
    phone: user?.dataUser?.phone || "",
    email: user?.dataUser?.email || "",
    shippingAddress: ""
  });
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const getAllCart = useCallback(async () => {
    if (!user || !user.dataUser) return;
    const id = user.dataUser.id;
    try {
      const response = await fetch(
        ` http://localhost:3001/api/cart/get-cart/${id}`
      );
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      setCartId(data?._id);
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });

    if (name === "shippingAddress") {
      fetchSuggestions(value);
    }
  };
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(
        `https://rsapi.goong.io/Place/AutoComplete?api_key=YAAkQr05IwPk9mIFw3zTv9FE0LX4cJ1wryk77Bfb&input=${query}`
      );
      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (error) {
      console.error("Error fetching shippingAddress suggestions:", error);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setPaymentDetails({
      ...paymentDetails,
      shippingAddress: suggestion.description
    });
    setSuggestions([]);
  };

  const handlePayment = async () => {
    console.log(paymentDetails);
    if (window.confirm("Bạn có chắc chắn đặt hàng không?")) {
      try {
        const response = await fetch("http://localhost:3001/api/order/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...paymentDetails,
            userId: user.dataUser.id,
            productIds: selectedProducts,
            cartId: cartId
          })
        });

        if (!response.ok) throw new Error("Order creation failed.");
        navigator(ROUTERS.USERPROFILE.ORDER_MANAGERMENT);
      } catch (error) {
        alert("Đặt hàng thất bại");
      }
    }
  };
  const totalPrice = dataOrder
    ? dataOrder.products.reduce(
        (acc, item) => acc + item.productId.prices * item.quantity,
        0
      )
    : 0;
  const shippingCost = totalPrice && totalPrice > 50000000 ? 0 : 800000;
  const vat = parseInt(totalPrice ? totalPrice * 0.1 : 0);
  const grandTotal = totalPrice + vat + shippingCost;
  return (
    <div className="container">
      <div className="row">
        <div className="payment-page">
          <h1>Thanh Toán</h1>
          <div className="payment-form">
            <h2>Thông tin đặt hàng</h2>
            <input
              type="text"
              name="name"
              placeholder="Tên người nhận"
              value={paymentDetails.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={paymentDetails.phone}
              onChange={handleInputChange}
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
              name="shippingAddress"
              placeholder="Địa chỉ nhận hàng"
              value={paymentDetails.shippingAddress}
              onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
              <ul className="address-suggestions">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    onClick={() => handleSelectSuggestion(suggestion)}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
                      <td colSpan="4" style={{ textAlign: "right" }}>
                        Tổng tiền hàng:
                      </td>
                      <td>{totalPrice.toLocaleString("vi-VN")} VNĐ</td>
                    </tr>
                    <tr>
                      <td colSpan="4" style={{ textAlign: "right" }}>
                        VAT:
                      </td>
                      <td>{vat.toLocaleString("vi-VN")} VNĐ</td>
                    </tr>
                    <tr>
                      <td colSpan="4" style={{ textAlign: "right" }}>
                        Chi phí vận chuyển:
                      </td>
                      <td>{shippingCost.toLocaleString("vi-VN")} VNĐ</td>
                    </tr>

                    <tr>
                      <td colSpan="4" style={{ textAlign: "right" }}>
                        Tổng tiền:
                      </td>
                      <td style={{ textAlign: "left", fontWeight: "bold" }}>
                        {grandTotal.toLocaleString("vi-VN")} VNĐ
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Không có sản phẩm trong giỏ hàng.</p>
            )}
            <button className="complete-payment" onClick={handlePayment}>
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
