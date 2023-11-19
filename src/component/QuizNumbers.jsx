import React from "react";
import "../App.css";
import { FaBookmark } from "react-icons/fa6";

const QuizNumbers = () => {
  let AnswerArray = localStorage.getItem("answers");
  let jsonParse = JSON?.parse(AnswerArray);

  const arrayOfNumber = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7,
    8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3,
    4, 5, 6, 7, 8, 9,
  ];
  return (
    <>
      <h3 style={{ margin: 0 }}>Assignment Title Here</h3>
      <hr style={{ margin: 0 }}></hr>
      <div className="totalQues">
        <p>Questions:</p>
        <p>{arrayOfNumber.length}questions</p>
      </div>{" "}
      <div
        className="gridNumbers"
        style={{ maxHeight: window.innerHeight - 130 }}
      >
        {arrayOfNumber.map((val, index) => (
          <a className="gridItems" key={index} href={`/${index + 1}`}>
            {val}
          </a>
        ))}
      </div>
    </>
  );
};

export default QuizNumbers;
