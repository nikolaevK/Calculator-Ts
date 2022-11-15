import React from "react";

type Props = {
  value: string;
  updateExpression: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

const ExpressionButton = ({ value, updateExpression }: Props) => {
  return (
    <button
      className="button"
      value={value}
      onClick={(event) => updateExpression(event)}
    >
      {value}
    </button>
  );
};

export default ExpressionButton;
