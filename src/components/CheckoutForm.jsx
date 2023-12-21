import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearItem } from "../features/cartSlice";

const createOrder = "/orders";

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address } = Object.fromEntries(formData);
    const { user } = store.getState().user;
    const { orderTotal, cartItems, cartItemNumb } = store.getState().cart;
    const paymentInfo = {
      name,
      address,
      numItemsInCart: cartItemNumb,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
    };

    try {
      await customFetch.post(
        createOrder,
        { data: paymentInfo },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      store.dispatch(clearItem());
      queryClient.removeQueries(["orders"]);
      toast.success(" Your Order Has Been Received");
      return redirect("/orders");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "There Was an Error Placing Your Order";
      toast.error(errorMessage);
      if (error.response.status === 401 || error.response.status === 403) {
        return redirect("/login");
      }
      return null;
    }
  };

const CheckoutForm = () => {
  return (
    <>
      <Form className=" flex flex-col gap-y-5" method="POST">
        <h3 className=" font-medium text-xl capitalize">Billing Information</h3>
        <FormInput type="text" label="First Name" name="name" />
        <FormInput type="text" label="Address" name="address" />
        <div className=" mt-4">
          <SubmitBtn text="Place Your Order" />
        </div>
      </Form>
    </>
  );
};

export default CheckoutForm;
