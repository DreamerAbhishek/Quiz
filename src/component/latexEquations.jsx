import React from "react";
import MathJax from "react-mathjax";

const LatexEquations = () => {
  //   useEffect(() => {
  //     // Trigger a MathJax typeset when the component mounts
  //     // window.MathJax.typeset();
  //   }, []);

  const latexEquation = "c = \\sqrt{a^2 + b^2}";

  return (
    <div>
      <p>This is a LaTeX equation:</p>
      <MathJax.Provider>
        <MathJax.Node formula={latexEquation} />
      </MathJax.Provider>
    </div>
  );
};

export default LatexEquations;
