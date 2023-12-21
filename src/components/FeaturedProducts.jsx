import ProductGrid from "./ProductGrid";
import SectionTitle from "./SectionTitle";

const FeaturedProducts = () => {
  return (
    <div className=" mt-12">
      <SectionTitle title="Featured Products" />
      <ProductGrid />
    </div>
  );
};

export default FeaturedProducts;
