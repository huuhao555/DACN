import { useContext } from "react";
import UserContext from "../../../middleware/UserContext";

const OrderStorage = () => {
  const { user } = useContext(UserContext);

  return <h1>OGHO</h1>;
};
export default OrderStorage;
