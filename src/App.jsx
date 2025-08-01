import React, { useState } from "react";

const BUTTONS = [
  "7",
  "8",
  "9",
  "+",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "*",
  "C",
  "0",
  "=",
  "/",
];

function App() {
  const [expression, setExpression] = useState("");
  const [output, setOutput] = useState("");

  const handleClick = (value) => {
    if (value === "C") {
      setExpression("");
      setOutput("");
      return;
    }

    if (value === "=") {
      if (expression.trim() === "") {
        setOutput("Error");
        return;
      }
      try {
        let result = Function(`'use strict';return (${expression})`)();

        if (/\/0(?![0-9])/.test(expression)) {
          if (/([^0-9])0\/0([^0-9])?/.test(" " + expression + " ")) {
            result = NaN;
          } else {
            result = Infinity;
          }
        }
        setOutput(result.toString());
      } catch (err) {
        setOutput("Error");
      }
      return;
    }

    if ("+-*/".includes(value)) {
      if (
        expression === "" ||
        "+-*/".includes(expression[expression.length - 1])
      ) {
        if (value === "-" && expression === "") {
          setExpression("-");
        }
        return;
      }
    }

    setExpression(expression + value);
  };

  return (
    <div
      style={{ textAlign: "center", marginTop: "30px", fontFamily: "serif" }}
    >
      <h1 style={{ fontWeight: "bold" }}>React Calculator</h1>
      <input
      type="text"
        value={expression}
        readOnly
        style={{ textAlign: "left", fontSize: 16, marginBottom: 10 }}
      />
      <div style={{ marginBottom: 12, fontSize: 24 }}>{output}</div>
      <div
        style={{
          width: 280,
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {BUTTONS.map((btn, idx) => (
          <button
            key={btn}
            style={{
              width: 60,
              height: 60,
              fontSize: 24,
              margin: 2,
              borderRadius: 12,
              boxShadow: "1px 2px 5px #b2b2b2",
            }}
            onClick={() => handleClick(btn)}
           
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
