import { FeaturedProducts, Hero } from "../components";
import { customFetch } from "../utils";

const featuredProductsUrl = "/products?featured=true";

const featuredProductsQuery = {
  queryKey: ["featuredProduct"],
  queryFn: () => customFetch(featuredProductsUrl),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = response.data.data;
  return { products };
}; // the loader function that load the data before page is rendered

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
