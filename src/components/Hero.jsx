import { Link } from "react-router-dom";
import carousel1 from "../assets/hero1.webp";
import carousel2 from "../assets/hero2.webp";
import carousel3 from "../assets/hero3.webp";
import carousel4 from "../assets/hero4.webp";

const carouselImage = [carousel1, carousel2, carousel3, carousel4];

const Hero = () => {
  return (
    <div className=" grid lg:grid-cols-2 gap-16 items-center mt-16">
      <div>
        <h1 className=" capitalize text-4xl md:text-6xl font-bold tracking-tight max-w-2xl">
          We are changing the way people shop
        </h1>
        <p className=" max-w-lg text-lg mt-6 leading-6">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni qui
          nobis eum vitae sapiente voluptas praesentium voluptates suscipit,
          quas culpa?
        </p>
        <Link to="/products" className=" btn btn-primary p-2 mt-6 uppercase ">
          Our Products
        </Link>
      </div>
      <div className=" hidden h-[28rem] lg:carousel carousel-center bg-neutral p-4 space-x-4 rounded-box">
        {carouselImage.map((carousel, index) => {
          return (
            <div className="carousel-item" key={index}>
              <img
                src={carousel}
                className=" h-full w-80 object-cover rounded-box"
                alt="Carousel Image"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
