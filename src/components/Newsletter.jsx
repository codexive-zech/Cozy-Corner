const Newsletter = () => {
  return (
    <>
      <div className=" relative my-12">
        <div className=" grid lg:grid-cols-2 items-center justify-center gap-4">
          <div>
            <h3 className=" text-2xl lg:text-3xl capitalize font-bold text-center lg:text-left">
              Join our Newsletter and get 20% off
            </h3>
            <p className=" text-lg my-4">
              Redefine your living space, shop now for quality and craftsmanship
              that speaks volumes. Dive into a world of comfort and style.
              Subscribe for Exclusive Offers.
            </p>
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered input-secondary w-full max-w-md"
            />
            <button
              className="btn btn-primary btn-block mt-2 max-w-md"
              type=" button"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
