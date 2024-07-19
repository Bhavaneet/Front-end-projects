import React from 'react';

const Question = ({ question, onAnswerClick }) => {
  return (
    <div className="question-section">
      <h2>{question.question}</h2>
      <div className="options">
        {question.options.map((option, index) => (
          <button key={index} onClick={() => onAnswerClick(option === question.answer)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
