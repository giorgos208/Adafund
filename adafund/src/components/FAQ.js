import React, { useState } from 'react';
import styled from 'styled-components';

const FAQContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 40px;
  text-align: center;
`;

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Arrow = styled.span`
  font-size: 1.5rem;
  margin-right: 10px;
  transition: transform 0.3s;

  ${({ show }) =>
    show &&
    `
    transform: rotate(90deg);
  `}
`;

const Question = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  cursor: pointer;
  color: #333;
  text-shadow: 1px 1px 1px rgba(150, 150, 150, 0.1);
  transition: color 0.2s;
  width: 600px; // Set a standard width for the question

  &:hover {
    color: #555;
  }
`;

const Answer = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  display: ${({ show }) => (show ? 'block' : 'none')};
  color: #333;
  max-width: 600px; // Set a standard width for the answer
`;

const FAQItem = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <>
      <QuestionContainer onClick={handleClick}>
        <Arrow show={showAnswer}>&#10148;</Arrow>
        <Question>{question}</Question>
      </QuestionContainer>
      <Answer show={showAnswer}>{answer}</Answer>
    </>
  );
};


const FAQ = () => {
  const faqData = [
    {
      question: 'What is this app for?',
      answer: 'This decentralised aplication is a crowdfunding service that aims to enable anyone to raise enough money needed for a project. The project can be a direct donation to a charity, an academic or business plan, or anything else the creator can convince people to part with their hard-earned ADA for.',
    },
    {
      question: 'How can I create a new funding request?',
      answer: 'You can head over to the "Dashboard" section and follow the instructions.',
    },
    {
        question: 'How do fundings requests finish?',
        answer: 'After expiring',
      },
      {
        question: 'What are the fees to use the service?',
        answer: 'We charge a strict 10 $ADA fee to start any funding request. That is mainly to prevent bots from spamming our resources. There is also an 1% service fee to the total $ADA raised in every funding request.',
      },
      {
        question: 'Are the funds safe?',
        answer: 'A 100% yes. Upon creating a funding request only the requester can claim the balance. Nobody else. Secured by a Smart Contract on Cardano.',
      },
      {
        question: 'How can I reach out to you?',
        answer: 'We are active on Twitter so you can message us there or send us an email on adafundio@gmail.com',
      },
    // Add more FAQs here
  ];

  return (
    <FAQContainer>
      <Title>Frequently Asked Questions</Title>
      {faqData.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </FAQContainer>
  );
};


export default FAQ;
