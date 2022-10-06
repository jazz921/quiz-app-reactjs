import React, { useState, useEffect } from "react";
import StartGame from "./components/StartGame";
import Questions from "./components/Questions";
import Score from "./components/Score";
import ghIcon from "./assets/github-icon.png";

function App() {
  const [quiz, setQuiz] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [categories, setCategories] = useState();
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("9");
  const [num, setNum] = useState(5);
  const [startGame, setStartGame] = useState(false);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php").then((res) =>
      res.json().then((data) => setCategories(data.trivia_categories))
    );
  }, []);

  // decode the escape characters
  function decodeHtml(html) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const fetchQuiz = async () => {
    const API_URL = `https://opentdb.com/api.php?amount=${num}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const res = await fetch(API_URL);
    const data = await res.json();
    const questions = data.results.map((item) => {
      const inc_ans = item.incorrect_answers.map((el) => {
        return {
          // incorrect answers
          id: Math.random() * 50,
          posib_ans: decodeHtml(el),
          isCorrect: false,
        };
      });
      const cor_ans = {
        // correct answer
        id: Math.random() * 10,
        posib_ans: decodeHtml(item.correct_answer),
        isCorrect: true,
      };
      const choices = [...inc_ans, cor_ans]; // merge the incorrect answer and correct answer to a single array
      return {
        id: Math.random() * 100,
        question: decodeHtml(item.question),
        possible_answers: choices.sort(() => 0.5 - Math.random()), // randomize the array
      };
    });
    setQuiz(questions);
    setStartGame(true);
  };

  const handleAnswerButton = (isCorrect) => {
    if (isCorrect === true) {
      setScore((prevScore) => prevScore + 1);
    }

    if (questionNumber + 1 < quiz.length) {
      setQuestionNumber((prevNum) => prevNum + 1);
    } else {
      setShowScore(true);
    }
  };

  const playAgainBtn = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      {!showScore && (
        <div>
          {!startGame ? (
            <StartGame
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              category={category}
              setCategory={setCategory}
              num={num}
              setNum={setNum}
              fetchQuiz={fetchQuiz}
              categories={categories}
            />
          ) : (
            <Questions
              quiz={quiz[questionNumber]}
              questionNumber={questionNumber}
              handleAnswerButton={handleAnswerButton}
              length={quiz.length}
            />
          )}
        </div>
      )}
      {showScore ? (
        <Score score={score} num={num} playAgainBtn={playAgainBtn} />
      ) : (
        ""
      )}

      <a href="https://github.com/jazz921/quiz-app-reactjs">
        <img src={ghIcon} alt="" width="50" className="gh" />
      </a>
    </div>
  );
}

export default App;
