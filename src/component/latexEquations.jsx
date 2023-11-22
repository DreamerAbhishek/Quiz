import React from "react";
import MathJax from "react-mathjax";
// import "../App.css";

const LatexEquations = ({ latexEquation }) => {
  return (
    <MathJax.Provider>
      <MathJax.Node formula={latexEquation} />
    </MathJax.Provider>
  );
};

export default LatexEquations;
