import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();
  return (
    <>
      <div className="h-[80vh] grid place-items-center">
        <h1 className=" text-4xl font-bold text-center mt-12 capitalize">
          There was an Error...
        </h1>
      </div>
    </>
  );
};

export default ErrorElement;
