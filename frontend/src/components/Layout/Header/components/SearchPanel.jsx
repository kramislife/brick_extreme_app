import React from "react";
import { X } from "lucide-react";
import SearchComponent from "../../Search/Search";

const SearchPanel = ({ isSearchOpen, searchPanelRef, toggleSearch }) => (
  <div
    ref={searchPanelRef}
    className={`search-panel fixed top-0 right-0 h-full w-full md:w-[30%] bg-[rgba(41,38,38,0.89)] p-4 transform ${
      isSearchOpen ? 'translate-x-0' : 'translate-x-full'
    } transition-transform duration-300 ease-in-out z-50`}
  >
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-white text-2xl">Search</h2>
      <button className="text-white" onClick={toggleSearch}>
        <X size={24} aria-label="Close Search" />
      </button>
    </div>
    <SearchComponent />
  </div>
);

export default SearchPanel;
