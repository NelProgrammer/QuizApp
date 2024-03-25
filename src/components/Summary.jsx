import React from 'react';
import quizCompleteImg from '../assets/quiz-complete.png';
import Dummy_Questions from '../questions';

const Summary = ({ userAnswers, setUserAnswers }) => {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === Dummy_Questions[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );

  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );

  const wrongAnswersShare = 100 - (skippedAnswersShare + correctAnswersShare);

  const resetQuiz = () => {
    setUserAnswers([]);
    return (
      <div id="quiz">
        <Question
          key={0}
          currentQuestionIndex={0}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
      </div>
    );
  };

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon"></img>
      <h2>Quiz Completed!</h2>
      <div className="summary-stats">
        <p>
          <span className="number">{skippedAnswersShare}% </span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswersShare}% </span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersShare}% </span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = 'user-answer';

          if (answer === null) {
            cssClass += ' skipped';
          } else if (answer === Dummy_Questions[index].answers[0]) {
            cssClass += ' correct';
          } else {
            cssClass += ' wrong';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{Dummy_Questions[index].text}</p>
              <p className={cssClass}>{answer ?? 'Skipped'}</p>
            </li>
          );
        })}
      </ol>

      <button onClick={resetQuiz}>Restart the Quiz</button>
    </div>
  );
};

export default Summary;
