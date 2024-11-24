import React, { useState } from 'react';
import './App.css';

function App() {
  const [screenContent, setScreenContent] = useState('0');

  const append = (value) => {
    setScreenContent((prev) =>
      prev === '0' && !isNaN(value) ? value : prev + value
    );
  };

  const clearScreen = () => setScreenContent('0');

  const deleteLast = () => {
    setScreenContent((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const calculate = () => {
    try {
      // Replace '^' with `Math.pow` syntax
      const sanitizedExpression = screenContent.replace(/(\d+)\^(\d+)/g, (_, base, exp) =>
        `Math.pow(${base},${exp})`
      );

      const result = Function(`'use strict'; return (${sanitizedExpression})`)();
      setScreenContent(result.toString());
    } catch {
      setScreenContent('Error');
    }
  };

  return (
    <div className="calculator">
      <h1>Calculator</h1>
      <div className="screen">{screenContent}</div>
      <div className="buttons">
        {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '.', '0', '/', '%', '^'].map((btn) => (
          <button key={btn} onClick={() => append(btn)} aria-label={`Button ${btn}`}>
            {btn}
          </button>
        ))}
        <button onClick={clearScreen}>C</button>
        <button onClick={deleteLast}>D</button>
        <div className="equals">
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
