// SearchBar.js
import React from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => { //  onSearch function to perform actions such as filtering a list of items based on the search query provided by the user . onSearch is not an in-built function; it's a custom callback function that you define and pass as a prop from parent component Books2.js file  to the SearchBar component.
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

