import React from "react";
import { useParams } from "react-router-dom";
import QuizNumbers from "./QuizNumbers";
import Question from "./Question";
import questionData from "../questions.json";

const QuizPage = () => {
  const { Id } = useParams();
  localStorage.setItem("ResumeQues", Id);

  return (
    <>
      <header className="header">Quiz</header>
      <div className="gridContainer">
        <div className="gridQues">
          <QuizNumbers questionData={questionData} id={Id} />
        </div>
        <div className="gridItem">
          <Question questionData={questionData} Id={Id} />
        </div>
      </div>
    </>
  );
};

export default QuizPage;
