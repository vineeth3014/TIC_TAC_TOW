
import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from './components/winning-combinations'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function deriveActivePlayers(gameTurn){
  let currentPlayer = 'X'
     
  if(gameTurn.length > 0 && gameTurn[0].player === 'X'){
        currentPlayer = 'O'
      }
      return currentPlayer
}

function App() {
  const [gameTurn,setGameTurns] = useState([])
  const [hasWinner,setHasWinner] = useState(false)
  // const[activePlayer, setActivePlayer]= useState('X')

  const activePlayer = deriveActivePlayers(gameTurn)
  let GameBoard = initialGameBoard

  for(const turn of gameTurn){
      const {square,player} = turn
      const {row , col} = square

      GameBoard[row][col] = player
  }

  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = GameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = GameBoard[combination[0].row][combination[0].column]
    const thirdSquareSymbol = GameBoard[combination[0].row][combination[0].column]

    if(firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol){
        winner = firstSquareSymbol
    }
  }


  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((curActivePlayer => curActivePlayer === 'X' ? 'O' : 'X' ))
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayers(prevTurns)

      // let currentPlayer = 'X'
      // if(prevTurns.length > 0 && prevTurns[0].player === 'X'){
      //   currentPlayer = 'O'
      // }
      const updatedTurns = [{square: {row: rowIndex,col: colIndex},player: currentPlayer },...prevTurns,]
      return updatedTurns
    })
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="player 1" symbol="X" isActive={activePlayer === 'X'}/>
          <Player initialName="player 2" symbol="O" isActive={activePlayer === 'O'}/>
        </ol>
        {winner && <p>YOU WON {winner}!</p>}
       <GameBoard onSelectSquare={handleSelectSquare}
       board={GameBoard}/>
      </div>
      <Log turns={gameTurn}/>
    </main>
  );
}

export default App;
