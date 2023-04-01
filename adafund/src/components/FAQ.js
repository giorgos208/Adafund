import React, { useState } from 'react';
import styled from 'styled-components';

const FAQContainer = styled.div`
  max-width: 1200px;
  height: auto;
  margin: auto auto;
  background-color: rgba(0, 0, 0, 0.55);
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 40px;
  color: #ffffff;
  text-align: center;
`;

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Arrow = styled.span`
  font-size: 1.5rem;
  margin-right: 10px;
  color:#BEBEBE;
  transition: transform 0.3s;

  ${({ show }) =>
    show &&
    `
    transform: rotate(90deg);
  `}
`;

const Question = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 10px;
  color:#ffffff;
  cursor: pointer;

  text-shadow: 1px 1px 1px rgba(150, 150, 150, 0.1);
  transition: color 0.2s;
  width: 600px; // Set a standard width for the question

  &:hover {
    color: #555;
  }
`;

const Answer = styled.p`
  font-size: 1.4rem;
  margin-bottom: 20px;
  color:#ffffff;
  display: ${({ show }) => (show ? 'block' : 'none')};

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
      answer: 'This decentralized application is a crowdfunding service that aims to enable anyone to raise enough money for a project. The project can be a direct donation to a charity, an academic or business plan, or anything else the creator comes up with.',
    },
    {
      question: 'How can I create a new funding request?',
      answer: 'You can head to the "Dashboard" section and follow the instructions. You must complete and submit the form with all the necessary information. To submit the form, you must sign with your wallet and pay the create-request fee. Check our fee structure in the following question.',
    },
    {
      question: 'What are the fees for using the service?',
      answer: 'In our current version: We charge a 10 $ADA fee to start any funding request. That is mainly to prevent bots from spamming our resources.\n In our full version (still in development): On top of the request creating fee, an additional 1% service fee to the total $ADA raised will also be charged upon completion.',
    },
    {
        question: 'How do funding requests finish?',
        answer: 'Funding requests finish when their time runs out (expire), or the requested amount is successfully raised. The requester does not claim the raised funds. Instead, they are immediately deposited to their address upon donation.',
    },
      
      {
        question: 'Are the funds safe?',
        answer: "A 100% yes. All donations immediately occur in the requester's wallet address. We do not hold custody of the donations, not even for a split second. For that reason, we can not make any refunds. All donations are final.",
      },
      {
        question: 'How can I reach out to you?',
        answer: 'We are active on Twitter so you can message us there or send us an email on adafundio@gmail.com',
      },
      {
        question: 'Any potential dangers/risks?',
        answer: "While the application and all blockchain-related actions work as intended, we do not monitor or censor funding requests. That means, when the application meets success, bad actors will appear and will try to fraud people by copying another person's request, pretending their request is the original. Therefore, always double-check the request ID number to which you donate funds. ",
      }, 
      {
        question: 'Future plans/roadmap?',
        answer: "Our current version is without the use of Smart Contracts. As mentioned, donations are not stored but are directly deposited to the requester. We are already working on integrating smart contracts into the application, in order to store the donations in a secure smart contract for full transparency. The requester will then have to claim the donations themselves.",
      }, 
      {
        question: 'Is there any token or NFT collection associated with this application?',
        answer: "No. We created this service from scratch without any funding. We thank you for your support.",
      },      
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
