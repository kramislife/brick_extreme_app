import React from "react";
import Metadata from "../../components/Layout/Metadata/Metadata";
import Banner from "../../components/Banner/Banner";
import BestSelling from "../../components/BestSelling/BestSelling.jsx";
// import InstagramFollowBanner from "../../components/Subscribe/Subscribe";
// import LegoFuture from "../../components/LegoFuture/LegoFuture";
// import FAQ from "../../components/FAQ/FAQ";
import LatestProducts from "../../components/LatestProducts/LatestProducts";
// import { useSelector } from "react-redux";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Categories from "@/components/Categories/Categories";
import Subscribe from "../../components/Subscribe/Subscribe";


const Home = () => {
  return (
    <>
      <Metadata title={"Home - Buy best products online"} />
      <div>
        <Banner />
        <div className="lg:min-h-[90vh] bg-brand-gradient">
          <BestSelling />
        </div>
        <div className="lg:min-h-[90vh] bg-brand-gradient-r">
          <LatestProducts />
        </div>
        <div className="lg:min-h-[90vh] bg-brand-gradient">
          <FeaturedProducts />
        </div>
        <div className="lg:min-h-[90vh] bg-brand-gradient-r">
          <Categories />
        </div>
        <div className="lg:min-h-[90vh] bg-brand-gradient">
          <Subscribe />
        </div>
        {/* <LegoFuture />
        <FAQ /> */}
      </div>
    </>
  );
};

export default Home;
