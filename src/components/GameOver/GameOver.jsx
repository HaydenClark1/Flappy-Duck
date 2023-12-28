import { useState } from "react";
import './GameOver.css'
function GameOver({score, highscore, onRestart}){


    return(
        <>
            <h1 className="game-over">Game Over</h1>
            <h2 className="score">Your Score: {score}</h2>
            <h2 className="high-score">HighScore: {highscore}</h2>
            <button className = "restart-button"
            id="restart-button"
            onClick={onRestart}
            >Restart</button>
        </>
        

    )
}
export default GameOver;