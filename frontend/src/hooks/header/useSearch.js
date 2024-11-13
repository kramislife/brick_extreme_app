import { useState, useRef, useEffect } from 'react';

export const useSearch = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchPanelRef = useRef(null);

  const toggleSearch = () => {
    setIsSearchOpen(prevState => !prevState);
  };

  useEffect(() => {
    // Handle clicks outside of the search panel to close it
    const handleClickOutside = (event) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    // Add event listener when the search panel is open
    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener when component unmounts or isSearchOpen changes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  return {
    isSearchOpen,
    searchPanelRef,
    toggleSearch
  };
};
