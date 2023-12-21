import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorElement } from "./components";

// LOADERS
import { loader as LandingLoader } from "./pages/Landing";
import { loader as SingleProductLoader } from "./pages/SingleProduct";
import { loader as ProductsLoader } from "./pages/Products";
import { loader as CheckoutLoader } from "./pages/Checkout";
import { loader as OrdersLoader } from "./pages/Orders";

// ACTIONS
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as checkoutAction } from "./components/CheckoutForm";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./app/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
    },
  },
}); // creating a new Query Client instance for react query

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
        loader: LandingLoader(queryClient),
      },
      { path: "about", element: <About /> },
      { path: "cart", element: <Cart /> },
      {
        path: "checkout",
        element: <Checkout />,
        loader: CheckoutLoader(store),
        action: checkoutAction(store, queryClient),
      },
      {
        path: "orders",
        element: <Orders />,
        loader: OrdersLoader(store, queryClient),
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />,
        loader: ProductsLoader(queryClient),
      },
      {
        path: "product/:productId",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
        loader: SingleProductLoader(queryClient),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store),
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <Error />,
    action: registerAction,
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
