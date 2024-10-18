import "./style.scss";
import { useLocation } from "react-router-dom";

const CartPage = () => {
  const location = useLocation();
  const { product } = location.state || {};
  return <div></div>;
};

export default CartPage;
