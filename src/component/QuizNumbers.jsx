import React from "react";
import "../App.css";
import { FaBookmark } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";

const QuizNumbers = ({ questionData, id }) => {
  let AnswerArray = localStorage.getItem("answers");
  let jsonParse = JSON?.parse(AnswerArray);
  let questionArr = Object.values(questionData);

  let sortedArray = questionArr.map((t1) => ({
    ...t1,
    // checking value only not data type i.e. ==
    ...jsonParse?.find((t2) => t2.questionNo == t1.questionNo),
  }));

  return (
    <>
      <h3 className="marginCont">Assignment Title Here</h3>
      <hr className="marginCont"></hr>
      <div className="totalQues">
        <p>Questions:</p>
        <p>{questionArr.length}questions</p>
      </div>{" "}
      <div className="gridNumbers">
        {sortedArray.map((val, index) => (
          <a
            className={
              val.questionNo === id ? "gridItems activeButton" : "gridItems"
            }
            key={index}
            href={`/${val.questionNo}`}
          >
            {val.answerChecked === "Correct" && (
              <FcCheckmark className="icon" />
            )}
            {val.answerChecked === "Incorrect" && (
              <RxCross2 className="icon iconCol" />
            )}
            {val.questionNo}
            {val.flag && <FaBookmark className="icon" fill="orange" />}
          </a>
        ))}
      </div>
    </>
  );
};

export default QuizNumbers;
