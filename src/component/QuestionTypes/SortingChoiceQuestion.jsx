import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Define the item type for drag-and-drop
const ItemTypes = {
  ANSWER: "answer",
};

// Draggable Answer component
const DraggableAnswer = ({ id, text, index, moveAnswer }) => {
  const [, drag] = useDrag({
    type: ItemTypes.ANSWER,
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.ANSWER,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveAnswer(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => drag(drop(node))} className="dragCont">
      {text}
    </div>
  );
};

// Sorting Choice Question component
const SortingChoiceQuestion = ({ data, onSubmit, prevAns }) => {
  const [correct, setCorrect] = useState(prevAns?.answerChecked || "Incorrect");
  const [sortedAnswers, setSortedAnswers] = useState(data.options);
  const [attempt, setAttempt] = useState(prevAns?.attempts);

  const moveAnswer = (fromIndex, toIndex) => {
    const updatedAnswers = [...sortedAnswers];
    const [movedAnswer] = updatedAnswers.splice(fromIndex, 1);
    updatedAnswers.splice(toIndex, 0, movedAnswer);
    setSortedAnswers(updatedAnswers);
  };

  const equalsCheck = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const checkAnswer = () => {
    setAttempt(attempt - 1);
    if (equalsCheck(data.answer, sortedAnswers)) {
      onSubmit({ answerCheck: "Correct" });
      setCorrect("Correct");
    } else {
      onSubmit({ answerCheck: "Incorrect" });
      setCorrect("Incorrect");
    }
  };

  return (
    <div>
      <h3>{data.question}</h3>
      <DndProvider backend={HTML5Backend}>
        {sortedAnswers.map((answer, index) => (
          <DraggableAnswer
            key={index}
            id={index}
            text={answer}
            index={index}
            moveAnswer={moveAnswer}
          />
        ))}
      </DndProvider>
      <div>
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
    </div>
  );
};

export default SortingChoiceQuestion;
