import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./SearchBar.css";

// A simple search bar for the main page, using only what's needed for the assessment
const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <form className="ct-searchbar" onSubmit={e => { e.preventDefault(); onSearch(); }}>
      <Input
        placeholder="Search..."
        value={value}
        onChange={onChange}
        className="ct-searchbar__input"
      />
      <Button type="submit" variant="primary" className="ct-searchbar__button">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
