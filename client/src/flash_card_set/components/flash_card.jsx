import React, { PropTypes } from 'react';

const FlashCard = ({ answer, question }) => (
  <div className="FlashCard">Answer: {answer}. Question: {question}</div>
);

FlashCard.propTypes = {
  answer: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired
};

export default FlashCard;
