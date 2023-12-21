const About = () => {
  return (
    <>
      <div className=" flex items-center justify-center gap-x-2 md:gap-x-6 mt-12">
        <div className=" text-3xl lg:text-5xl leading-none -tracking-tight">
          We Love
        </div>
        <div className=" stats bg-primary shadow">
          <div className="stat stat-title text-primary-content tracking-widest font-bold text-4xl">
            {" "}
            Cozy Corner
          </div>
        </div>
      </div>
      <p className=" max-w-2xl mx-auto leading-8 mt-8 text-lg">
        At Cozy Corner, we believe in the transformative power of well-curated
        home essentials. Born out of a passion for quality living, we strive to
        bring you a collection that transcends functionality blending aesthetics
        with comfort seamlessly. Our mission is to enhance your daily life by
        offering carefully selected chairs, tables, lighting and other household
        items that embody both style and substance. Join us in creating space
        that reflect your unique personality and elevate your home experience.
        Welcome to a world where every details matters and your home tells your
        story.
      </p>
    </>
  );
};

export default About;
