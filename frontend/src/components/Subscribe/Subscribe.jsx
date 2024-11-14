import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Truck, Headphones, ShieldCheck } from "lucide-react";

const Subscribe = () => {
  return (
    <div className="w-full py-16">
      {/* Subscribe Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-lg bg-[#1A2333] p-8 md:p-12">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('/path-to-your-lightsaber-image.jpg')`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            <h2 className="text-4xl text-gray-200 font-bold mb-4">
              Subscribe and Save
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Unlock exclusive deals and never miss out! Subscribe now and save
              on your next LEGO adventure. Get the latest updates, special
              offers, and more—straight to your inbox!
            </p>

            {/* Subscribe Form */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800/60 border-gray-700 text-gray-200 placeholder:text-gray-400"
              />
              <Button className="bg-red-600 hover:bg-red-700 text-white whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Free Delivery */}
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-200 text-xl font-bold mb-2">
              FREE AND FAST DELIVERY
            </h3>
            <p className="text-gray-400">
              Free delivery for all orders over $140
            </p>
          </div>

          {/* Customer Service */}
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-200 text-xl font-bold mb-2">
              24/7 CUSTOMER SERVICE
            </h3>
            <p className="text-gray-400">Friendly 24/7 customer support</p>
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-gray-200 text-xl font-bold mb-2">
              MONEY BACK GUARANTEE
            </h3>
            <p className="text-gray-400">We return money within 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
