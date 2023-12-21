import { useSelector } from "react-redux";
import { CartItemList, CartTotals, SectionTitle } from "../components";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItemNumb } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  if (cartItemNumb === 0) {
    return (
      <>
        <div className=" mt-20 lg:mt-28 text-center">
          <SectionTitle title="There are no product in the cart" />;
        </div>
      </>
    );
  }
  return (
    <>
      <div className=" mt-14 lg:mt-20">
        <SectionTitle title="Shopping cart" />
        <div className=" mt-3 grid gap-6 lg:grid-cols-12">
          <div className=" lg:col-span-8">
            <CartItemList />
          </div>
          <div className=" lg:col-span-4 ml-3 mb-4">
            <CartTotals />
            {user ? (
              <Link to="/checkout" className=" btn btn-primary btn-block">
                Proceed To Checkout
              </Link>
            ) : (
              <Link to="/login" className=" btn btn-primary btn-block">
                Proceed To Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
