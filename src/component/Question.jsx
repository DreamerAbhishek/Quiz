import React, { useEffect, useState } from "react";
import SingleChoice from "./QuestionTypes/SingleChoice";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import MultipleChoice from "./QuestionTypes/MultipleChoice";
import FillBlank from "./QuestionTypes/FillBlank";
import SortingChoiceQuestion from "./QuestionTypes/SortingChoiceQuestion";
import ReactHowler from "react-howler";
import { HiSpeakerWave } from "react-icons/hi2";
import negativeWhistle from "./music/whistled.wav";
import positiveWhistle from "./music/whistle.mp3";

const Question = ({ questionData, Id }) => {
  let AnswerArray = localStorage.getItem("answers");
  let jsonParse = JSON?.parse(AnswerArray);
  let PreviewsAnswers = jsonParse?.find((a, i) => a.questionNo === Id);

  const [userData, setUserData] = useState({
    flag: PreviewsAnswers?.flag || false,
    attempts:
      PreviewsAnswers?.attempts === 0 ? 0 : PreviewsAnswers?.attempts || 3,
    answerChecked: PreviewsAnswers?.answerChecked || "",
    questionNo: Id,
  });

  const [pop, setPop] = useState();
  const [play, setPlay] = useState();

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
      return {
        ...prev,
        answerChecked: val.answerCheck,
        attempts: userData.attempts - 1,
      };
    });
    setPop(true);
    setPlay(true);
  };

  const question = questionData[Id];

  return (
    <div className="questionContainer">
      <div className="subContainer">
        <div>
          <h2 className="marginCor">
            Question {Id} <HiSpeakerWave />
          </h2>
          <p>{userData.attempts} attempt(s) left</p>
        </div>
        {play && (
          <ReactHowler
            src={
              userData.answerChecked === "Correct"
                ? positiveWhistle
                : negativeWhistle
            }
            playing={true}
          />
        )}
        <div className="iconContainer" onClick={handleFlag}>
          {" "}
          {userData.flag ? (
            <FaBookmark className="icon" fill="orange" />
          ) : (
            <FaRegBookmark className="icon" />
          )}
          <p className="marginCont">Flag for later</p>
        </div>
      </div>
      {question.type === "single" && (
        <SingleChoice
          data={question}
          onSubmit={handleLocal}
          checked={userData.answerChecked}
          prevAns={PreviewsAnswers}
        />
      )}
      {question.type === "multiple" && (
        <MultipleChoice
          data={question}
          onSubmit={handleLocal}
          checked={userData.answerChecked}
          prevAns={PreviewsAnswers}
        />
      )}
      {question.type === "fill" && (
        <FillBlank
          data={question}
          onSubmit={handleLocal}
          prevAns={PreviewsAnswers}
        />
      )}
      {question.type === "sorting" && (
        <SortingChoiceQuestion
          data={question}
          onSubmit={handleLocal}
          prevAns={PreviewsAnswers}
        />
      )}
      {pop && (
        <div
          className={"popCont"}
          style={{
            background: userData.answerChecked === "Correct" ? "green" : "red",
          }}
        >
          {userData.answerChecked}
        </div>
      )}
    </div>
  );
};

export default Question;
