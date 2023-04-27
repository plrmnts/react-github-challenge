import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onSort }) => {
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState('');

  const handleInput = (e) => {
    const input = e.target.value;
    const isValid = /^[a-zA-Z0-9-]*$/.test(input) && input.length <= 39;

    if (isValid) {
      setError('');
      setSearchInput(input);
    } else {
      setError('Please enter alphanumeric characters and hyphens only, and limit to 39 characters.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
      <div className="search-container">
        <input
          className='search-input'
          type="text"
          placeholder="Search GitHub username..."
          value={searchInput}
          onChange={handleInput}
        />
        <button className='search-button' type="submit">Search</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SearchBar;
