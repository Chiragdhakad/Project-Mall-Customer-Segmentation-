import React, { useReducer, useEffect, useState } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case "update":
      return { ...state, [action.field]: action.value };
    case "reset":
      return { work: 25, break: 5 }; 
    default:
      return state;
  }
}

function Timer() {
  const [state, dispatch] = useReducer(reducer, { work: 25, break: 5 }); 
  const [timeLeft, setTimeLeft] = useState(25 * 60); 
  const [isRunning, setIsRunning] = useState(false);

  
  function startTimer() {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

 
  function stopTimer() {
    setIsRunning(false);
  };

  
  function resetTimer() {
    setIsRunning(false);
    setTimeLeft(25 * 60); 
    dispatch({ type: "reset" }); 
  };

  
  function setTimer() {
    setIsRunning(false);
    setTimeLeft(state.work * 60); 
  };

  
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval); 
    }

    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      alert("Time's up!");
    }
  }, [isRunning, timeLeft]);

 
  function formatTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, 0)}`;
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "sans-serif" }}>
      <h1>{formatTime(timeLeft)}</h1>
      <h2>WORK - TIME</h2>
      <div>
        <button onClick={startTimer} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          value={state.work} 
          placeholder="Enter Working Duration"
          onChange={(e) =>
            dispatch({ type: "update", field: "work", value: Number(e.target.value) })
          }
        />
        <input
          type="number"
          value={state.break} 
          placeholder="Enter Break Duration"
          onChange={(e) =>
            dispatch({ type: "update", field: "break", value: Number(e.target.value) })
          }
        />
        <button onClick={setTimer}>Set</button>
      </div>
    </div>
  );
}

export default Timer;