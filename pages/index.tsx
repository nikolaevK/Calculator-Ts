import type { NextPage } from "next";
import Head from "next/head";
import { parse } from "../utils/utils";
import { useState } from "react";
import ExpressionButton from "../Buttons/NumberButton";

const Home: NextPage = () => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");

  function updateExpression(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = event.target as HTMLButtonElement;
    setInput(input + target.value);
  }

  function onEqualsClick() {
    // Evaluates if Math expression is valid
    const result = parse(input);
    if (isNaN(Number(result))) {
      setAnswer("Invalid Math Expression");
    } else {
      setAnswer(result);
    }
  }

  return (
    <>
      <Head>
        <title>Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col mt-4 mb-4 items-center justify-center py-2">
        <div className="flex flex-col mx-[40rem]">
          <div className=" flex justify-center mb-1">
            <section className="h-[12rem] w-[20.8rem] flex bg-black flex-col items-end justify-between p-3 break-words break-all">
              <div className="text-white text-4xl">{input}</div>
              {answer && <div className="text-white text-4xl">{answer}</div>}
            </section>
          </div>
          <section className="grid justify-center grid-cols-col4 grid-rows-row5 gap-1">
            <ExpressionButton value="^" updateExpression={updateExpression} />
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
            <ExpressionButton value="/" updateExpression={updateExpression} />
            <ExpressionButton value="1" updateExpression={updateExpression} />
            <ExpressionButton value="2" updateExpression={updateExpression} />
            <ExpressionButton value="3" updateExpression={updateExpression} />
            <ExpressionButton value="*" updateExpression={updateExpression} />
            <ExpressionButton value="4" updateExpression={updateExpression} />
            <ExpressionButton value="5" updateExpression={updateExpression} />
            <ExpressionButton value="6" updateExpression={updateExpression} />
            <ExpressionButton value="+" updateExpression={updateExpression} />
            <ExpressionButton value="7" updateExpression={updateExpression} />
            <ExpressionButton value="8" updateExpression={updateExpression} />
            <ExpressionButton value="9" updateExpression={updateExpression} />
            <ExpressionButton value="-" updateExpression={updateExpression} />
            <ExpressionButton value="0" updateExpression={updateExpression} />
            <ExpressionButton value="." updateExpression={updateExpression} />
            <ExpressionButton value="(" updateExpression={updateExpression} />
            <ExpressionButton value=")" updateExpression={updateExpression} />
            <button className="button col-span-2" onClick={onEqualsClick}>
              =
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
