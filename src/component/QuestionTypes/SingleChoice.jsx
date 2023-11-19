import React, { useEffect, useState } from "react";

const SingleChoice = ({ data, onSubmit, checked }) => {
  const [answer, setAnswer] = useState();

  const [userData, setUserData] = useState({
    attempts: 3,
    answerCheck: "",
  });

  const handleAnswer = (e) => {
    setAnswer(e.target.value);
  };

  const checkAnswer = () => {
    if (data.answer === answer) {
      onSubmit({ answerCheck: "Correct" });
    } else {
      onSubmit({ answerCheck: "Wrong" });
    }
  };

  return (
    <>
      <div className="SingleChoice">
        <p>{data.question}</p>{" "}
        {data.options.map((val, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="answer"
                value={val}
                onChange={handleAnswer}
              />{" "}
              {val}
            </label>
          </li>
        ))}
        <br></br>
        <button type="button" className="button" onClick={checkAnswer}>
          Check
        </button>
      </div>
    </>
  );
};

export default SingleChoice;
