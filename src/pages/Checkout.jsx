import { useSelector } from "react-redux";
import { CartTotals, CheckoutForm, SectionTitle } from "../components/index";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

export const loader = (store) => () => {
  const user = store.getState().user.user;
  if (!user) {
    toast.warning("You Must Be Authenticated");
    return redirect("/login");
  }
  return null;
};

const Checkout = () => {
  const { cartItemNumb } = useSelector((state) => state.cart);

  if (cartItemNumb === 0) {
    return (
      <div className=" mt-20 lg:mt-28 text-center">
        <SectionTitle title="Your Cart Is Empty" />
      </div>
    );
  }
  return (
    <div className="mt-20 ">
      <SectionTitle title="Place Your Order!" />
      <div className=" mt-8 grid lg:grid-cols-2 items-start gap-x-8">
        <CheckoutForm />
        <CartTotals />
      </div>
    </div>
  );
};

export default Checkout;
