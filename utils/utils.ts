// Looks for open and close parenthesis with anything
// but other set of parenthesis inside
const PARENTHESIS = /\((?<equation>[^\(\)]*)\)/;
// Looks for divide and multiply operation in between two operands
const MULTIPLY_DIVIDE =
  /(?<operand1>-?\d+)\s*(?<operation>[\*\/])\s*(?<operand2>-?\d+)/;
// Looks for exponent sign in between operands
const EXPONENT = /(?<operand1>-?\d+)\s*(?<operation>[\^])\s*(?<operand2>-?\d+)/;
// Looks for plus and minus in between operands
const SUBTRACT_ADD =
  /(?<operand1>-?\d+)\s*(?<operation>[\+-]+)\s*(?<operand2>\d+)/;

export function parse(equation: string): string {
  console.log(equation);
  // Looks and matches parenthesis inside the equation
  if (equation.match(PARENTHESIS)) {
    const subEquation = equation.match(PARENTHESIS)?.groups?.equation;
    if (!subEquation) return "";
    // Takes content from inside of parenthesis and runs recursive function with content within parenthesis
    const result = parse(subEquation);
    // Takes original equation and replaces parenthesis string with a new solution that came from content inside of parenthesis
    const newResult = equation.replace(PARENTHESIS, result);
    return parse(newResult);
    // Looks and matches Sqr expression
    // Same logic as above
  } else if (equation.match(EXPONENT)) {
    const result = handleMath(equation.match(EXPONENT)?.groups); //groups is object that is used inside handleMath()
    const newResult = equation.replace(EXPONENT, result); //
    return parse(newResult);
    // Looks for Multiply/Divide expression blocks
  } else if (equation.match(MULTIPLY_DIVIDE)) {
    const result = handleMath(equation.match(MULTIPLY_DIVIDE)?.groups);
    const newResult = equation.replace(MULTIPLY_DIVIDE, result); // Replaces the fist order of operation either * or / by an answer in a form of one number
    return parse(newResult);
    // Looks for Plus/Minus expression blocks
  } else if (equation.match(SUBTRACT_ADD)) {
    const result = handleMath(equation.match(SUBTRACT_ADD)?.groups); //groups is object which gets destructured inside handleMath()
    const newResult = equation.replace(SUBTRACT_ADD, result);
    return parse(newResult);
  } else {
    return equation;
  }
}

function handleMath(groups: Record<string, string> | undefined): string {
  if (groups === undefined) return "";
  let operand1 = groups["operand1"];
  let operand2 = groups["operand2"];
  let operation = groups["operation"];

  const number1 = parseFloat(operand1);
  const number2 = parseFloat(operand2);

  switch (operation) {
    case "*":
      return (number1 * number2).toString();
    case "/":
      return (number1 / number2).toString();
    case "+":
      return (number1 + number2).toString();
    case "-":
      return (number1 - number2).toString();
    case "--":
      return (number1 + number2).toString();
    case "+-":
      return (number1 - number2).toString();
    case "^":
      return (number1 ** number2).toString();
  }
  return "";
}
