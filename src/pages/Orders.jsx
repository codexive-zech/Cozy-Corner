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
  return {
    queryKey: [
      "orders",
      user.username,
      params.page ? parseInt(params.page) : 1,
    ],
    queryFn: () =>
      customFetch(orders, {
        params,
        headers: { Authorization: `Bearer ${user.token}` },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const { user } = store.getState().user;
    if (!user) {
      toast.warning("You Must Be Authenticated");
      return redirect("/login");
    }
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]); // getting the url query params as an Obj key/value pair

    try {
      const response = await queryClient.ensureQueryData(
        ordersQuery(params, user)
      );
      const productOrders = response.data.data;
      const metaInfo = response.data.meta;

      return { productOrders, metaInfo };
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "There Was an Error Placing Your Order";
      toast.error(errorMessage);
      if (error?.response?.status === 401 || error?.response?.status === 403) {
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
