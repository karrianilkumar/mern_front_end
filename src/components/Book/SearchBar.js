// SearchBar.js
import React from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for books..."
        onChange={handleChange}
        className="search-bar"
      />
    </div>
  );
};

export default SearchBar;

