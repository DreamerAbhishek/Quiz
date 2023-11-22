import React, { useState } from "react";
import LatexEquations from "../latexEquations";

const SingleChoice = ({ data, onSubmit, prevAns }) => {
  const [answer, setAnswer] = useState();
  const [correct, setCorrect] = useState(prevAns?.answerChecked || "Incorrect");
  const [attempt, setAttempt] = useState(prevAns?.attempts);

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const checkAnswer = () => {
    setAttempt(attempt - 1);
    // checking value only not data type i.e. ==
    if (data.answer == answer) {
      onSubmit({ answerCheck: "Correct" });
      setCorrect("Correct");
    } else {
      onSubmit({ answerCheck: "Incorrect" });
      setCorrect("Incorrect");
    }
  };

  return (
    <>
      <div className="SingleChoice">
        <p>{data.question}</p>{" "}
        <ul>
          {data.options.map((val, index) => (
            <li key={index}>
              <label className="labelCont">
                <input
                  type="radio"
                  name="answer"
                  value={val}
                  onChange={handleAnswer}
                />{" "}
                <LatexEquations latexEquation={val} />
              </label>
            </li>
          ))}
        </ul>
        <br></br>
        {correct === "Incorrect" && attempt > 0 ? (
          <button type="button" className="button" onClick={checkAnswer}>
            Check
          </button>
        ) : (
          <a href={`/${+data.questionNo + 1}`}>
            <button type="button" className="button">
              Next
            </button>
          </a>
        )}
      </div>
    </>
  );
};

export default SingleChoice;
