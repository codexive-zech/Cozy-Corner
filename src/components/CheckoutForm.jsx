import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearItem, emptyDetails } from "../features/cartSlice";
import PaystackPop from "@paystack/inline-js";
const createOrder = "/orders";

export const action =
  // adding the store and queryClient as a parameter to the action func


    (store, queryClient) =>
    async ({ request }) => {
      const formData = await request.formData(); // retrieve the formData that has been serialized from the browser api
      const { name, address } = Object.fromEntries(formData); // convert it into an object
      const { user } = store.getState().user; // getting the user state from the Redux user slice via the store
      const { orderTotal, cartItems, cartItemNumb } = store.getState().cart; // getting the needed states from the Redux cart slice via the store

      // making sure the serialized form data gotten is not empty
      if (name || address) {
        const paystack = new PaystackPop(); // create a new instance of the Paystack Popup Modal
        return new Promise((resolve, reject) => {
          paystack.newTransaction({
            // adding the need info for the transaction
            key: "pk_test_bbf8a22d3fbb78b217cd7f8ace2d4bb455feed57",
            name,
            amount: orderTotal * 5000,
            address,
            email: user.email,

            // once the transaction is successful (make a request to the Orders creation endpoint)
            onSuccess: async (transaction) => {
              const message = `Payment Complete!. Transaction is ${transaction.message}`;
              toast.success(message);

              // Introduce a 5-second delay here
              setTimeout(async () => {
                const paymentInfo = {
                  name,
                  address,
                  numItemsInCart: cartItemNumb,
                  chargeTotal: orderTotal,
                  orderTotal: formatPrice(orderTotal),
                  cartItems,
                }; // payment information needed for the creation of orders in the server

                try {
                  await customFetch.post(
                    createOrder,
                    { data: paymentInfo },
                    { headers: { Authorization: `Bearer ${user.token}` } }
                  ); // making an ajax POST request adding the url, object needed in the server the token in the header
                  store.dispatch(clearItem()); // dispatch the clear cart items from the redux cart slice via the store
                  queryClient.removeQueries(["orders"]); // getting the queryClient from R-Query and using the removes Queries method to remove the orders query (anytime an order is created the previous query for order is removed)
                  toast.success(
                    `Your Order Has Been Received For ${paymentInfo.name}`
                  ); // display a message
                  resolve(redirect("/orders")); // once the order is created navigate to the orders pay
                } catch (error) {
                  const errorMessage =
                    error?.response?.data?.error?.message ||
                    "There Was an Error Placing Your Order";
                  toast.error(errorMessage); // display an error msg when the order is not created
                  // if the token has expired or is not valid and throws an error (401, 405) navigate to the login page
                  if (
                    error.response.status === 401 ||
                    error.response.status === 403
                  ) {
                    resolve(redirect("/login"));
                  } else {
                    reject(null);
                  }
                }
              }, 5000); // 5000 milliseconds = 5 seconds
            },
            // this will trigger when the user cancel/stop the payment process
            onCancel: (error) => {
              toast.error("You Have Canceled The Transaction");
              console.log(error);
              reject(null);
            },
          });
        });
      } else {
        // if the details for the payment are empty when payment is about to be made then we make sure the cart items are not changing
        store.dispatch(emptyDetails());
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
