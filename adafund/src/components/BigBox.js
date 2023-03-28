import React, { useState } from "react";

import smallBoxesData from './smallBoxesData.json';

export const SmallBox = ({
    name,
    description,
    onClick,
    backgroundColor,
    twitterLink,
    timeLeft,
    totalTime
  }) => {
    const progressPercentage = (timeLeft / totalTime) * 100;

    return (
      <div className="small-box" style={{ backgroundColor }}>
        <h3>{name}</h3>
        <p>{description}</p>
        <a
          href={twitterLink}
          target="_blank"
          rel="noopener noreferrer"
          className="twitter-icon"
        >
          {/* Add your Twitter icon here */}
        </a>
        <div className="button-container">
          <button className="donate-button">Donate</button>
          <button className="details-button" onClick={onClick}>
            Details
          </button>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    );
  };
  

const BigBox = ({ searchTerm }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ name: "", description: "" });

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      const index = Math.floor(Math.random() * (i % 2 === 0 ? 8 : 16));
      color += letters[index];
    }
    return color;
  };

  const handleClick = (name, description) => {
    setShowPopup(true);
    setPopupContent({ name, description });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredBoxes = smallBoxesData
  .filter((box) => box.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => b.timeLeft - a.timeLeft); // Sort based on timeLeft

  return (
    <div className="big-box">
      {filteredBoxes.map((box) => (
        <SmallBox
          key={box.name}
          name={box.name}
          description={box.description}
          onClick={() => handleClick(box.name, box.description)}
          backgroundColor={getRandomColor()}
          twitterLink={box.twitterLink}
          timeLeft={box.timeLeft}
          totalTime={box.totalTime}
        />
      ))}
      {showPopup && (
        <div className="popup">
          <h3>{popupContent.name}</h3>
          <p>{popupContent.description}</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default BigBox;
