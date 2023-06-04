import React from "react";

// add onChange event listener
function Search({ handleSearch, search }) {
  const handleSearchInput = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        onChange={handleSearchInput}
        value={search}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;



