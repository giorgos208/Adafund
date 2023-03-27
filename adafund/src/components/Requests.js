import React from 'react';
import BigBox from './BigBox'; // Adjust the path according to your file structure
import './Requests.css'; // Import the CSS file for styling

const Requests = () => {
  return (
    <div className="requests-container">
      <h1>Running Requests</h1>
      <p>Requests update every minute.</p>
      <BigBox />
    </div>
  );
};

export default Requests;
