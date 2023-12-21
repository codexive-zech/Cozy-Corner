import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";

const productsUrl = "/products";

const productsQuery = (queryParams) => {
  const { search, category, company, order, price, shipping } = queryParams;
  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      order ?? "a-z",
      shipping ?? false,
      price ?? 100000,
      queryParams.page ? parseInt(queryParams.page) : 1,
    ],
    queryFn: () => customFetch(productsUrl, { params: queryParams }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await queryClient.ensureQueryData(productsQuery(params));
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
