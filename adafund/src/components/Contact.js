import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTwitter } from '@fortawesome/free-brands-svg-icons';

const ContactWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  resize: vertical;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  font-size: 1.1rem;
  color: white;
  background-color: #61dafb;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #3aa7ce;
  }
`;

const ContactInfo = styled.div`
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: #20232a;
  &:hover {
    color: #61dafb;
  }
`;

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic
  };

  return (
    <ContactWrapper>
      <h1>Contact Us</h1>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="text" required />
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" required />
        <Label htmlFor="message">Message</Label>
        <TextArea id="message" rows="5" required />
        <SubmitButton type="submit">Submit</SubmitButton>
      </Form>
      <ContactInfo>
        <p>ADAFund</p>
      </ContactInfo>
      <SocialLinks>

        <SocialLink href="https://twitter.com/adafund_io" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} />
        </SocialLink>


      </SocialLinks>
    </ContactWrapper>
  );
};

export default Contact;
