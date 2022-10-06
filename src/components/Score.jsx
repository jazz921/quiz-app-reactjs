import React from "react";

const Score = ({ score, num, playAgainBtn }) => {
  return (
    <div className="score">
      <h1>{`You scored ${score} out of ${num}`}</h1>
      <button onClick={playAgainBtn}>Play Again!</button>
    </div>
  );
};

export default Score;
