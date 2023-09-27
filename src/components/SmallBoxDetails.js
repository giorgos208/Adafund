import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BigBox from './BigBox.js';
import smallBoxesData from './smallBoxesData.json';
import SmallBox from './BigBox.js';

export const SmallBoxDetailsv2 = (props) => {
  const { id } = props;
  const [searchTerm, setSearchTerm] = useState(id);


  return (
   
      <BigBox  smallBoxesData={smallBoxesData} searchTerm={id} />
    
  );
};



const SmallBoxDetails = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState(id);
  console.log("eee",id)
  //const smallBox = smallBoxesData.find(box => box.id === props.id);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  };

  return (
    <div style={containerStyle}>
      <BigBox smallBoxesData={smallBoxesData} searchTerm={searchTerm} />
    </div>
  );
};

export default SmallBoxDetails;



