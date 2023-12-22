import { useDispatch } from "react-redux";
import { formatPrice, generateAmountOption } from "../utils";
import { editItem, removeItem } from "../features/cartSlice";

const CartItem = ({ item }) => {
  const { cartId, image, title, amount, price } = item;
  const dispatch = useDispatch();

  // Cut the title to 10 characters and add ellipsis
  const truncatedTitle =
    title.length > 10 ? title.substring(0, 10) + "..." : title;

  const handleRemoveCartItem = () => {
    dispatch(removeItem({ cartId }));
  }; // dispatch the func that removes items from the cart

  const handleCartAmountEdit = (e) => {
    dispatch(editItem({ cartId, amount: e.target.value }));
  }; // dispatch the func that edit the item amount from the cart

  return (
    <>
      <article
        key={cartId}
        className=" mb-9 flex flex-col gap-y-4 md:flex-row flex-wrap  border-b border-base-300 py-3 pb-5 last:border-b-0 "
      >
        {/* Image */}
        <div className=" grid grid-cols-2 md:hidden">
          <img
            src={image}
            alt={title}
            className=" w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
          />
          <div className="">
            <h3 className="  capitalize font-medium">{item.title}</h3>
            <h4 className=" mt-2 text-sm text-neutral-content capitalize">
              {item.company}
            </h4>
            <p className=" mt-4 flex items-center text-sm capitalize gap-x-2">
              Color:
              <span
                className="badge badge-sm "
                style={{ background: item.productColor }}
              ></span>
            </p>
          </div>
        </div>
        {/* Desktop */}
        <img
          src={image}
          alt={title}
          className=" hidden md:block w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
        />
        {/* Info */}
        <div className=" hidden md:block  md:ml-16">
          <h3 className="  capitalize font-medium">{truncatedTitle}</h3>
          <h4 className=" mt-2 text-sm text-neutral-content capitalize">
            {item.company}
          </h4>
          <p className=" mt-4 flex items-center text-sm capitalize gap-x-2">
            Color:
            <span
              className="badge badge-sm "
              style={{ background: item.productColor }}
            ></span>
          </p>
        </div>
        {/* Amount & Remove */}
        <div className=" flex items-center justify-around mt-2 lg:hidden md:ml-28 md:-mt-2 ">
          <div className=" form-control max-w-sm">
            <label htmlFor="amount" className="label">
              <span className=" label-text">Amount</span>
            </label>
            <select
              name="amount"
              id="amount"
              className=" mt-2 select select-bordered select-md select-base"
              value={amount}
              onChange={handleCartAmountEdit}
            >
              {generateAmountOption(amount + 5)}
            </select>
          </div>
          <button
            type="button"
            className=" mt-2 link link-primary link-hover text-sm"
            onClick={handleRemoveCartItem}
          >
            Remove
          </button>
        </div>
        {/* Desktop */}
        <div className=" md:ml-28 md:-mt-2 hidden lg:block ">
          <div className=" form-control max-w-xs">
            <label htmlFor="amount" className="label">
              <span className=" label-text">Amount</span>
            </label>
            <select
              name="amount"
              id="amount"
              className=" mt-2 select select-bordered select-sm select-base"
              value={amount}
              onChange={handleCartAmountEdit}
            >
              {generateAmountOption(amount + 5)}
            </select>
          </div>
          <button
            type="button"
            className=" mt-2 link link-primary link-hover text-sm"
            onClick={handleRemoveCartItem}
          >
            Remove
          </button>
        </div>
        <p className=" font-semibold lg:font-medium text-center  lg:text-right md:ml-auto">
          {formatPrice(price)}
        </p>
      </article>
    </>
  );
};

export default CartItem;
