import React, { useState } from "react";
import Square from "./Square";
import "./Board.css";

const Board = () => { 
  const [state, setState] = useState(Array(9).fill(null));   // create column and row state and assign value for grid
  const [isXTurn, setIsXTurn] = useState(true); // State to check either X turn or O
  const [playerTurn, setPlayerturn] = useState("X"); // State to print which player turn 
  const [clickedSquare, setClickedSquare] = useState(Array(9).fill(false)); // State to check which box is visited or clickable

  // Change Player turn
  const changePlayer = () => {
    if (playerTurn === "X") {
      setPlayerturn("O");
    } else {
      setPlayerturn("X");
    }
  };

  let player = null;

  // Check Winner
  const checkWinner = () => {

    // No of Possible combination to for winner
    const winnerLogic = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (state[a] !== null && state[a] === state[b] && state[a] === state[c]) {
        player = state[a];
        return true;
      }
    }
    return false;
  };

  const isWinner = checkWinner();

  const resetValue = () => {
    setState(Array(9).fill(null));
    setClickedSquare(Array(9).fill(false));
  };

  //Click Handler when Clicked on the indivisual box
  const handleClick = (index) => {
    if (!clickedSquare[index] && !isWinner) { //Check Condition if not visited and not winner
      const copyState = [...state];
      copyState[index] = isXTurn ? "X" : "O";

      setState(copyState);
      setIsXTurn(!isXTurn);
      changePlayer();

      const updatedClickedSquare = [...clickedSquare];
      updatedClickedSquare[index] = true;
      setClickedSquare(updatedClickedSquare);
    }
  };

  return (
    <div className="container">
      <h2>Tic Tac Toe Game</h2>
      {isWinner ? (
        <h1>Player "{player}" is the winner!</h1>
      ) : (
        <div>
          <a> Player {playerTurn} turn.</a>
          <div className="board-container">
            <div className="board-row">
              <Square onClick={() => handleClick(0)} value={state[0]} />
              <Square onClick={() => handleClick(1)} value={state[1]} />
              <Square onClick={() => handleClick(2)} value={state[2]} />
            </div>
            <div className="board-row">
              <Square onClick={() => handleClick(3)} value={state[3]} />
              <Square onClick={() => handleClick(4)} value={state[4]} />
              <Square onClick={() => handleClick(5)} value={state[5]} />
            </div>
            <div className="board-row">
              <Square onClick={() => handleClick(6)} value={state[6]} />
              <Square onClick={() => handleClick(7)} value={state[7]} />
              <Square onClick={() => handleClick(8)} value={state[8]} />
            </div>
          </div>
        </div>
      )}
      <button onClick={() => resetValue()}>Reset</button>
    </div>
  );
};

export default Board;
