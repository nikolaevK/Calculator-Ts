import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import ExpressionButton from "../Buttons/NumberButton";

// Looks for open and close parenthesis with anything
// but other set of parenthesis inside
const PARENTHESIS = /\((?<equation>[^\(\)]*)\)/;
// Looks for divide and multiply operation in between two operands
const MULTIPLY_DIVIDE =
  /(?<operand1>-?\d+)\s*(?<operation>[\*\/])\s*(?<operand2>-?\d+)/;
// Looks for exponent sign in between operands
const EXPONENT = /(?<operand1>\d+)\s*(?<operation>[\^])\s*(?<operand2>-?\d+)/;
// Looks for plus and minus in between operands
const SUBTRACT_ADD =
  /(?<operand1>-?\d+)\s*(?<operation>(?<!e)[\+-]+)\s*(?<operand2>\d+)/;

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");

  function createMathProblem(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = event.target as HTMLButtonElement;
    setInput(input + target.value);
  }

  function parse(equation: string): string {
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        <div className=" flex justify-center mb-1">
          <section className="h-[12rem] w-[24.8rem] flex bg-black flex-col items-end justify-between p-3 break-words break-all">
            <div className="text-white text-4xl">{input}</div>
            {answer && <div className="text-white text-4xl">{answer}</div>}
          </section>
        </div>
        <section className="grid justify-center grid-cols-col4 grid-rows-row5 gap-1">
          <ExpressionButton value="^" createMathProblem={createMathProblem} />
          <button
            className="button"
            onClick={() => setInput(input.slice(0, -1))}
          >
            AC
          </button>
          <button
            className="button"
            onClick={() => {
              setInput("");
              setAnswer("");
            }}
          >
            Del
          </button>
          <ExpressionButton value="/" createMathProblem={createMathProblem} />
          <ExpressionButton value="1" createMathProblem={createMathProblem} />
          <ExpressionButton value="2" createMathProblem={createMathProblem} />
          <ExpressionButton value="3" createMathProblem={createMathProblem} />
          <ExpressionButton value="*" createMathProblem={createMathProblem} />
          <ExpressionButton value="4" createMathProblem={createMathProblem} />
          <ExpressionButton value="5" createMathProblem={createMathProblem} />
          <ExpressionButton value="6" createMathProblem={createMathProblem} />
          <ExpressionButton value="+" createMathProblem={createMathProblem} />
          <ExpressionButton value="7" createMathProblem={createMathProblem} />
          <ExpressionButton value="8" createMathProblem={createMathProblem} />
          <ExpressionButton value="9" createMathProblem={createMathProblem} />
          <ExpressionButton value="-" createMathProblem={createMathProblem} />
          <ExpressionButton value="0" createMathProblem={createMathProblem} />
          <ExpressionButton value="." createMathProblem={createMathProblem} />
          <ExpressionButton value="(" createMathProblem={createMathProblem} />
          <ExpressionButton value=")" createMathProblem={createMathProblem} />
          <button
            className="button col-span-2"
            onClick={() => {
              // Evaluates if Math expression is valid
              const result = parse(input);
              if (isNaN(Number(result))) {
                setAnswer("Invalid Math Expression");
              } else {
                setAnswer(result);
              }
            }}
          >
            =
          </button>
        </section>
      </div>
    </div>
  );
};

export default Home;
