import React from "react";

type Props = {
  value: string;
  createMathProblem: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const ExpressionButton = ({ value, createMathProblem }: Props) => {
  return (
    <button
      className="button"
      value={value}
      onClick={(event) => createMathProblem(event)}
    >
      {value}
    </button>
  );
};

export default ExpressionButton;
