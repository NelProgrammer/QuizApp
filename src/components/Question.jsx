import QuestionTimer from './QuestionTimer';
import Answers from './Answers';

const Question = ({
  questionText,
  allAnswers,
  selectedAnswer,
  answerState,
  onSelectAnswer,
  onSkipAnswer,
}) => {
  return (
    <div is="question">
      <QuestionTimer timeout={5000} onTimeout={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers
        allAnswers={allAnswers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={onSelectAnswer}
      />
    </div>
  );
};

export default Question;
