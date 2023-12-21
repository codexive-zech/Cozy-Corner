import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartItemList = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.cartId} item={item} />;
        })}
      </div>
    </>
  );
};

export default CartItemList;
