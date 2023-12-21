import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error.status === 404) {
    return (
      <>
        <main className=" grid place-items-center min-h-screen px-5">
          <div className=" text-center">
            <p className="  text-9xl font-semibold text-primary">404</p>
            <h1 className=" mt-4 text-5xl sm:text-3xl tracking-tight font-bold capitalize">
              Page Not Found
            </h1>
            <p className=" mt-7 text-lg leading-7 capitalize">
              Sorry, We could not find the page you are looking for.
            </p>
            <div className=" mt-9">
              <Link to="/" className=" btn btn-secondary ">
                Go Back Home
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }
  return (
    <main className=" grid place-items-center min-h-screen px-5">
      <div className=" text-center ">
        <h1 className=" text-4xl capitalize">There was an Error...</h1>
      </div>
    </main>
  );
};

export default Error;
