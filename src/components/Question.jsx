import QuestionTimer from './QuestionTimer';
import Answers from './Answers';
import { useState } from 'react';
import Dummy_Questions from '../questions';

const Question = ({ currentQuestionIndex, onSelectAnswer, onSkipAnswer }) => {
  const [answer, setAnswer] = useState({ selectedAnswer: '', isCorrect: null });

  const handleSelectAnswer = (answer) => {
    setAnswer({ selectedAnswer: answer, isCorrect: null });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: Dummy_Questions[currentQuestionIndex].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  };

  let answerState = '';

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? 'correct' : 'wrong';
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  }

  return (
    <div is="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{Dummy_Questions[currentQuestionIndex].text}</h2>
      <Answers
        allAnswers={Dummy_Questions[currentQuestionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
