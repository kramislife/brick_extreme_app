import React from "react";
import { NavLink } from "react-router-dom";

const HeaderNavLinks = ({ navItems }) => (
  <ul className="hidden lg:flex items-center ml-14 space-x-14">
    {navItems.map((item) => (
      <li key={item.id} className="text-md tracking-wider">
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "text-red-500 font-medium underline underline-offset-8"
              : "text-light hover:text-gray-300 transition-colors duration-200"
          }
        >
          {item.label}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default HeaderNavLinks;
