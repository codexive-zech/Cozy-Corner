import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const productsUrl = "/products";

const productsQuery = (queryParams) => {
  const { search, category, company, order, price, shipping } = queryParams; // params value been destructured
  return {
    queryKey: [
      "products",
      search ?? "", // if search value from the query params is null/undefined take right value else use left search value and make a new request if the search value changes in the params
      category ?? "all", // if category value from the query params is null/undefined take right value else use left category value and make a new request if the category value changes in the params
      company ?? "all", // if company value from the query params is null/undefined take right value else use left company value and make a new request if the company value changes in the params
      order ?? "a-z", // if order value from the query params is null/undefined take right value else use left order value and make a new request if the order value changes in the params
      shipping ?? false, // if shipping value from the query params is null/undefined take right value else use left shipping value and make a new request if the shipping value changes in the params
      price ?? 100000, // if price value from the query params is null/undefined take right value else use left price value and make a new request if the price value changes in the params
      queryParams.page ? parseInt(queryParams.page) : 1, // make a new request when the page value from the params changes
    ], // key
    queryFn: () => customFetch(productsUrl, { params: queryParams }), // query ajax function taking in the params needed for the request as a single object in GET
  };
}; // R-Query ajax request implementation

export const loader =
  // adding the queryClient as a parameter to the action func


    (queryClient) =>
    async ({ request }) => {
      // It takes a URL string from the request.url property. It creates a URL object from that URL string. It extracts the query parameters using the searchParams property. It converts the query parameters into an iterable of key-value pairs using the entries() method. It spreads these key-value pairs into an array. It uses Object.fromEntries() to create a new object where the key-value pairs become properties of the object.
      const params = Object.fromEntries([
        ...new URL(request.url).searchParams.entries(),
      ]); // getting the url query params as an Obj key/value pair

      const response = await queryClient.ensureQueryData(productsQuery(params)); // accessing the query func and ensuring a new request is made via the query client if that query is not yet cached else return the cached query value
      const products = response.data.data;
      const metaInfo = response.data.meta;
      return { products, metaInfo, params };
    };

const Products = () => {
  return (
    <>
      <div className=" mt-8 lg:mt-10">
        <Filters />
        <ProductsContainer />
        <PaginationContainer />
      </div>
    </>
  );
};

export default Products;
