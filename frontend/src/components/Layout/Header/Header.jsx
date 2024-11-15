import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../../../constant/navigation";
import logo from "../../../assets/brick-logo.png";
import { useAuth } from "../../../hooks/header/useAuth";
import { useSearch } from "../../../hooks/header/useSearch";

import DesktopNavbar from "./components/DesktopNavbar";
import HeaderIcons from "./components/HeaderIcons";
import MobileMenu from "./components/MobileMenu";
import SearchPanel from "./components/SearchPanel";

import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const { isSearchOpen, searchPanelRef, toggleSearch } = useSearch();

  return (
    <nav className="bg-brand-gradient sticky top-0 z-50 py-3 px-3">
      <div className="mx-4 relative text-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <NavLink to="/">
              <img
                className="h-16 w-auto scale-110 mr-3"
                src={logo}
                alt="logo"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation Links */}
          <DesktopNavbar navItems={navItems} />

          {/* Icons Section */}
          <HeaderIcons
            user={user}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            toggleSearch={toggleSearch}
          />
        </div>

        {/* Mobile Navigation Menu */}
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          navItems={navItems}
          user={user}
        />

        {/* Sliding Search Panel */}
        <SearchPanel
          isSearchOpen={isSearchOpen}
          searchPanelRef={searchPanelRef}
          toggleSearch={toggleSearch}
        />
      </div>
    </nav>
  );
};

export default Header;
