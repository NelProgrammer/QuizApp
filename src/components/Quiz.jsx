import { useState, useCallback, useRef } from 'react';
import Dummy_Questions from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';
import Question from './Question.jsx';

const Quiz = () => {
  const [answerState, setAnswerState] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const correctAnswers = useRef();

  const activeQuestionIndex =
    answerState === '' ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === Dummy_Questions.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setAnswerState('answered');
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      setTimeout(() => {
        if (
          selectedAnswer === Dummy_Questions[activeQuestionIndex].answers[0]
        ) {
          setAnswerState('correct');
          if (!correctAnswers.current) {
            correctAnswers.current = [...correctAnswers.current, 1];
          }
        } else {
          setAnswerState('wrong');
        }

        setTimeout(() => {
          setAnswerState('');
        }, 1000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

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
        questionText={Dummy_Questions[activeQuestionIndex].text}
        allAnswers={Dummy_Questions[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
};

export default Quiz;
