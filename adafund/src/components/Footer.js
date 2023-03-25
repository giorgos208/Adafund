import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  background-color: #20232a;
`;

const FooterText = styled.p`
  font-size: 1rem;
  color: white;
`;

const Footer = () => (
  <FooterContainer>
    <FooterText>&copy; {new Date().getFullYear()} ADAFund. All rights reserved.</FooterText>
  </FooterContainer>
);

export default Footer;
