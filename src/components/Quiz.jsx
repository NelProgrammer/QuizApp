import { useState } from 'react';
import Dummy_Questions from '../questions.js';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const shuffledAnswers = [...Dummy_Questions[activeQuestionIndex].answers];
  shuffledAnswers.sort((a, b) => Math.random() - 0.5);

  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  };

  return (
    <div id="quiz">
      <div id="question">
        <h2>{Dummy_Questions[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => (
            <li key={answer} className="answer">
              <button onClick={() => handleSelectAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
