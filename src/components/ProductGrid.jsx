import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

const ProductGrid = () => {
  const { products } = useLoaderData();

  return (
    <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-3 py-7">
      {products.map((product) => {
        const { title, image, price } = product.attributes;
        const { id } = product;
        const dollarPrice = formatPrice(price);
        return (
          <Link
            key={id}
            to={`/product/${id}`}
            className=" card w-full bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <figure className=" px-3 pt-4">
              <img
                src={image}
                alt={title}
                className=" w-full h-64 lg:h-48 object-cover rounded-box "
              />
            </figure>
            <div className=" card-body items-center">
              <h2 className="card-title text-2xl tracking-wider">{title}</h2>
              <p className="  text-secondary">{dollarPrice}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
