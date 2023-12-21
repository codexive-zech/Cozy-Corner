import { useState } from "react";
import { formatPrice } from "../utils";

const FormRange = ({ label, name, size, price }) => {
  const step = 1000; // $10 * 10cent
  const maxPrice = 100000; // max price
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice); // handling the state of the price range value input
  return (
    <>
      <div className=" form-control w-full max-w-xs">
        <label htmlFor={name} className="label">
          <span className=" label-text capitalize">{label}</span>
          <span className=" font-normal text-md">
            {formatPrice(selectedPrice)}
          </span>
        </label>
        <input
          type="range"
          min={0}
          max={maxPrice}
          value={selectedPrice}
          className={`range range-primary cursor-pointer ${size} `}
          onChange={(e) => setSelectedPrice(e.target.value)} // changing the value of the price range value input
          step={step}
          name="price"
        />
        <div className=" w-full flex justify-between items-center lg:gap-x-4 px-2 mt-3">
          <span className=" font-bold text-md">0</span>
          <span className=" font-normal lg:font-bold text-md">
            Max : {formatPrice(maxPrice)}
          </span>
        </div>
      </div>
    </>
  );
};

export default FormRange;
