import React from 'react';
import styled from 'styled-components';

const FeaturesContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
`;

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  border-radius: 5px;
  width: 280px;
`;

const FeatureIcon = styled.img`
  width: 64px;
  height: 64px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  text-align: center;
`;

const featuresData = [
  {
    icon: 'path/to/icon1.svg',
    title: 'Feature 1',
    description: 'This is a description for Feature 1.',
  },
  {
    icon: 'path/to/icon2.svg',
    title: 'Feature 2',
    description: 'This is a description for Feature 2.',
  },
  {
    icon: 'path/to/icon3.svg',
    title: 'Feature 3',
    description: 'This is a description for Feature 3.',
  },
  // Add more features if needed
];

const Features = () => (
  <FeaturesContainer>
    {featuresData.map((feature, index) => (
      <FeatureCard key={index}>
        <FeatureIcon src={feature.icon} alt={feature.title} />
        <FeatureTitle>{feature.title}</FeatureTitle>
        <FeatureDescription>{feature.description}</FeatureDescription>
      </FeatureCard>
    ))}
  </FeaturesContainer>
);

export default Features;
