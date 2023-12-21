import { redirect, useLoaderData } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import {
  ComplexPaginationContainer,
  OrderList,
  SectionTitle,
} from "../components";

const orders = "/orders";

const ordersQuery = (params, user) => {
  // getting the user and params needed for the request
  return {
    queryKey: [
      "orders",
      user.username, // make a new request as long as the user is different
      params.page ? parseInt(params.page) : 1, // make a new request when the page value from the params changes
    ], // key value
    queryFn: () =>
      customFetch(orders, {
        params,
        headers: { Authorization: `Bearer ${user.token}` },
      }),
  }; // query ajax function taking in the params and the token needed for the request as a single object in GET
}; // R-Query ajax request implementation

export const loader =
  // adding the store and queryClient as a parameter to the action func


    (store, queryClient) =>
    async ({ request }) => {
      const { user } = store.getState().user; // getting the user state from the Redux user slice via the store
      if (!user) {
        toast.warning("You Must Be Authenticated");
        return redirect("/login");
      } // if the user is empty/null then do not show the checkout page redirect to the login page
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]); // getting the url query params as an Obj key/value pair

      try {
        const response = await queryClient.ensureQueryData(
          ordersQuery(params, user)
        ); // accessing the query func and ensuring a new request is made via the query client if that query is not yet cached else return the cached query value
        const productOrders = response.data.data;
        const metaInfo = response.data.meta;
        return { productOrders, metaInfo };
      } catch (error) {
        const errorMessage =
          error?.response?.data?.error?.message ||
          "There Was an Error Placing Your Order";
        toast.error(errorMessage);
        // if the token has expired or is not valid and throws an error (401, 405) navigate to the login page
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          return redirect("/login");
        }
        return null;
      }
    };

const Orders = () => {
  const { metaInfo } = useLoaderData();

  if (metaInfo.pagination.total < 1) {
    return (
      <>
        <div className=" mt-20 lg:mt-28 text-center">
          <SectionTitle title="You have No Orders Yet. buy now!" />
        </div>
      </>
    );
  }
  return (
    <div className=" mt-20 lg:mt-28">
      <SectionTitle title="Your Orders" />
      <OrderList />
      <ComplexPaginationContainer />
    </div>
  );
};

export default Orders;
