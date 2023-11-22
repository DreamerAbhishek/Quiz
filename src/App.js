import React from "react";
import "./App.css";

function App() {
  const id = localStorage?.getItem("ResumeQues");
  return (
    <>
      <div className="AppCont">
        <h1>Ready For Quiz?</h1>
        <a href={id ? `/${id}` : "/1"}>
          <button className="button">{id ? "Resume" : "Start"}</button>
        </a>
      </div>
    </>
  );
}

export default App;
