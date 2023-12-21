import { Link, useLoaderData } from "react-router-dom";
import { formatPrice } from "../utils";

const ProductList = () => {
  const { products } = useLoaderData();

  return (
    <div className=" grid gap-y-4 py-7">
      {products.map((product) => {
        const { title, image, price, company } = product.attributes;
        const { id } = product;
        const dollarPrice = formatPrice(price);
        return (
          <Link
            key={id}
            to={`/product/${id}`}
            className=" p-8 flex flex-col md:flex-row gap-y-3 shadow-md hover:shadow-xl transition-shadow duration-300 flex-wrap bg-base-100 group items-center rounded-box"
          >
            <figure className=" ">
              <img
                src={image}
                alt={title}
                className=" w-44 h-44 lg:h-36 lg:w-36 object-cover rounded-box group-hover:scale-105 transition duration-200"
              />
            </figure>
            <div className=" ml-0 lg:ml-16 lg:self-start lg:mt-4 text-center lg:text-left">
              <h3 className=" text-lg font-medium capitalize">{title}</h3>
              <h4 className="  text-md text-neutral-content capitalize">
                {company}
              </h4>
            </div>
            <p className=" ml-0 md:ml-auto font-bold lg:self-start lg:mt-4">
              {dollarPrice}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
