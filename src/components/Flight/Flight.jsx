import { useEffect, useState } from "react";
import Player from "../player/player";
import Barrior from "../Barrior/Barrior";
import '../Flight/Flight.css';
import GameOver from "../GameOver/GameOver";

function Flight() {
  const [playerStatus, setStatus] = useState('alive');
  const [barriorsTop, setBarriorsTop] = useState([]);
  const [barriorsBottom, setBarriorsBottom] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighScore] = useState(0);
  const[speed, setSpeed] = useState(1);

  const handleAnimationChange = () => {
    // handle animation change logic
  }

  const handleBarriors = (barriorBottom, barriorTop) => {
    setBarriorsTop(barriorTop);
    setBarriorsBottom(barriorBottom);
  }

  const handlePlayerCollision = () => {
    if(score > highscore){
      setHighScore(score);
    }
    setStatus('dead');
  }
 
  const handleRestart = ()=>{
    setStatus('alive');
    setSpeed(1);
    setScore(0);
  }
  useEffect(()=>{
    const intervalID = setInterval(() => {
      if(playerStatus === 'dead'){
        return;
      }
      setScore((prevScore) => prevScore +1);
      if(score%200 === 0 && score >= 200){
        setSpeed((prevSpeed)=> prevSpeed*2);
      }
  },100);
  
    return ()=>{
      clearInterval(intervalID);
    }
    
  },[playerStatus, score, setSpeed])

  const showScore = (score) =>{
    if(playerStatus === 'alive'){
      return score;
    }
    return '';
  }


  return (
    <>
      <div className="playable-area">
        <h1 className="score">{showScore(score)}</h1>
        {playerStatus === 'alive' && <Player 
          onAnimationChange={handleAnimationChange}
          handleCollision={handlePlayerCollision}
          barriorsTop={barriorsTop} 
          barriorsBottom={barriorsBottom} 
          //handleScore={handleScore}
          />}
        {playerStatus === 'alive' && <Barrior 
        onUpdateBarriors={handleBarriors}
        />} 
        {playerStatus === 'dead' && <GameOver score={score} highscore={highscore} onRestart={handleRestart}/>}
      </div>
    </>
  );
}

export default Flight;
