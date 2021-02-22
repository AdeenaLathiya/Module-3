import React from "react";

const SearchBox = ({ searchField, searchChange }) => {
  return (
    <div>
      <input
        // classname="pa3 ba b--green bg-lightest-blue"
        type="search"
        placeholder="Search Twitter"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
