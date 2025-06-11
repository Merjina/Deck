/*searchbar*/
import React from "react";
import { FaSearch } from "react-icons/fa"; // Import FontAwesome search icon
import "../styles/SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-container">
      <FaSearch className="search-icon" /> {/* Search Icon Inside */}
      <input type="text" className="search-input" placeholder="Search..." />
    </div>
  );
};

export default SearchBar;
