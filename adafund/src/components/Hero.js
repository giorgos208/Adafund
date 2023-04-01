import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background-image: url('your-background-image-url');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: black;
  margin-bottom: 1rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  color: black;
`;

const Hero = () => (
  <HeroContainer>
    <Title>ADA Fund</Title>
    <Subtitle>A Smart Contract based solution to request funding.</Subtitle>
  </HeroContainer>
);

export default Hero;
