import React, {useState, useEffect, useRef} from 'react';

function Stopclock(){

  const [isRunning, setIsRunning] = useState(false);
  const [elapsedtime, setelapsedtime] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {

   if(isRunning){
       intervalRef.current = setInterval(() => {
           setelapsedtime(Date.now() - startTimeRef.current);
       },10)
   }

   return () => {
       clearInterval(intervalRef.current);
   }

  }, [isRunning]);

  const startTimer = () => {
     setIsRunning(true);
     startTimeRef.current = Date.now() - elapsedtime;
  }

   const stopTimer = () => {
    setIsRunning(false);
  }

   const resetTimer = () => {
    setelapsedtime(0);
     setIsRunning(false);
  }

   const formatTimer = () => {
    let hours = Math.floor(elapsedtime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedtime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedtime / 1000) % 60);
    let milliseconds = Math.floor((elapsedtime % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  }

return(
<>

<div className = "stopwatch">
    <h1>Stopwatch</h1>
    <div>
        <span>{formatTimer()}</span>
    </div>
    <div>
        <button className = "start" onClick = {startTimer}>Start</button>
        <button className = "stop" onClick = {stopTimer}>Stop</button>
        <button className = "reset" onClick = {resetTimer}>Reset</button>
    </div>
</div>

</>

);

}

export default Stopclock;