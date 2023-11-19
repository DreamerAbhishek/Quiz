import React from "react";

const MultipleChoice = ({ data }) => {
  const [userAnswers, setUserAnswers] = React.useState([]);

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

  const handleSubmit = () => {
    console.log("User Answers:", userAnswers);
  };

  return (
    <div>
      <div>
        <h3>{data.question}</h3>
        <ul>
          {data.options.map((option, index) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  name="answer"
                  value={index}
                  onChange={() => handleToggle(index)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleSubmit}>Check</button>
    </div>
  );
};

export default MultipleChoice;
