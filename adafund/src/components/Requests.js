import React, { useState } from 'react';
import BigBox from './BigBox.js';
import SearchBar from './SearchBar.js';
import './Requests.css';

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="requests-container">
      <h1>Running Requests</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <p>Requests update automatically.</p>
      <BigBox searchTerm={searchTerm} />
    </div>
  );
};

export default Requests;
