import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function Counter() {

  const [count, setCount] = useState(0);
  const [click, setClick] = useState(0);
  const [cps, setCps] = useState(0);
  const [savedScores, setSavedScores] = useState([]);
  const lastCpsTimeRef = useRef(Date.now());
  function addCount() {
    setCount(c => c + 1);
  }
  function decreaseCount() {
    setCount(c => c - 1)
  }
  function resetCount() {
    setCount(c => c = 0)
    setCps(0);
    setClick(0);
    lastCpsTimeRef.current = Date.now(); // Reset the timing reference
  }

  function handleClickPerSecond() {
    setClick(c => c + 1);
    const now = Date.now();
    const elapsedTime = (now - lastCpsTimeRef.current) / 1000; // in seconds

    if (elapsedTime >= 1) {
      setCps(click); // Update CPS based on clicks since  last reset
      lastCpsTimeRef.current = now; // Update  last CPS calculation time
      setClick(0); // Reset clicks 
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const elapsedTime = (now - lastCpsTimeRef.current) / 1000; // in seconds
      if (elapsedTime >= 1) {
        setCps(click); // Update CPS based on clicks since the last reset
        lastCpsTimeRef.current = now; // Update the last CPS calculation time
        setClick(0); // Reset clicks after calculating CPS
      }
    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);



  /* Store value within an save Button */

  function saveScores() {
 
  setSavedScores([...savedScores, count]);
  }


  function resetScore() {
    setSavedScores([null]);
  }

  return (
    <>
      <div className='body-app'>
        <div className='counter-body'>
          <p className='counter-score'>{count}</p>
          <button className='addBtn' onClick={() => {
            addCount();
            handleClickPerSecond();
          }}>Increase</button>
          <button className='decreaseBtn' onClick={() => {
            decreaseCount();
            handleClickPerSecond();
          }}>Decrease</button>
          <button className='resetBtn' onClick={resetCount}>Reset</button>
          <button className='saveBtn' onClick={saveScores}>Save Score</button>

        </div>
        <p className='Cps-score'>Cps: {cps} </p>
        <ul className='scoreboardList'> 
          <button onClick={resetScore}>Reset Score</button>
          <em>Scoreboard</em>
          {savedScores.map((savedScore, index) => {
            return <li key={index}>{savedScore}</li>
          })}
        </ul>
      </div>
    </>
  )
}

export default Counter
