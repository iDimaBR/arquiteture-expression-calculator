import React, { useState } from "react";
import "./App.css";

const calculate = (operator: string, a: number, b: number): number => {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    default:
      return a / b;
  }
};

const priority = (operator: string): number => {
  switch (operator) {
    case "(":
      return 0;
    case "+":
    case "-":
      return 1;
    default:
      return 2;
  }
};

const App = () => {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  const digit = (value: string): void => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const clearDisplay = (): void => {
    setExpression("");
  };

  const resolve = (expression: string): void => {
    const numbers: number[] = [];
    const operators: string[] = [];
     // TO DO
    }
  };

  return (
    <>
      <div className="calculator">
        <input type="text" value={expression} className="display" />
        <div className="buttons">
          {[...Array(10).keys(), "+", "-", "*", "/", ".", "(", ")"].map((key) => (
            <button key={key} onClick={() => digit(key.toString())}>
              {key}
            </button>
          ))}
          <button className="clear" onClick={clearDisplay}>
            Limpar
          </button>
          <button className="equal" onClick={resolve}>
            Calcular
          </button>
        </div>
      </div>
    </>
  );
};
export default App;
