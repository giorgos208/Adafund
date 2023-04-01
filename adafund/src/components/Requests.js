import React, { useState } from 'react';
import BigBox from './BigBox.js';
import SearchBar from './SearchBar.js';
import './Requests.css';
const styles = {
  color: 'white',
};
const Requests = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="requests-container">
      <h1  style={styles}>Running Requests</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <p style={styles}>Requests update automatically.</p>
      <BigBox searchTerm={searchTerm} />
    </div>
  );
};

export default Requests;
