import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function Counter() {
 
  const [count, setCount] = useState(0);
  
  function addCount() {
    setCount(c => c + 1 );
  }
  function decreaseCount() {
    setCount(c => c - 1)
  }
  function resetCount() {
    setCount(c => c = 0)
  }

  return (
    <>
   <div className='body-app'>
    <div className='counter-body'>
      <p className='counter-score'>{count}</p>
      <button onClick={addCount}>Increase</button>
      <button onClick={decreaseCount}>Decrease</button>
      <button onClick={resetCount}>Reset</button>
    </div>
   </div>
    </>
  )
}

export default Counter
