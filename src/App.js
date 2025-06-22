import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleValue = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleEqual = () => {
    if (!input || /[\+\-\*\/]$/.test(input)) {
      setOutput('Error');
      return;
    }
    const result = evaluateResult(input);
    setOutput(result);
  };

  const evaluateResult = (expr) => {
    // Replace 'x' with '*'
    expr = expr.replace(/x/g, '*');

    try {
      // Tokenize the input: numbers and operators
      const tokens = expr.match(/(\d+|\+|\-|\*|\/)/g);
      if (!tokens) return 'Error';

      // First handle * and /
      let newTokens = [];
      let i = 0;
      while (i < tokens.length) {
        if (tokens[i] === '*' || tokens[i] === '/') {
          const prev = Number(newTokens.pop());
          const next = Number(tokens[i + 1]);
          if (tokens[i] === '/') {
            newTokens.push(prev / next);
          } else {
            newTokens.push(prev * next);
          }
          i += 2;
        } else {
          newTokens.push(tokens[i]);
          i++;
        }
      }

      // Then handle + and -
      let result = Number(newTokens[0]);
      for (let j = 1; j < newTokens.length; j += 2) {
        const operator = newTokens[j];
        const nextNum = Number(newTokens[j + 1]);
        if (operator === '+') result += nextNum;
        else if (operator === '-') result -= nextNum;
        else return 'Error';
      }

      if (isNaN(result)) return 'NaN';
      if (!isFinite(result)) return 'Infinity';
      return result;
    } catch (err) {
      return 'Error';
    }
  };

  return (
    <div className="App">
      <h1>React Calculator</h1>
      <div className='calc'>
        <input className='input' type="text" value={input} readOnly />
        <div className='output'>{output}</div>

        <div className='cal_btns'>
          <button className='btn' onClick={() => handleValue('1')}>1</button>
          <button className='btn' onClick={() => handleValue('2')}>2</button>
          <button className='btn' onClick={() => handleValue('3')}>3</button>
          <button className='btn' onClick={() => handleValue('4')}>4</button>
          <button className='btn' onClick={() => handleValue('5')}>5</button>
          <button className='btn' onClick={() => handleValue('6')}>6</button>
          <button className='btn' onClick={() => handleValue('7')}>7</button>
          <button className='btn' onClick={() => handleValue('8')}>8</button>
          <button className='btn' onClick={() => handleValue('9')}>9</button>
          <button className='btn' onClick={() => handleValue('0')}>0</button>
          <button className='btn' onClick={() => handleValue('+')}>+</button>
          <button className='btn' onClick={() => handleValue('-')}>-</button>
          <button className='btn' onClick={() => handleValue('*')}>*</button>
          <button className='btn' onClick={() => handleValue('/')}>/</button>
          <button className='btn' onClick={handleClear}>C</button>
          <button className='btn' onClick={handleEqual}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
