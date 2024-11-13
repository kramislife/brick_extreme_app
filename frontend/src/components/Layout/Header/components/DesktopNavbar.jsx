import React from "react";
import { NavLink } from "react-router-dom";

const HeaderNavLinks = ({ navItems }) => (
  <ul className="hidden lg:flex items-center ml-14 space-x-14">
    {navItems.map((item) => (
      <li key={item.id} className="text-md ml-3 tracking-widest">
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            isActive
              ? "underline underline-offset-8 text-light hover:text-gray-300"
              : "text-light hover:text-gray-300"
          }
        >
          {item.label}
        </NavLink>
      </li>
    ))}
  </ul>
);

export default HeaderNavLinks;
