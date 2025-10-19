import { useState, useEffect } from 'react';
import './App.css';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10);
    }
    
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = ms % 100;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-card">
        <h1 className="stopwatch-title">⏱️ Stopwatch</h1>
        
        <div className="time-display">
          <div className="time-value">{formatTime(time)}</div>
          <p className="time-format">MM:SS.MS</p>
        </div>

        <div className="button-container">
          <button
            onClick={handleStartStop}
            className={`btn btn-start-stop ${isRunning ? 'running' : 'stopped'}`}
          >
            {isRunning ? '⏸ Stop' : '▶ Start'}
          </button>
          
          <button
            onClick={handleReset}
            className="btn btn-reset"
          >
            🔄 Reset
          </button>
        </div>

        <div className="status-bar">
          <span className={`status-indicator ${isRunning ? 'active' : 'inactive'}`}></span>
          <span className="status-text">
            {isRunning ? 'Timer is running...' : 'Timer stopped'}
          </span>
        </div>
      </div>
    </div>
  );
}