import React, { useState, useEffect, useRef } from "react";
import { Clock } from "lucide-react";  // ⏰ clock icon

function Stopclock() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const formatTimer = () => {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      {/* Stopwatch card */}
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center md:px-15 md:py-15">
        {/* Icon + Title */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <Clock size={40} className="text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Stopwatch</h1>
        </div>

        {/* Timer Display */}
        <div className="text-4xl sm:text-5xl font-mono font-semibold text-gray-900 mb-8">
          {formatTimer()}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={startTimer}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            Start
          </button>
          <button
            onClick={stopTimer}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            Stop
          </button>
          <button
            onClick={resetTimer}
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow-md transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stopclock;



