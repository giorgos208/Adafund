import React, { useState } from 'react';
import BigBox from './BigBox';
import SearchBar from './SearchBar';
import './Requests.css';

const Requests = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="requests-container">
      <h1>Running Requests</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <p>Requests update every minute.</p>
      <BigBox searchTerm={searchTerm} />
    </div>
  );
};

export default Requests;
