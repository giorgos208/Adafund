
import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import './Requests.css';
import axios from 'axios';
import NamiIcon from './nami.svg';
//import { Lucid, Blockfrost } from "https://unpkg.com/lucid-cardano@0.9.8/web/mod.js"
import { Lucid, Blockfrost } from "lucid-cardano";
import smallBoxesData from './smallBoxesData.json';
import {SmallBoxDetailsv2} from './SmallBoxDetails.js';
//import { Blockfrost, Lucid } from "lucid-cardano";
import EternlIcon from './eternl.png';
import SmallBox from './BigBox.js'; // Replace './SmallBox' with the actual path to your SmallBox component file

const FormField = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #808080; /* set background color to black */
  color: #ffffff;
  outline: none;
  ::placeholder { 
    color: #ffffff;
  }
  &:focus {
    border-color: #4caf50;
  }
`;
const Heading = styled.h1`
  font-size: 2rem;
  color: #ffffff;
`;
const Label = styled.label`
color: #ffffff;
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
  background-color:  #808080;
  color: #ffffff;
  outline: none;
  resize: none;
  ::placeholder { 
    color:  #BEBEBE;
  }
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
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;





const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #ffffff;
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
   const [showModal, setShowModal] = useState(false);
  const [signer_address, setSignerAddress] = useState(""); 
  const [stake_address, setStakeAddress] = useState("");
  const [hasRequest, setHasRequest] = useState(false);
  const [RequestID, setRequestID] = useState("-1");
  const [wallet, setWallet] = useState("");


  async function isRequester(stake_address) {
    try {
      const response = await axios.post('http://localhost:5000/api/validate', { stake_address });
      console.log(stake_address)
      console.log(response.data); 
      if (response.data === false) return false
      else {
        setRequestID(response.data)
      
      return true
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
  

  
  const Dropdown = () => {
    const handleNamiClick = async () => {
      const api = await window.cardano.nami.enable();
        const lucid = await Lucid.new(
          new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0", "mainnetAXWgU2phwchiCXQmCsNEwBlHT9jM3hFP"),
          "Mainnet",
        );
        lucid.selectWallet(api);
        const address = await lucid.wallet.address()
        setWallet("nami");
        let stake_address = ""
        //
        await axios.get(`https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`, {
          headers: {
            'project_id': "mainnetAXWgU2phwchiCXQmCsNEwBlHT9jM3hFP"
          }
        })
          .then(response => {
            // handle success
            stake_address = response.data.stake_address
          })
          .catch(error => {
            // handle error
            console.log(error);
          });        
        setSignerAddress(address);
        setStakeAddress(stake_address)
     
        setWalletConnected(true);
        const flag = await isRequester(stake_address)
     
        setHasRequest(Boolean(flag));
  
    };
  
    const handleEternlClick = async () => {
      const api = await window.cardano.eternl.enable();
      const lucid = await Lucid.new(
        new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0", "mainnetAXWgU2phwchiCXQmCsNEwBlHT9jM3hFP"),
        "Mainnet",
      );
      lucid.selectWallet(api);
      setWallet("eternl");
      const address = await lucid.wallet.address()
      let stake_address = ""
      //
      await axios.get(`https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address}`, {
        headers: {
          'project_id': "mainnetAXWgU2phwchiCXQmCsNEwBlHT9jM3hFP"
        }
      })
        .then(response => {
          // handle success
          stake_address = response.data.stake_address
        })
        .catch(error => {
          // handle error
          console.log(error);
        });        
        setSignerAddress(address);
        console.log("Set address", address)
        setStakeAddress(stake_address)
   
        setWalletConnected(true);
        const flag = await isRequester(stake_address)
   
        setHasRequest(Boolean(flag));
  
    };
  
    return (
      <div className="dropdown">
        <button className ="donate-button">Connect Wallet</button>
        <div className="dropdown-content">
        <a onClick={handleNamiClick} style={{ color: 'white' }}>
          Nami
            <img src={NamiIcon} alt="Nami Icon" style={{ width: '23px', marginLeft: '12px' }} />
         
          </a>
          <a onClick={handleEternlClick} style={{ color: 'white' }}>
          Eternl
            <img src={EternlIcon} alt="Eternl Icon" style={{ width: '29px', marginLeft: '12px' }} />
            
          </a>
        </div>
      </div>
    );
  };
  
  const closeModal = () => {
    setShowModal(false);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());
    formValues["address"] = signer_address;
    formValues["stake_address"] = stake_address;
    console.log(formValues);
    console.log(wallet)
 
    const lucid = await Lucid.new(
      new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0", "mainnetAXWgU2phwchiCXQmCsNEwBlHT9jM3hFP"),
      "Mainnet",
    );
    
    if (wallet === "") return
    else {
      let api;
      if (wallet === "nami")  api = await window.cardano.nami.enable();
      else api = await window.cardano.eternl.enable();
      
      lucid.selectWallet(api);
      const tx = await lucid.newTx()
        .payToAddress("addr1qyywq00rz444qg9uvcsgf2w6uu6fawkvd24x0a9x9yp4vj7kk8w703jmsdn670gugwvz4qjg47vfn4hv6r5n5z74aj5sdp52wc", { lovelace: 1000000n })
        .complete();
      
      const signedTx = await tx.sign().complete();
      
      try { 
      const txHash = await signedTx.submit();
      alert("Thank you for using our service. Your request will soon be processed. Wait some seconds and refresh this page.")
      formValues["txHash"] = txHash;
      console.log(txHash);
      //
      sendPOSTrequest(formValues) 
      }
      catch (error){
        alert("Something went wrong. No funds, or did you cancel the transaction?")
      }
      
    }
   

  };
  
  return (
    <DashboardContainer>
      {!walletConnected && (
        <>
          <Title>Sign in with your wallet to access the dashboard.</Title>
         
         <Dropdown></Dropdown>
        </>
      )}
  
  {walletConnected && (
  <>
 <div style={{ marginBottom: "20px", color: "#ffffff"}}>
  Connected: {stake_address}
</div>
    {hasRequest ? (
      <>
       <div style={{ marginBottom: "20px", color: "#ffffff"}}> You already have a fund request running:
  
</div>
  <SmallBoxDetailsv2 smallBoxesData={smallBoxesData} id={RequestID.toString()} />
  <div style={{ marginTop: "20px",color: "#ffffff" }}> Please wait for this one to expire, or use a different wallet to start a new one.
  
  </div>
  </>

    ) : (
      <>
   
        <form onSubmit={handleFormSubmit}>
        <Heading>Make sure to read the FAQ before proceeding!</Heading>
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

          <Label htmlFor="request_duration">Request time duration in days (maximum: 30)</Label>
<FormField type="number" placeholder="14" id="request_duration" name="request_duration" required max="30" style={{textAlign: "center"}} />


          <CheckBox id="terms_checkbox" required />
          <Label htmlFor="terms_checkbox">
            I agree to the{' '}
            <TermsLink href="#" onClick={() => setShowModal(true)}>
              Terms of Service
            </TermsLink>
          </Label>

          <button className ="donate-button" type="submit">Submit</button>
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