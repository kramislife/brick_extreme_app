import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import { Button } from "../../../components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-darkBrand text-light">
      <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-16 pt-16">
        {/* Mobile-first layout: These will appear first on mobile in 2 columns */}
        
        {/* Column: Account */}
        <div className="col-span-1 lg:col-span-2 lg:order-2 space-y-6">
          <h3 className="text-xl font-bold tracking-wide text-gray-200">
            Account
          </h3>
          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-red-500 cursor-pointer transition-colors duration-200 flex items-center">
              <span className="hover:translate-x-2 transition-transform duration-200">
                My Account
              </span>
            </li>
            <li className="hover:text-red-500 cursor-pointer transition-colors duration-200 flex items-center">
              <span className="hover:translate-x-2 transition-transform duration-200">
                Login / Register
              </span>
            </li>
            <li className="hover:text-red-500 cursor-pointer transition-colors duration-200 flex items-center">
              <span className="hover:translate-x-2 transition-transform duration-200">
                Cart
              </span>
            </li>
            <li className="hover:text-red-500 cursor-pointer transition-colors duration-200 flex items-center">
              <span className="hover:translate-x-2 transition-transform duration-200">
                Wishlist
              </span>
            </li>
          </ul>
        </div>

        {/* Column: Quick Link */}
        <div className="col-span-1 lg:col-span-3 lg:order-3 space-y-6">
          <h3 className="text-xl font-bold tracking-wide text-gray-200">
            Quick Link
          </h3>
          <ul className="space-y-4 text-gray-400">
            <li className="hover:text-red-500 cursor-pointer transition-colors duration-200 flex items-center">
              <span className="hover:translate-x-2 transition-transform duration-200">
                Privacy Policy
              </span>
            </li>
            <li className="hover:text-red-500 cursor-pointer transition-colors duration-200 flex items-center">
              <span className="hover:translate-x-2 transition-transform duration-200">
                Terms Of Use
              </span>
            </li>
            <li className="hover:text-red-500 cursor-pointer transition-colors duration-200 flex items-center">
              <span className="hover:translate-x-2 transition-transform duration-200">
                FAQ
              </span>
            </li>
            <li className="hover:text-red-500 cursor-pointer transition-colors duration-200 flex items-center">
              <span className="hover:translate-x-2 transition-transform duration-200">
                Contact
              </span>
            </li>
          </ul>
        </div>

        {/* Column: Support */}
        <div className="col-span-1 lg:col-span-3 lg:order-4 space-y-6">
          <h3 className="text-xl font-bold tracking-wide text-gray-200">
            Support
          </h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-center space-x-3">
              <span>111 Sample Address</span>
            </li>
            <li className="flex items-center space-x-3">
              <span>@123 Street.</span>
            </li>
            <li className="flex items-center space-x-3 hover:text-red-500 cursor-pointer transition-colors">
              <span>sample@gmail.com</span>
            </li>
            <li className="flex items-center space-x-3 hover:text-red-500 cursor-pointer transition-colors">
              <span>+11111-222222-3333</span>
            </li>
          </ul>
        </div>

        {/* Column: Bricks Extreme - Will appear at bottom on mobile */}
        <div className="col-span-2 lg:col-span-4 lg:order-1 space-y-6 text-center lg:text-left">
          <h3 className="text-xl font-bold tracking-wide text-gray-200">
            Bricks Extreme
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mx-auto lg:mx-0 max-w-md">
            Join Brick Extreme to get updates on new releases, exclusive promotions, 
            and be the first to know about our latest collections.
          </p>
          <div className="relative max-w-md mx-auto lg:mx-0">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800/50 border-gray-700 text-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-red-500 focus:border-transparent pr-24"
            />
            <Button className="absolute right-0 top-0 h-full bg-red-600 hover:bg-red-700 text-white transition-colors rounded-l-none">
              Subscribe
            </Button>
          </div>
          <div className="flex space-x-6 pt-4 justify-center lg:justify-start">
            <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-500 transition-colors cursor-pointer" />
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Separator */}
      <Separator className="bg-gray-800 mt-8 max-w-[1440px] mx-auto" />

      {/* Bottom Section */}
      <div className="text-center text-sm px-6 py-6 text-gray-500">
        <p className="hover:text-gray-400 transition-colors">
          © Copyright Brick Extreme 2024. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;