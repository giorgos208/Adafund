import React, { useState } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { Lucid, Blockfrost } from "https://unpkg.com/lucid-cardano@0.9.8/web/mod.js"
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTwitter } from '@fortawesome/free-brands-svg-icons';
import smallBoxesData from './smallBoxesData.json';
import './donationFormStyles.css';
import NamiIcon from './nami.svg';
import EternlIcon from './eternl.png';

const SocialLink = styled.a`
  color: #1da1f2;
  font-size: 24px;
  transition: color 0.2s;

  &:hover {
    color: #0d84d9;
  }
`;

export const Dropdown = ({ donationAmount, address }) => {
  const handleNamiClick = async () => {
   
    
     const number = parseFloat(donationAmount);

    if (isNaN(number)) {
      alert("Invalid input. Please enter a number.");
    } else {
    
      const lucid = await Lucid.new(
        new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0", "mainnetAXWgU2phwchiCXQmCsNEwBlHT9jM3hFP"),
        "Mainnet",
      );
      
      // Assumes you are in a browser environment
      const api = await window.cardano.nami.enable();
      lucid.selectWallet(api);
      
      const tx = await lucid.newTx()
        .payToAddress(address, { lovelace: 5000000n })
        .complete();
      
      const signedTx = await tx.sign().complete();
      
      const txHash = await signedTx.submit();
      
      console.log(txHash);
    
    }
   
  };

  const handleEternlClick = async () => {
  
    

      
    const number = parseFloat(donationAmount);

    if (isNaN(number)) {
      alert("Invalid input. Please enter a number.");
    } else {
     
      const lucid = await Lucid.new(
        new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0", "mainnetAXWgU2phwchiCXQmCsNEwBlHT9jM3hFP"),
        "Mainnet",
      );
      
      // Assumes you are in a browser environment
      const api = await window.cardano.eternl.enable();
      lucid.selectWallet(api);
      
      const tx = await lucid.newTx()
        .payToAddress(address, { lovelace: 5000000n })
        .complete();
      
      const signedTx = await tx.sign().complete();
      
      const txHash = await signedTx.submit();
      
      console.log(txHash);
    
    }

  };

  return (
    <div className="dropdown">
      <button className="dropbtn">Donate</button>
      <div className="dropdown-content">
        <a onClick={handleNamiClick}>
        Nami
          <img src={NamiIcon} alt="Nami Icon" style={{ width: '23px', marginLeft: '12px' }} />
       
        </a>
        <a onClick={handleEternlClick}>
        Eternl
          <img src={EternlIcon} alt="Eternl Icon" style={{ width: '29px', marginLeft: '12px' }} />
          
        </a>
      </div>
    </div>
  );
};

export const SmallBox = ({
  id,
  reason,
  short_description,
  long_description,
  total_ada,
  onClick,
  backgroundColor,
  twitterLink,
  timeLeft,
  totalTime,
  finish_date,
  address
}) => {
  const progressPercentage = (35 / 50) * 100;
  const now = new Date();
  const date = new Date(Date.parse(finish_date));
  const remainingTimeMs = date.getTime() - now.getTime();
  const remainingDays = Math.floor(remainingTimeMs / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor((remainingTimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const ada_remaining = parseInt(total_ada)*(100-progressPercentage)/100
  const [donationAmount, setDonationAmount] = useState("");
  const placeholder_text = "Enter ADA amount (max: " + ada_remaining.toString() +")"
  
  const handleDonationChange = (e) => {
    setDonationAmount(e.target.value);
  };

 
  return (
    <div className="small-box" style={{ backgroundColor }}>
      <h4 id="time_left">{remainingDays}d, {remainingHours}h left</h4>
      <h4 id="id">{id}</h4>
   
           <Link 
  to={{
    pathname: `/requests/${id}`,
    state: { id: id },
  }}
  className="simple-link"
>
  Open 🔗
</Link>
      <h3>{reason}</h3>
      <p>{short_description}</p>
      <a href={twitterLink} target="_blank" rel="noopener noreferrer" className="twitter-icon">
        {/* Add your Twitter icon here */}
      </a>
      
      <h3>{parseFloat(total_ada).toLocaleString()} ₳</h3>



     
      <div className="button-container">
      <Dropdown donationAmount={donationAmount} address={address} />
        <button id="details-button" onClick={onClick}>Details</button>
       

      </div>
      <Form.Group controlId="formBasicEmail" className="donation-form-group">
        <Form.Control type="text" placeholder={placeholder_text} value={donationAmount} onChange={handleDonationChange} />
      </Form.Group><br></br>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercentage}%` }}>
          <span className="progress-bar-text">{progressPercentage.toFixed(1)}% filled</span>
        </div>
      </div>
      
    </div>
  );
};

const BigBox = ({ searchTerm }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ id:"",
      reason:"",
      short_description:"",
      long_description:"",
      total_ada:"",
      twitterLink:"",
      timeLeft:"",
      start_date:"",
      finish_date:"",
      address:""});


  const handleClick = ( id,
    reason,
    short_description,
    long_description,
    total_ada,

    twitterLink,
    start_date,
    finish_date,
    address) => {
    setShowPopup(true);
    setPopupContent({
      id,
      reason,
      short_description,
      long_description,
      total_ada,
      twitterLink,
      start_date,
      finish_date,
      address
    });
    
  };

  const closePopup = () => {
    setShowPopup(false);
  };
 
  const filteredBoxes = smallBoxesData
  .filter((box) => box.id && box.id.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
    const dateA = new Date(Date.parse(a.finish_date));
    const dateB = new Date(Date.parse(b.finish_date));
    return dateA - dateB;
  });


  return (
    <div className="big-box">
      {filteredBoxes.map((box) => (
        <SmallBox
          finish_date = {box.finish_date}
          id={box.id}
          reason={box.reason}
          short_description={box.short_description}
          long_description={box.long_description}
          total_ada={box.total_ada}
          onClick={() => handleClick(box.id,box.reason, box.short_description, box.long_description,box.total_ada,box.twitter_handle,box.start_date,box.finish_date,box.address)}
          backgroundColor={box.backgroundColor}
          twitterLink={box.twitter_handle}
          timeLeft={box.timeLeft}
          totalTime={box.totalTime}
          address={box.address}
        />
      ))}
      {showPopup && (
        <div className="popup">
           <div className="popup-content">
          <h3 id="pop_id">{popupContent.id}</h3>
          <p id="pop_reason">{popupContent.reason}</p>
          <p id="pop_short_description">{popupContent.short_description}</p>
          <p  id="pop_long_description">{popupContent.long_description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <p id="pop_start_date" style={{ display: 'inline-block', marginRight: '1em' }}>Requested:</p>
  <p id="pop_total_ada" style={{ display: 'inline-block', paddingLeft: '1em' }}>{parseFloat(popupContent.total_ada).toLocaleString()} ₳</p>
</div>

<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <p style={{ display: 'inline-block', marginRight: '1em'}}>Socials:</p>
  {popupContent.twitterLink !== '' && (
    <p style={{ display: 'inline-block', marginRight: '1em'}}>
     <SocialLink href={`https://twitter.com/${popupContent.twitterLink}`} target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} />
        </SocialLink>
    </p>
  )}
</div>


         
        
          <div>
          <p id="pop_start_date">Request start date: {popupContent.start_date}</p>
          <p id="pop_finish_date">Request finish date: {popupContent.finish_date}</p>
          </div>
          <p id="pop_short_description">Requester's address: {popupContent.address}</p>

            <button onClick={closePopup}>Close</button>
            </div>
        </div>
      )}
      
    </div>
  );
};

export default BigBox;
