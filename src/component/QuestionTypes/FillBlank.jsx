import React from "react";

const FillBlank = ({ data }) => {
  const [userAnswers, setUserAnswers] = React.useState("");

  const handleInputChange = (value) => {
    setUserAnswers(value);
  };

  const handleSubmit = () => {
    console.log("User Answer:", userAnswers);
  };

  return (
    <div>
      {" "}
      <div>
        <h3>{data.question}</h3>
        <label>
          Fill in the blank:
          <input
            type="text"
            onChange={(e) => handleInputChange(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Check</button>
    </div>
  );
};

export default FillBlank;
