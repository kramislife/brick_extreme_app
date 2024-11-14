import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-darkBrand text-light py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 hidden">
        {/* Column 1: Bricks Extreme */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Bricks Extreme</h3>
          <p className="text-sm mb-4 leading-relaxed">
            Join Brick Extreme to get updates on new releases, promotions, and
            more...
          </p>
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-gray-900 text-gray-300 mb-4"
          />
          <div className="flex space-x-4">
            <Facebook className="hover:text-blue-600 transition cursor-pointer" />
            <Twitter className="hover:text-blue-400 transition cursor-pointer" />
            <Instagram className="hover:text-pink-500 transition cursor-pointer" />
            <Linkedin className="hover:text-blue-700 transition cursor-pointer" />
          </div>
        </div>

        {/* Column 2: Account */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Account</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-gray-300 cursor-pointer transition">
              My Account
            </li>
            <li className="hover:text-gray-300 cursor-pointer transition">
              Login / Register
            </li>
            <li className="hover:text-gray-300 cursor-pointer transition">
              Cart
            </li>
            <li className="hover:text-gray-300 cursor-pointer transition">
              Wishlist
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Link */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Quick Link</h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-gray-300 cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-gray-300 cursor-pointer transition">
              Terms Of Use
            </li>
            <li className="hover:text-gray-300 cursor-pointer transition">
              FAQ
            </li>
            <li className="hover:text-gray-300 cursor-pointer transition">
              Contact
            </li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div>
          <h3 className="text-lg font-semibold mb-6">Support</h3>
          <ul className="space-y-3 text-sm">
            <li>111 Sample Address</li>
            <li>@123 Street.</li>
            <li>sample@gmail.com</li>
            <li>+11111-222222-3333</li>
          </ul>
        </div>
      </div>

      {/* Separator */}
      <Separator className="bg-gray-700 my-8" />

      {/* Bottom Section */}
      <div className="text-center text-sm px-6 py-2 text-gray-500">
        <p>© Copyright Brick Extreme 2024. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
