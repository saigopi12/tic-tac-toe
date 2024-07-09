import React, { useState } from 'react';
import './App.css'; // Corrected import path for CSS file

const BOARD_SIZE = 3; // 3x3 board

const App = () => {
  const [board, setBoard] = useState(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  // Function to handle click on a square
  const handleClick = (index) => {
    if (board[index] === null && !winner) { // Square is empty and game is not over
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      // Check for winner
      if (checkForWinner(newBoard, currentPlayer)) {
        setWinner(currentPlayer);
      } else {
        // Switch player
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      }
    }
  };

  // Function to check for a winner
  const checkForWinner = (board, player) => {
    // Winning conditions (rows, columns, diagonals)
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winConditions.some((condition) =>
      condition.every((index) => board[index] === player)
    );
  };

  // Function to check if the board is full (tie condition)
  const checkTie = () => {
    return board.every((square) => square !== null);
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  // Render the game board
  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((value, index) => (
          <div key={index} className="square" onClick={() => handleClick(index)}>
            {value}
          </div>
        ))}
      </div>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`}
        {winner || checkTie() ? (
          <button onClick={resetGame}>Reset Game</button>
        ) : null}
      </div>
    </div>
  );
};

export default App;
