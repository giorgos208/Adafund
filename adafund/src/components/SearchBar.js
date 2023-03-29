import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
      <input
        type="text"
        placeholder="Search by Request ID..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        style={{
            padding: '10px',
            borderRadius: '20px',
            border: 'none',
            boxShadow: '0px 0px 3px 0px rgba(0, 0, 0, 0.3)',
            fontSize: '16px',
            width: '300px',
            backgroundColor: 'white',
            color: '#555',
            outline: 'none',
            transition: 'box-shadow 0.3s',
          }}
      />
    );
  };
  

export default SearchBar;
