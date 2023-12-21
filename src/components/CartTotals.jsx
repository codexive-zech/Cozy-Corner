import { useSelector } from "react-redux";
import { formatPrice } from "../utils";

const CartTotals = () => {
  const { shipping, orderTotal, tax, cartProductTotal } = useSelector(
    (state) => state.cart
  );
  return (
    <>
      <div className=" card bg-base-200 mb-4 ">
        <div className=" card-body">
          <p className=" flex  text-sm justify-between border-b border-base-300 pb-3">
            <span>Subtotal</span>
            <span className=" font-medium">
              {formatPrice(cartProductTotal)}
            </span>
          </p>
          <p className=" flex  text-sm justify-between border-b border-base-300 pb-3">
            <span>Shipping</span>
            <span className=" font-medium">{formatPrice(shipping)}</span>
          </p>
          <p className=" flex text-sm justify-between border-b border-base-300 pb-3">
            <span>Tax</span>
            <span className=" font-medium">{formatPrice(tax)}</span>
          </p>
          <p className=" flex  text-base justify-between mt-4 pb-3">
            <span>Order Total</span>
            <span className=" font-medium">{formatPrice(orderTotal)}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CartTotals;
