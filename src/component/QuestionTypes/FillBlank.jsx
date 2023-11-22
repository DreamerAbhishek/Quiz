import React, { useState } from "react";
import wordsToNumbers from "words-to-numbers";

const FillBlank = ({ data, onSubmit, prevAns }) => {
  const [userAnswers, setUserAnswers] = React.useState("");
  const [correct, setCorrect] = useState(prevAns?.answerChecked || "Incorrect");
  const [attempt, setAttempt] = useState(prevAns?.attempts);

  const handleInputChange = (value) => {
    const numericValue = wordsToNumbers(value);
    setUserAnswers(numericValue);
  };

  const checkAnswer = () => {
    setAttempt(attempt - 1);
    if (data.answer === `${userAnswers}`) {
      onSubmit({ answerCheck: "Correct" });
      setCorrect("Correct");
    } else {
      onSubmit({ answerCheck: "Incorrect" });
      setCorrect("Incorrect");
    }
  };

  return (
    <div className="fillCont">
      <h3>{data.question}</h3>
      {data.options && <img alt="imag" src={data.options} className="image" />}
      <input
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        className="fillSub"
      />
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

export default FillBlank;
