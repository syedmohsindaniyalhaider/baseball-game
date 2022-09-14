import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(["5", "-2", "4", "C", "D", "9", "+", "+"]);
  const [finalResult, setFinalResult] = useState(0);
  const [addItem, setAddItem] = useState("");

  const baseBallRules = useCallback(() => {
    let result = [];
    let itemToSum = 0;
    let resultLength = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === "C") {
        result.pop();
        resultLength = result.length;
      } else if (data[i] === "D") {
        let lastNumber = result[resultLength - 1];
        let doubleNumber = 2 * lastNumber;
        result.push(doubleNumber);
        resultLength = result.length;
      } else if (data[i] === "+") {
        itemToSum = result
          .slice(resultLength - 2, resultLength)
          .reduce((a, b) => +a + +b);
        result.push(itemToSum);
        resultLength = result.length;
      } else {
        result.push(+data[i]);
        resultLength = result.length;
      }
    }
    setFinalResult(result.reduce((a, b) => a + b));
  }, [data]);

  const onClickHandler = () => {
    setData((prevData) => [...prevData, addItem.toUpperCase()]);
    setAddItem("");
  };

  useEffect(() => {
    baseBallRules();
  }, [baseBallRules]);

  return (
    <div className="app">
      <h2>Baseball Game.</h2>
      <div className="list">
        <strong>Rules:</strong>
        <ol className="mb">
          <li className="mb">
            An integer x - Record a new score that is the sum of the previous
            two scores, is guaranteed there will always be two previous scores
          </li>
          <li className="mb">
            “+” . Record a new score that is double the previous score. It is
            guaranteed there will always be a previous score.
          </li>
          <li className="mb">
            “D” Record a new score that is double the previous score. It is
            guaranteed there will always be a previous score.
          </li>
          <li className="mb">
            “C” - Invalidate the previous score, removing it from the record. It
            is guaranteed there will always be a previous score.
          </li>
        </ol>
      </div>
      <div>
        <p>
          <strong>Add Item to Array</strong>
        </p>
        <div>
          <input
            value={addItem}
            className="input"
            onChange={(e) => setAddItem(e.target.value)}
          />
        </div>
        <button type="button" className="btn mb" onClick={onClickHandler}>
          Add
        </button>
      </div>
      <div style={{ color: "#c0392b" }}>
        [
        {data.map((ele) => (
          <>{` "${ele}" `}</>
        ))}
        ]
      </div>
      <div>{finalResult}</div>
    </div>
  );
}

export default App;
