import { Link, useLoaderData } from "react-router-dom";
import { customFetch, formatPrice, generateAmountOption } from "../utils/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";

const singleProductQuery = (productId) => {
  return {
    queryKey: ["singleProduct", productId],
    queryFn: () => customFetch(`/products/${productId}`),
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.productId)
    );
    const product = response.data.data;
    return { product };
  }; // loader fetching single product

const SingleProduct = () => {
  const { product } = useLoaderData();

  const { image, title, price, company, colors, description } =
    product.attributes;
  const dollarAmount = formatPrice(price);
  const [productColor, setProductColor] = useState(colors[0]); // getting the each single color from the colors
  const [amount, setAmount] = useState(1); // quantity number amount
  const dispatch = useDispatch();

  const handleAmountInput = (e) => {
    return setAmount(parseInt(e.target.value)); // parse the value to integer
  };

  const cartProduct = {
    cartId: product.id + productColor,
    productId: product.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
  };

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      {/* Product Breadcrumb */}
      <div className="breadcrumbs mt-9 lg:mt-16 text-lg">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      {/* Product */}
      <div className=" grid items-start justify-center gap-y-6 lg:grid-cols-2 lg:gap-x-12 mt-5 lg:mt-7">
        {/* Image */}
        <div className="flex items-center">
          <img
            src={image}
            alt={title}
            className=" h-96 w-full object-cover rounded-box"
          />
        </div>
        {/* Product Info */}
        <div>
          <h1 className=" font-bold text-3xl capitalize">{title}</h1>
          <h4 className=" mt-5 text-xl font-bold text-neutral-content">
            {company}
          </h4>
          <h4 className=" font-semibold text-xl mt-5">{dollarAmount}</h4>
          <p className=" mt-5 leading-8">{description}</p>
          {/* Colors */}
          <div className=" mt-8">
            <h3 className=" font-bold text-xl capitalize tracking-wider">
              Colors
            </h3>
            <div className=" flex gap-3 mt-1">
              {colors.map((color, index) => {
                return (
                  <button
                    className={`badge w-6 h-6 ${
                      color === productColor
                        ? " border-2 border-secondary"
                        : null
                    }`}
                    key={index}
                    style={{ background: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>
          {/* Amount */}
          <form className=" mt-5">
            <label htmlFor="amount" className=" label ">
              <span className="label-text font-bold text-xl capitalize tracking-wider">
                Amount
              </span>
            </label>
            <select
              className="select select-secondary w-full max-w-xs"
              id="amount"
              value={amount}
              onChange={handleAmountInput}
            >
              {generateAmountOption(9)}
            </select>
          </form>
          <button
            type="button"
            className=" btn btn-secondary tracking-wide mt-7 lg:mt-10 mb-5"
            onClick={addToCart}
          >
            Add To Bag
          </button>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
