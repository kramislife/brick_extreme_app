import React from "react";
import { Button } from "../../components/ui/button";
import image1 from "../../assets/BannerImg/Banner-1.png";
import image2 from "../../assets/BannerImg/Banner-3.png";

const FeaturedProducts = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6 header-text">
        Featured Products
      </h2>
      <div className="flex items-center justify-center pb-10">
        <Button className="bg-darkBrand">View All</Button>
      </div>

      <img src={image1} alt="" className="w-full lg:h-[80vh] h-full mb-3" />
      <img src={image2} alt="" className="w-full lg:h-[80vh]" />
    </div>
  );
};

export default FeaturedProducts;
