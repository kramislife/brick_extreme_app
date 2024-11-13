import React from "react";
import Slider from "react-slick"; // Import the Slider component from react-slick
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick-carousel theme CSS
import { bannerItems } from "../../constant/banner";

const Banner = () => {
  // Slider settings for React Slick
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {bannerItems.map((item, index) => (
          <div
            key={index}
            className="w-full h-[50vh] lg:h-[80vh] sm:h-[60vh] md:h-[70vh]"
          >
            <img
              src={item.image}
              alt={item.altText}
              className="w-full h-full object-cover" // Ensures the image covers the container and keeps aspect ratio
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
