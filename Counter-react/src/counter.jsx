import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ProgressBar from './progressbar.jsx'


function Counter() {

  const [count, setCount] = useState(0);
  const [click, setClick] = useState(0);
  const [cps, setCps] = useState(0);
  const [savedScores, setSavedScores] = useState([]);
  const [customnum, setCustomnum] = useState(0);
  const lastCpsTimeRef = useRef(Date.now());
  const [soundStatus, setSoundStatus] = useState(true);

  const incrementSound = new Audio('src/assets/ClickSound.mp3');

  function addCount() {
    setCount(c => c + 1);
    
    achievementSystem();
    if(soundStatus) {
      incrementSound.play();
      
    } 
  }
  function decreaseCount() {
    setCount(c => c - 1)
    if(soundStatus) {
      incrementSound.play();
    } 
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


  function customInc(event) {
    const value = Number(event.target.value); // Convert input value to a number
    setCustomnum(value);

  }

  function handleCustomIncrement() {
    setCount(c => c + customnum); // Add the custom number to count when the button is clicked
    achievementSystem();
    if(soundStatus) {
      incrementSound.play();
    } 
  }

  function handleCustomDecrement(index) {
    setCount(c => c - customnum); // Subtract the custom number from count when the button is clicked
    if(soundStatus) {
      incrementSound.play();
    } 
  }

  function getColor(count) {

    if (count > 0) {
      return 'green';
    }
    else if (count === 0) {
      return 'black';
    }
    else {
      return 'red';
    }
  }

 

  /* HERE I WILL ADD KEYBOARD SHORTCUTS */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        addCount(); // Increment by 1
        setClick(c => c + 1); // Increment click count for CPS
      } else if (event.key === 'ArrowDown') {
        decreaseCount(); // Decrement by 1
        setClick(c => c + 1); // Increment click count for CPS
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Clean up
    };
  }, []);



  /* Here I will add an achievement System */
  const FirstAchievement = 50;
  const SecondAchievement = 100;
  const ThirdAchievement = 150;
  const FourthAchievement = 550;
  const FifthAchievement = 1000;

    function achievementSystem() {
     switch (count) {
      case  50:
        alert(`Congrats! You've reached ${FirstAchievement}`)
        break;
      case 100:
        alert(`Congrats! You've reached ${SecondAchievement}`)
        break;
        case 150:
          alert(`Congrats! You've reached ${ThirdAchievement}`)
          break;
          case 550:
            alert(`Congrats! You've reached ${FourthAchievement}`)
            break;
            case 1000:
              alert(`Congrats! You've reached ${FifthAchievement}`)
     }
    }

    
    /* Here i will add a function to deactivate/activate the Sound */

    function SoundDeactivate() {
      setSoundStatus(false);
    }
    function SoundActivate() {
      setSoundStatus(true);
    }


  return (
    <>
      <div className='body-app'>
        <div className='counter-body'>
          <p style={{ color: getColor(count) }}
            className='counter-score'>{count}</p>
          <button className='addBtn' onClick={() => {
            addCount();
            handleClickPerSecond();
          }}>Increase</button>
          <button onClick={handleCustomIncrement} className='CaddBtn'>
            Custom Inc.
          </button>
          <input className='CustomIncInput' value={customnum} onChange={(customInc)} type='number' placeholder='5'></input>

          <button className='decreaseBtn' onClick={() => {
            decreaseCount();
            handleClickPerSecond();
          }}>Decrease</button>
          <button className='CdecBtn' onClick={handleCustomDecrement}>
            Custom Dec.
          </button>
          <input className='CustomDecInput' type="number" value={customnum} onChange={(customInc)} placeholder='5' />

          <button className='resetBtn' onClick={resetCount}>Reset</button>
          <button className='saveBtn' onClick={saveScores}>Save Score</button>

        </div>
        <p style={{ color: getColor(count) }} className='Cps-score'>Cps: {cps} </p>
        <ul className='scoreboardList'>
          <button onClick={resetScore}>Reset Score</button>
          <em>Scoreboard</em>
          {savedScores.map((savedScore, index) => {
            return <li key={index}>{savedScore}</li>
          })}
        </ul>
      </div>
      <div >
        <button className='SoundBtn' 
        style={{ backgroundColor: soundStatus ? 'green' : 'red' }}
        >Sound</button>
        <div className='Dropdown-menu'>
          <button className='SoundOn' onClick={SoundActivate}>On</button>
          <button className='SoundOff' onClick={SoundDeactivate}>Off</button>
        </div>
      </div>
      <ProgressBar value={count} max={100}></ProgressBar>
    </>
  )
}

export default Counter
