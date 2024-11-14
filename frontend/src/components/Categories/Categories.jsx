import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import image1 from "../../assets/droid1.jpg";
import image2 from "../../assets/droid2.png";

const categories = [
  {
    id: 1,
    title: "Lifestyle and Dino Eggs",
    image: image1,
  },
  {
    id: 2,
    title: "Pocket Monsters",
    image: image2,
  },
  {
    id: 3,
    title: "Lifestyle and Dino Eggs",
    image: image1,
  },
  {
    id: 4,
    title: "Lifestyle and Dino Eggs",
    image: image2,
  },
  {
    id: 5,
    title: "Pocket Monsters",
    image: image1,
  },
  {
    id: 6,
    title: "Lifestyle and Dino Eggs",
    image: image1,
  },
];

const Categories = () => {
  return (
    <div className="p-4">
      <h2 className="text-3xl text-gray-300 font-extrabold mb-4 text-center pt-6 header-text">
        Browse by Categories
      </h2>
      <div className="flex items-center justify-center pb-10">
        <Button className="bg-brand text-white">View All</Button>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 mb-8">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="overflow-hidden bg-[#1A2333] border-none rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative h-48 sm:h-64">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title */}
            <CardFooter className="p-4 bg-gradient-to-t from-black/60">
              <h3 className="text-lg font-semibold text-gray-200 text-center w-full">
                {category.title}
              </h3>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Categories;
