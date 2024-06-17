import React, { useState } from "react";
import './TicTacToe.css'
import CrossIcon from '../assets/images/tictactocross.png'
import RoundIcon from '../assets/images/tictactoeround.png'


const TicTacToe = () => {

    const [board , setBoard] = useState(Array(9).fill(""));
    const [count , setCount] = useState(0)
    const [lock , setLock] = useState(false)
    const [winnerMessage, setWinnerMessage] = useState("");


    const toggle = (index)  => {
        if (lock || board[index]){
            return 0;
        }

        const newBoard=[...board];
        newBoard[index] = count % 2 === 0 ? "x" : "o";
        setBoard(newBoard);
        setCount(count + 1);

        const winner = checkWinner(newBoard);
        if (winner){
            setLock(true)  //lock the game if we have a winner
            setWinnerMessage(`${winner.toUpperCase()} wins`);
        } else if (newBoard.every(cell => cell !== "")){
            setLock(true)
            setWinnerMessage("It's a Draw");
        }
    
    }


   const checkWinner = (newBoard) =>{
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let comb of winningCombinations){
        const [a,b,c] = comb
        if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]){
            return newBoard[a];
        }
    }
    return null;

    };



    const resetGame = () => {
        setBoard(Array(9).fill(""));
        setCount(0);
        setLock(false);
        setWinnerMessage("")
    };




    return (
        <div className="container">
            
            <h6 className="title">Tic Tac Toe Game</h6>

            {winnerMessage && <div className="winner-message">{winnerMessage}</div>}  
            <div className="board">
                {board.map((cell,index) => (
                    <div
                        key={index}
                        className="boxes"
                        onClick={() => toggle(index)}
                    >
                        {cell === "x" && <img src={CrossIcon} alt="X" />}
                        {cell === "o" && <img src={RoundIcon} alt="O" />}
                    </div>
                ))}

            </div>

            
            <button className="reset" onClick={resetGame}>Reset</button>

        </div>
    );
}

export default TicTacToe