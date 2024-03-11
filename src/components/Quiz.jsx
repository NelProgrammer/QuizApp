import { useState, useCallback, useRef } from 'react';
import Dummy_Questions from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const correctAnswers = useRef();

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === Dummy_Questions.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon"></img>
        <h2>Quiz Completed!</h2>
        {correctAnswers.current && (
          <p>
            Your Score is ...{' '}
            {Math.floor(
              correctAnswers.current.length / Dummy_Questions.length
            ) *
              100 +
              '%'}
          </p>
        )}

        <button>Restart the Quiz</button>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        currentQuestionIndex={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;
