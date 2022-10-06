import React from "react";

const Questions = ({ quiz, questionNumber, handleAnswerButton, length }) => {

  return (
    <div className="questions-container">
      <div className="question">
        <h2>
          Question {questionNumber + 1} / {length}{" "}
        </h2>
        <h3>{quiz.question}</h3>
      </div>
      <div className="answers">
        {quiz.possible_answers.map((el) => (
          <p key={el.id} onClick={() => handleAnswerButton(el.isCorrect)}>
            {el.posib_ans}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Questions;
