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
  const [currentExpression, setCurrentExpression] = useState("");
  const [history, setHistory] = useState<string[]>([]);

  const digit = (value: string): void => {
    setExpression((prevExpression) => prevExpression + value);
  };

  const clearDisplay = (): void => {
    setExpression("");
  };

  const resolve = (expression: string) => {
    const numbers: number[] = [];
    const operators: string[] = [];
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      if (char === " ") continue;

      const num = Number(char);
      if (!isNaN(num)) {
        numbers.push(num);
        continue;
      }

      if (char === "(") {
        operators.push(char);
        continue;
      }

      if (["+", "-", "*", "/"].includes(char)) {
        if (operators.length == 0) {
          operators.push(char);
          continue;
        }

        while (operators.length > 0 && priority(char) <= priority(operators[operators.length - 1])) {
          const num1 = numbers.pop()!;
          const num2 = numbers.pop()!;
          const operator = operators.pop()!;
          numbers.push(calculate(operator, num1, num2));
        }
      }

      if(char === ")"){
        while(operators[operators.length - 1] !== "("){
          const num1 = numbers.pop()!;
          const num2 = numbers.pop()!;
          const operator = operators.pop()!;
          numbers.push(calculate(operator, num1, num2));
        }
        operators.pop();
      }

      while (operators.length > 0) {
        const num1 = numbers.pop()!;
        const num2 = numbers.pop()!;
        const operator = operators.pop()!;
        numbers.push(calculate(operator, num1, num2));
      }

      const result = numbers.pop();
      return result !== undefined ? result.toString() : "Error";
    }
  };

  const handleCalculate = () => {
    const result = resolve(expression);
    setCurrentExpression(result);
    setHistory([...history, `${expression} = ${result}`]);
  }

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
          <button className="equal" onClick={handleCalculate}>
            Calcular
          </button>
        </div>
      </div>
    </>
  );
};
export default App;
