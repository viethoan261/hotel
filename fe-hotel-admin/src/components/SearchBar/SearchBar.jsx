import React from "react";
import { useState } from "react";
import Input from "antd/es/input/Input";
import { Button } from "antd";

function SearchBar({ searchValue, setSearchValue, onSearch }) {
  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Search by client name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
}

export default SearchBar;
