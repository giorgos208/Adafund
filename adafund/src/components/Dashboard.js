import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';
import SmallBox from './BigBox.js'; // Replace './SmallBox' with the actual path to your SmallBox component file

const FormField = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #4caf50;
  }
`;
const Heading = styled.h1`
  font-size: 2rem;
  color: #4caf50;
`;
const Label = styled.label`
  font-size: 1.2rem;
  display: block;
  margin-bottom: 5px;
`;
const TextAreaField = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  resize: none;
  &:focus {
    border-color: #4caf50;
  }
`;
const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  margin-top: 20px;
`;

const TermsLink = styled.a`
  color: #4caf50;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;

  height: 100vh;
`;


const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;
const WalletButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  outline: none;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

const DropdownContent = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
`;

function sendPOSTrequest(formValues) {
   
    
    axios.post('http://localhost:5000/api/request', formValues)
      .then(response => {
        console.log()
        console.log(response.data); 
        console.log() 
      })
      .catch(error => {
        console.error(error);
      });
    }

const Dashboard = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [flag, setFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleConnectWallet = (option) => {
    // Call the corresponding function based on the selected option
    if (option === 1) {
      console.log('Option 1 selected');
    } else if (option === 2) {
      console.log('Option 2 selected');
    }

    // Set the walletConnected state to true
    setWalletConnected(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    console.log(formValues);
 sendPOSTrequest(formValues) 

  };
  
  return (
    <DashboardContainer>
      {!walletConnected && (
        <>
          <Title>Sign in with your wallet to access the dashboard.</Title>
          <WalletButton onClick={() => setShowDropdown(!showDropdown)}>
            Connect Wallet
          </WalletButton>
          <DropdownContent show={showDropdown}>
            <button onClick={() => handleConnectWallet(1)}>Option 1</button>
            <button onClick={() => handleConnectWallet(2)}>Option 2</button>
          </DropdownContent>
        </>
      )}
  
  {walletConnected && (
  <>
    {flag ? (
      <SmallBox
        name="Example"
        short_description="Example Description"
        onClick={() => console.log('Details clicked')}
        backgroundColor="#f1f1f1"
        twitterLink="https://twitter.com"
        timeLeft={10}
        totalTime={100}
      />
    ) : (
      <>
        
        <form onSubmit={handleFormSubmit}>
        <Heading>Text Message as a Heading</Heading>
          <Label htmlFor="reason">Reason for funding</Label>
          <FormField type="text" placeholder="Cardano Dapp Creation" id="reason" name="reason" required />

          <Label htmlFor="short_description">Short description</Label>
          <FormField type="text" placeholder="Need to cover developer costs." id="short_description" name="short_description" required />

          <Label htmlFor="long_description">Long description</Label>
          <TextAreaField placeholder="Hello, my name is ... and I am looking forward to creating ..." id="long_description" name="long_description" required></TextAreaField>

          <Label htmlFor="twitter_handle">Twitter handle</Label>
          <FormField type="text" placeholder="@..." id="twitter_handle" name="twitter_handle" />

          <Label htmlFor="total_ada">Total ADA asking</Label>
          <FormField type="number" id="total_ada" name="total_ada" required />

          <Label htmlFor="request_duration">Request time duration (in days)</Label>
          <FormField type="text" placeholder="14" id="request_duration" name="request_duration" required />

          <CheckBox id="terms_checkbox" required />
          <Label htmlFor="terms_checkbox">
            I agree to the{' '}
            <TermsLink href="#" onClick={() => setShowModal(true)}>
              Terms of Service
            </TermsLink>
          </Label>

          <button type="submit">Submit</button>
        </form>
        <Modal isOpen={showModal} onRequestClose={closeModal} contentLabel="Terms of Service">
          <h2>Terms of Service</h2>
          <p>Here are the terms of service.</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      </>
    )}
  </>
)}

        
     
    </DashboardContainer>
  );
}

export default Dashboard;