import React from "react";

const StartGame = ({
  difficulty,
  setDifficulty,
  category,
  setCategory,
  categories,
  num,
  setNum,
  fetchQuiz,
}) => {
  return (
    <div className="start">
      <h1>Quiz App</h1>
      <div>
        <p>Select Difficulty</p>
        <select
          name=""
          id=""
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <p>Select Category</p>
        <select
          name=""
          id=""
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories
            ? categories.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))
            : ""}
        </select>
        <p>Input Number of Questions</p>
        <input
          type="number"
          value={num}
          onChange={(e) => setNum(e.target.value)}
        />
      </div>
      <button onClick={fetchQuiz}>Start</button>
    </div>
  );
};

export default StartGame;
