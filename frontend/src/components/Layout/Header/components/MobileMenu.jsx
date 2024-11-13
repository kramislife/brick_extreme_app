import React from "react";
import { NavLink } from "react-router-dom";

const MobileMenu = ({ isMenuOpen, setIsMenuOpen, navItems, user }) =>
  isMenuOpen && (
    <div className="lg:hidden absolute top-full left-0 right-0 bg-brand border-t border-primary/20 rounded-md">
      <ul className="flex flex-col py-4">
        {navItems.map((item) => (
          <li key={item.id} className="px-4 py-2">
            <NavLink
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-8 text-light"
                  : "text-light hover:text-gray-300"
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
        <li className="px-4 py-2">
          {user ? (
            <NavLink
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="text-light hover:text-gray-300"
            >
              Profile
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-light hover:text-gray-300"
            >
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  );

export default MobileMenu;
