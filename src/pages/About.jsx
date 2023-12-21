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
            Cozy
          </div>
        </div>
      </div>
      <p className=" max-w-2xl mx-auto leading-8 mt-8 text-lg">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod labore
        saepe vitae exercitationem blanditiis minus iusto fuga repudiandae sequi
        odio, delectus provident velit officiis modi numquam ipsam nihil cum aut
        nulla. Soluta cum recusandae ut placeat, veritatis officia nisi facere
        tempora reiciendis autem culpa quaerat est assumenda magni sed in.
      </p>
    </>
  );
};

export default About;
