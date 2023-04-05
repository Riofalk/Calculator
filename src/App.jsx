import "./App.css";
import { useState } from "react";
import { buttons } from "./buttons.js";

function App() {
  const [displayValue, setDisplayValue] = useState({
    sign: "",
    number: 0,
    result: 0,
  });

  const [displayResult, setDisplayResult] = useState(false);

  const resetClickHandler = () => {
    setDisplayValue({
      sign: "",
      number: 0,
      result: 0,
    });
  };

  const invertClickHandler = () => {
    if (!displayValue.result) return;
    let result = displayResult;
    if (result)
      setDisplayValue({ ...displayValue, result: displayValue.result * -1 });
    else setDisplayValue({ ...displayValue, number: displayValue.number * -1 });
  };

  const signClickHandler = (e) => {
    if (displayValue.result === "Error") return;
    let sign = e.target.innerHTML;
    sign === "×"
      ? (sign = "*")
      : sign === "÷"
      ? (sign = "/")
      : (sign = e.target.innerHTML);
    if (sign === displayValue.sign || displayValue.number === 0) return;
    if (displayValue.result === 0)
      setDisplayValue({ result: displayValue.number, number: 0, sign: sign });
    else setDisplayValue({ ...displayValue, number: 0, sign: sign });
  };

  const commaClickHandler = () => {
    if ([...displayValue.number].includes(".")) return;
    setDisplayValue({
      ...displayValue,
      number: displayValue.number + ".",
    });
  };

  const numClickHandler = (e) => {
    if (displayValue.result === "Error") return;
    let result = displayResult;
    setDisplayResult(false);
    result
      ? setDisplayValue({ ...displayValue, number: e.target.innerHTML })
      : displayValue.number === 0
      ? setDisplayValue({ ...displayValue, number: e.target.innerHTML })
      : setDisplayValue({
          ...displayValue,
          number: displayValue.number + e.target.innerHTML,
        });
  };

  const equalsClickHandler = () => {
    if (displayValue.result === "Error") return;
    if (!displayValue.sign) return;
    setDisplayResult(true);
    let result = mathematicalOperations[displayValue.sign](
      parseFloat(displayValue.result),
      parseFloat(displayValue.number)
    );
    setDisplayValue({
      ...displayValue,
      result: result,
    });
  };

  const mathematicalOperations = {
    "+": function (x, y) {
      return (x + y).toFixed(2);
    },
    "-": function (x, y) {
      return (x - y).toFixed(2);
    },
    "/": function (x, y) {
      if (!y) return "Error";
      return (x / y).toFixed(2);
    },
    "*": function (x, y) {
      return (x * y).toFixed(2);
    },
    "%": function (x, y) {
      return ((x * y)/100).toFixed(2);
    },
  };

  return (
    <div className="wrapper">
      <div className="calculator">
        <div className="display">
          {displayResult ? displayValue.result : displayValue.number}
        </div>
        <div className="buttons">
          {buttons.map((element, index) => {
            return (
              <>
                <button
                  key={index}
                  onClick={
                    element.value === "C"
                      ? resetClickHandler
                      : element.value === "+/-"
                      ? invertClickHandler
                      : element.value === "="
                      ? equalsClickHandler
                      : element.value === "/" ||
                        element.value === "x" ||
                        element.value === "-" ||
                        element.value === "+" ||
                        element.value === "%"
                      ? signClickHandler
                      : element.value === "."
                      ? commaClickHandler
                      : numClickHandler
                  }
                  className={element.label === "0" ? "zero" : ""}
                >
                  {element.label}
                </button>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
