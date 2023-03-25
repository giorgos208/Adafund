import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background-image: url('adafund/src/components/background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const BackgroundImage = () => {
  return <ImageContainer />;
};

export default BackgroundImage;
