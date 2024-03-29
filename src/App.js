import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import SmallBoxDetails from './components/SmallBoxDetails.js';
import Hero from './components/Hero.js';
import Dashboard from './components/Dashboard.js'; 
import Requests from './components/Requests.js';
import Features from './components/Features.js';
import Footer from './components/Footer.js';
//import Contact from './components/Contact';
import FAQ from './components/FAQ.js';
import GlobalStyles from './components/GlobalStyles.js';
import background from './components/background.png';
import styled from 'styled-components';

const MainContent = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-image: url(${background});
  background-position: center;
  background-attachment: scroll;
  background-repeat: no-repeat;
  background-size: cover;
`;

function App() {
  const isMobile = window.innerWidth < 768;
  const notCompatibleMessage = (
    <div style={{ backgroundColor: 'red', color: 'white', textAlign: 'center', padding: '10px' }}>
      Sorry, this website is not compatible with mobile devices.
      Feel free to use it in your browser though!
    </div>
  );
  const content = (
    <div style={{ display: isMobile ? 'none' : 'block' }}>
      <Header />
      <MainContent>
        <ImageContainer />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/features" element={<Features />} />
          <Route path="/faq" element={<FAQ />} /> 
        
          <Route path="/requests" element={<Requests />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/requests/:id" element={<SmallBoxDetails />} />

          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </MainContent>
    </div>
  );
  
  return (
    <Router>
      <GlobalStyles />
      {isMobile ? notCompatibleMessage : content}
    </Router>
  );
}


export default App;
