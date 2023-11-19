const katex = require("katex");

const LaTeXEquation = ({ equation }) => {
  return (
    <span
      dangerouslySetInnerHTML={{ __html: katex.renderToString(equation) }}
    />
  );
};

export default LaTeXEquation;
