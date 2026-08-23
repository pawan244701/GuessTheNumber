import { useState } from "react";
import './App.css';

export const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [targetNum, setTargetNum] = useState(null);
  const [attempts, setAttempts] = useState(5);
  const [isWon, setIsWon] = useState(false);

  const isGameOver = attempts === 0 || isWon;

  const handlePlay = () => {
    const randomNum = Math.floor(Math.random() * 90) + 10;
    console.log(randomNum);
    setTargetNum(randomNum);
    setIsPlaying(true);
    setAttempts(5);
    setIsWon(false);
    setUserGuess('');
    setMessage('🤔 Guess a 2 digit number!');
  };

  const handleCheck = (e) => {
    e.preventDefault();
    const guessedNum = parseInt(userGuess, 10);

    if (isNaN(guessedNum)) {
      setMessage('❌ Please enter a valid Number! ❌');
      return;
    }

    const updatedAttempts = attempts - 1;
    setAttempts(updatedAttempts);

    if (guessedNum === targetNum) {
      setIsWon(true);
      setMessage('🥳 You win! 🎉');
    } else if (updatedAttempts === 0) {
      setMessage('😔 Opps! You lose! No worries try again');
    } else if (guessedNum < targetNum) {
      setMessage('Too low! Try a higher number');
    } else {
      setMessage('Too high! Try a lower number');
    }
  };

  return (
    <div className="main-div">
      {!isPlaying ? (
        <div className="play-div">
          <h1>Guess The Num</h1>
          <p>You'll get only 5 attempts to Guess</p>
          <button onClick={handlePlay}>Play</button>
        </div>
      ) : (
        <div className="second-div">
          <p>{message}</p>
          {isGameOver ? (
            <button onClick={handlePlay}>Play Again</button>
          ) : (
            <>
              <h3>Attempts left: <strong>{attempts}</strong></h3>
              <form className="input-form" onSubmit={handleCheck}>
                <input
                  type="number"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  placeholder="Enter 2 digit numbers"
                />
                <button type="submit">Check</button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  );
};