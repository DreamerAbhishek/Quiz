import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import questionData from "../questions.json";
import SingleChoice from "./QuestionTypes/SingleChoice";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import FillBlank from "./QuestionTypes/FillBlank";
// import LaTeXEquation from "./QuestionTypes/ketex";
import LatexEquations from "./latexEquations";

const Question = () => {
  const { Id } = useParams();

  let AnswerArray = localStorage.getItem("answers");
  let jsonParse = JSON?.parse(AnswerArray);
  let PreviewsAnswers = jsonParse?.find((a, i) => a.questionNo === Id);

  const [userData, setUserData] = useState({
    flag: PreviewsAnswers?.flag || false,
    attempts: PreviewsAnswers?.attempts || 3,
    answerChecked: PreviewsAnswers?.answerChecked || "",
    questionNo: Id,
  });

  useEffect(() => {
    if (Boolean(jsonParse)) {
      let indexValue = jsonParse?.findIndex((a, i) => a.questionNo === Id);
      if (indexValue !== -1 && indexValue !== undefined) {
        jsonParse[indexValue] = userData;
      } else {
        jsonParse.push(userData);
      }
      const jsonString = JSON.stringify(jsonParse);
      localStorage.setItem("answers", jsonString);
    } else {
      AnswerArray = [];
      AnswerArray.push(userData);
      const jsonString = JSON.stringify(AnswerArray);
      localStorage.setItem("answers", jsonString);
    }
  }, [userData, Id]);

  const handleFlag = () => {
    setUserData((prev) => {
      return { ...prev, flag: !userData.flag };
    });
  };

  const handleLocal = (val) => {
    setUserData((prev) => {
      return { ...prev, answerChecked: val.answerCheck };
    });
  };

  return (
    <div className="questionContainer">
      <div className="subContainer">
        <h2>Question {Id}</h2>
        <div className="iconContainer" onClick={handleFlag}>
          {" "}
          {userData.flag ? (
            <FaBookmark className="icon" fill="orange" />
          ) : (
            <FaRegBookmark className="icon" />
          )}
          <p style={{ margin: 0 }}>Flag for later</p>
        </div>
      </div>
      <SingleChoice
        data={questionData[`q${Id}`]}
        onSubmit={handleLocal}
        checked={userData.answerChecked}
      />
      <LatexEquations />
      {/* <LaTeXEquation equation="c = \\sqrt{a^2 + b^2}" /> */}

      {/* <MultipleChoice data={questionData.q2} /> */}
      {/* <FillBlank data={questionData.q3} /> */}
      {/* <MatrixSortingQuizApp /> */}
    </div>
  );
};

export default Question;
