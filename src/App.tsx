import React, { useState } from "react";
import "./App.css";

enum Operator {
  Addition = "+",
  Subtraction = "-",
  Multiplication = "*",
  Division = "/",
}

const calculate = (operator: Operator, a: number, b: number): number => {
  switch (operator) {
    case Operator.Addition:
      return a + b;
    case Operator.Subtraction:
      return a - b;
    case Operator.Multiplication:
      return a * b;
    case Operator.Division:
      return a / b;
    default:
      throw new Error("Invalid operator");
  }
};

const getPriority = (operator: Operator): number => {
  switch (operator) {
    case Operator.Addition:
    case Operator.Subtraction:
      return 1;
    case Operator.Multiplication:
    case Operator.Division:
      return 2;
    default:
      return 0;
  }
};

const App: React.FC = () => {
  const [currentExpression, setCurrentExpression] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  const handleInput = (value: string): void => {
    setCurrentExpression((prevExpression) => prevExpression + value);
  };

  const clearDisplay = (): void => {
    setCurrentExpression("");
  };

  const resolveExpression = (expression: string): string => {
    const numbers: number[] = [];
    const operators: Operator[] = [];

    let currentNumber = '';
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      if (char === " ") continue;

      const isNumeric = !isNaN(parseInt(char)) || char === '.';
      if (isNumeric) {
        currentNumber += char;
        continue;
      }
      
      if (currentNumber) {
        numbers.push(parseFloat(currentNumber));
        currentNumber = '';
        continue;
      }

      if (char === "(") {
        operators.push(Operator.Addition);
        continue;
      }
      
      if (Object.values(Operator).includes(char as Operator)) {
        while (operators.length > 0 && getPriority(char as Operator) <= getPriority(operators[operators.length - 1])) {
          const num2 = numbers.pop()!;
          const num1 = numbers.pop()!;
          const op = operators.pop()!;
          numbers.push(calculate(op, num1, num2));
        }
        operators.push(char as Operator);
        continue;
      }
      
      if (char === ")") {
        while (operators[operators.length - 1] !== Operator.Addition) {
          const num2 = numbers.pop()!;
          const num1 = numbers.pop()!;
          const op = operators.pop()!;
          numbers.push(calculate(op, num1, num2));
        }
        operators.pop();
        continue;
      }
    }

    while (operators.length > 0) {
      const num2 = numbers.pop()!;
      const num1 = numbers.pop()!;
      const op = operators.pop()!;
      numbers.push(calculate(op, num1, num2));
    }

    const result = numbers.pop();
    return result !== undefined && !isNaN(result) ? result.toString() : "Error";
  };

  const handleCalculate = () => {
    if (currentExpression === "") return;
    const result = resolveExpression(currentExpression);
    setHistory([...history, `${currentExpression} = ${result}`]);
    clearDisplay();
  };

  return (
    <>
      <div className="calculator">
        <input
          type="text"
          value={currentExpression}
          onChange={(e) => setCurrentExpression(e.target.value)}
          className="display"
        />
        <div className="buttons">
          {[...Array(10).keys(), Operator.Addition, Operator.Subtraction, Operator.Multiplication, Operator.Division, ".", "(", ")"].map((key) => (
            <button key={key} onClick={() => handleInput(key.toString())}>
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
      <div className="history">
        <h2>Histórico</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
