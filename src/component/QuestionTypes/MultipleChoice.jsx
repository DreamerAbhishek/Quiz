import React, { useState } from "react";
import LatexEquations from "../latexEquations";

const MultipleChoice = ({ data, onSubmit, prevAns }) => {
  const [userAnswers, setUserAnswers] = React.useState([]);
  const [correct, setCorrect] = useState(prevAns?.answerChecked || "Incorrect");
  const [attempt, setAttempt] = useState(prevAns?.attempts);

  const handleToggle = (selectedOption) => {
    const updatedAnswers = [...userAnswers];
    const index = updatedAnswers.indexOf(selectedOption);

    if (index === -1) {
      updatedAnswers.push(selectedOption);
    } else {
      updatedAnswers.splice(index, 1);
    }

    setUserAnswers(updatedAnswers);
  };

  const equalsCheck = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const checkAnswer = () => {
    setAttempt(attempt - 1);
    if (equalsCheck(data.answer.sort(), userAnswers.sort())) {
      onSubmit({ answerCheck: "Correct" });
      setCorrect("Correct");
    } else {
      onSubmit({ answerCheck: "Incorrect" });
      setCorrect("Incorrect");
    }
  };

  return (
    <div>
      <div>
        <h3>{data.question}</h3>
        <ul>
          {data.options.map((option, index) => (
            <li key={index}>
              <label className="labelCont">
                <input
                  type="checkbox"
                  name="answer"
                  value={index}
                  onChange={() => handleToggle(index)}
                />
                <LatexEquations latexEquation={option} />{" "}
              </label>
            </li>
          ))}
        </ul>
      </div>
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
  );
};

export default MultipleChoice;
