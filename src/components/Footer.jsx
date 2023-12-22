const Footer = () => {
  const getYear = new Date().getFullYear();
  return (
    <>
      <div className="grid  place-items-center text-center mt-10 ">
        <h5>
          &copy; {getYear}. <span> Cozy Corner Store. </span>
          All Right Reserved. Made By Zechariah.
        </h5>
      </div>
    </>
  );
};

export default Footer;
