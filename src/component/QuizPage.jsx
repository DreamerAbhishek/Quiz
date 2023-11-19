import React from "react";
import QuizNumbers from "./QuizNumbers";
import Question from "./Question";

const QuizPage = () => {
  return (
    <>
      <header className="header">Quiz</header>
      <div className="gridContainer">
        <div className="gridQues">
          <QuizNumbers />
        </div>
        <div className="gridItem">
          <Question />
        </div>
      </div>
    </>
  );
};

export default QuizPage;
