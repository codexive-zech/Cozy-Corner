import { FAQ, FeaturedProducts, Hero, Newsletter } from "../components";

import { customFetch } from "../utils";

const featuredProductsUrl = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProduct"], // key
  queryFn: () => customFetch(featuredProductsUrl), // query ajax function
}; // R-Query ajax request implementation

export const loader =
  // queryClient as a parameter to the action func
  (queryClient) => async () => {
    const response = await queryClient.ensureQueryData(featuredProductsQuery); // accessing the query and ensuring a new request made via the query client if that query is not yet cached else return the cached query value
    const products = response.data.data;
    return { products };
  }; // the loader function that load the data before page is rendered

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Newsletter />
    </>
  );
};

export default Landing;
