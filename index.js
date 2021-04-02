import { useState } from "react";
import {
  curryN,
  add,
  multiply,
  subtract,
  divide,
  compose,
  modulo,
  pipe
} from "ramda";
import "./styles.css";

const operations = Object.freeze({
  add,
  multiply,
  subtract,
  divide
});

const mapReducer = (mapper) => (step) => (acc, el, index, arr) =>
  step(acc, mapper(el, index, arr));

const filterReducer = (predicate) => (step) => (acc, el, index, arr) =>
  predicate(el, index, arr) ? step(acc, el) : acc;

const isEven = (x) => modulo(x, 2) === 0;

const isEvenAndMult = compose(
  filterReducer(isEven),
  mapReducer((number) => number * 2)
);

export default function App() {
  const [result, setResult] = useState(0);
  const [numbers, setNumbers] = useState({ num1: 0, num2: 0 });

  const handleInputNumber = (evt) => {
    const {
      target: { value, name }
    } = evt;

    setNumbers({ ...numbers, [name]: value });
  };

  const calcResult = curryN(2, (operation) => {
    const calc = compose(Number, operations[operation]);
    const setCalcResult = compose(setResult, calc);

    const { num1, num2 } = numbers;

    setCalcResult(num1, num2);
  });

  return (
    <>
      <div className="App">
        <input onChange={handleInputNumber} name="num1" value={numbers.num1} />
        <button onClick={calcResult("add")}>+</button>
        <button onClick={calcResult("subtract")}>-</button>
        <button onClick={calcResult("multiply")}>*</button>
        <button onClick={calcResult("divide")}>/</button>
        <input onChange={handleInputNumber} name="num2" value={numbers.num2} />
        <h1>Result: {result}</h1>
      </div>
      <ul>
        {[1, 2, 3, 45, 6].reduce(
          isEvenAndMult((acc, el) => acc + el),
          0
        )}
      </ul>
    </>
  );
}
//la extraño
