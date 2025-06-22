import React,{useState} from 'react';
import './App.css';

function App() {
const [input , setInput] = useState('');
const [output , setOutput] = useState('');
const handleValue = (value)=>{
  setInput((prev)=>prev+value);
}
const handleClear = ()=>{
  setInput('');
  setOutput('');
}
const handleEqual=()=>{
  const result = evaluateResult(input);
  setOutput(result);
}
const evaluateResult = (expr) =>{
const tokens = expr.match(/(\d+|\+|\-|\*|\/)/g); // Split numbers and operators

  if (!tokens || isNaN(tokens[0])) return 'Error';

  let result = Number(tokens[0]);

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const nextNum = Number(tokens[i + 1]);

    if (isNaN(nextNum)) return 'Error';

    switch (operator) {
      case '+': result += nextNum; break;
      case '-': result -= nextNum; break;
      case '*': result *= nextNum; break;
      case '/': result /= nextNum; break;
      default: return 'Error';
    }
  }

  return result;
}
  return (
    <div className="App">
       <h1>React Calculator</h1>
       <div className='calc'>
        <input className='input' value={input} readOnly></input>
        <p className='output'>{output}</p>
        <div className='cal_btns'>
        <button className='btn' onClick={()=>handleValue('1')}>1</button>
        <button className='btn' onClick={()=>handleValue('2')}>2</button>
        <button className='btn' onClick={()=>handleValue('3')}>3</button>
        <button className='btn' onClick={()=>handleValue('4')}>4</button>
        <button className='btn' onClick={()=>handleValue('5')}>5</button>
        <button className='btn' onClick={()=>handleValue('6')}>6</button>
        <button className='btn' onClick={()=>handleValue('7')}>7</button>
        <button className='btn' onClick={()=>handleValue('8')}>8</button>
        <button className='btn' onClick={()=>handleValue('9')}>9</button>
        <button className='btn' onClick={()=>handleValue('0')}>0</button>
        <button className='btn' onClick={()=>handleValue('+')}>+</button>
        <button className='btn' onClick={()=>handleValue('-')}>-</button>
        <button className='btn' onClick={()=>handleValue('x')}>x</button>
        <button className='btn' onClick={()=>handleValue('/')}>/</button>
        <button className='btn' onClick={()=>handleClear()}>C</button>
        <button className='btn' onClick={()=>handleEqual()}>=</button>
        </div>
       </div>
    </div>
  );
}

export default App;
