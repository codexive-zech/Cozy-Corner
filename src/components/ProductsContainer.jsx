import { useLoaderData } from "react-router-dom";
import ProductGrid from "./ProductGrid";
import ProductList from "./ProductList";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useState } from "react";

const getProductsLayout = () => {
  const comfyLayout = localStorage.getItem("layout");
  const newLayout = comfyLayout ? comfyLayout : "grid";
  return newLayout;
}; // getting the product layout from the local storage

const ProductsContainer = () => {
  const { metaInfo } = useLoaderData();
  const totalProducts = metaInfo.pagination.total;
  const [productLayout, setProductLayout] = useState(getProductsLayout()); // initializing the layout from the local storage as the value

  const setActiveStyles = (pattern) => {
    return `btn btn-circle btn-md text-lg ${
      productLayout === pattern
        ? " btn-primary text-primary-content"
        : " btn-ghost text-based-content"
    }`;
  };
  return (
    <>
      <div className=" flex items-center justify-between gap-x-4 mt-4 border-b border-base-300 pb-5 ">
        <h2 className=" font-semibold pl-4 md:pl-0">
          {totalProducts} Product{totalProducts > 1 && "s"}
        </h2>
        <div className=" flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              localStorage.setItem("layout", "grid"); // set a layout value to the local storage
              setProductLayout("grid"); // update the product layout state
            }}
            className={setActiveStyles("grid")}
          >
            <BsFillGridFill />
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem("layout", "list"); // set a layout value to the local storage
              setProductLayout("list"); // update the product layout state
            }}
            className={setActiveStyles("list")}
          >
            <BsList />
          </button>
        </div>
      </div>
      {totalProducts === 0 ? (
        <div className=" flex items-center justify-center h-[20vh] lg:h-[30vh]">
          <h3 className=" font-bold capitalize text-xl md:text-2xl">
            Sorry, No Product Was Found...
          </h3>
        </div>
      ) : productLayout === "grid" ? (
        <ProductGrid />
      ) : (
        <ProductList />
      )}
    </>
  );
};

export default ProductsContainer;
