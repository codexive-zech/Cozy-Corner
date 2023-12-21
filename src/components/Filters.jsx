import { Form, Link, useLoaderData } from "react-router-dom";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const { metaInfo, params } = useLoaderData();
  const { search, category, company, order, price, shipping } = params;
  return (
    <>
      <Form className=" bg-base-200 px-8 py-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 shadow-sm rounded-md items-center">
        {/* Search Input */}
        <FormInput
          label="Search Product"
          name="search"
          size="input-sm"
          type="search"
          defaultValue={search}
        />
        {/* Categories Select Input */}
        <FormSelect
          label="select category"
          name="category"
          defaultValue={category}
          selectList={metaInfo.categories}
          size="select-sm"
        />
        {/* Companies Select Input */}
        <FormSelect
          label="select company"
          name="company"
          defaultValue={company}
          selectList={metaInfo.companies}
          size="select-sm"
        />
        {/* Order Select Input */}
        <FormSelect
          label="order by"
          name="order"
          defaultValue={order}
          selectList={["a-z", "z-a", "high", "low"]}
          size="select-sm"
        />

        {/* Price Range */}
        <FormRange
          name="price"
          label="select price"
          size="range-sm"
          price={price}
        />
        {/* Free Shipping Check*/}
        <FormCheckbox
          name="shipping"
          label="free shipping"
          size="checkbox-sm"
          defaultValue={shipping}
        />
        <button type="submit" className=" btn btn-primary btn-sm rounded-md">
          Search
        </button>
        <Link to="/products" className=" btn btn-accent btn-sm rounded-md">
          Reset
        </Link>
      </Form>
    </>
  );
};

export default Filters;
