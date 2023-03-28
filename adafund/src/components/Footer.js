import React from 'react';
import styled from 'styled-components';
import {  faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #222;
`;

const FooterText = styled.p`
  color: #fff;
  margin-bottom: 10px;
`;

const SocialLink = styled.a`
  color: #1da1f2;
  font-size: 24px;
  transition: color 0.2s;

  &:hover {
    color: #0d84d9;
  }
`;


const Footer = () => (
  <FooterContainer>
    <FooterText>&copy; {new Date().getFullYear()} ADAFund. All rights reserved. </FooterText>
    <SocialLink href="https://twitter.com/adafund_io" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} />
        </SocialLink>
  </FooterContainer>
);

export default Footer;
