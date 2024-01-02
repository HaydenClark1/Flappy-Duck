import Duck from '../images/duck.png';
import Duck2 from '../images/duck2.png';
import Duck3 from '../images/duck3.png';
import './Player.css';

import { useState, useEffect, useRef } from 'react';

function Player({ onAnimationChange, handleCollision, barriorsTop, barriorsBottom}) {
  const [animationIndex, setAnimationIndex] = useState(1);
  const ducks = [Duck, Duck2, Duck3];
  const [currentAnimation, setCurrentAnimation] = useState(ducks[0]);
  const [position, setPosition] = useState(20);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationIntervalRef = useRef(null);
  const [score, setScore] = useState(0);

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimationIndex((prevIndex) => (prevIndex % 3) + 1);

    const intervalID = setInterval(() => {  //Player going up
      setPosition((prevPosition) => prevPosition - 3);
    }, 16);

    animationIntervalRef.current = intervalID;

    setTimeout(() => {
      clearInterval(intervalID);
      setIsAnimating(false);
      animationIntervalRef.current = null;
    }, 400);
  };

  const detectKeyDown = (event) => {
    if (event.key === 'Enter') {
      startAnimation();
    }
  };

  useEffect(() => {
    const handleAnimationChange = () => {
      onAnimationChange(currentAnimation);
    };

    document.addEventListener('keydown', detectKeyDown);

    setCurrentAnimation(ducks[animationIndex - 1]);
    handleAnimationChange();

    const intervalID = setInterval(() => {
      setPosition((prevPosition) => prevPosition + 8); //Player going down

      const playerBoundingBox = {
        top: position,
        left: 110,
        bottom: position + 100,
      };

      for (const barrior of barriorsTop) {
        const barriorBoundingBoxTop = {
          top: barrior.top,
          right: (barrior.position * 10) + barrior.width,
          height: barrior.height,
          width: barrior.width,
          score: barrior.number,
        };

        if (
          playerBoundingBox.top + 50 < barriorBoundingBoxTop.height &&
          barriorBoundingBoxTop.right > window.innerWidth - playerBoundingBox.left
        ) {
          handleCollision();
        }
      }

      for (const barrior of barriorsBottom) {
        const barriorBoundingBoxBottom = {
          bottom: 0,
          right: (barrior.position * 10) + barrior.width,
          height: barrior.height,
          width: barrior.width,
          score: barrior.number,
        };

        if (
          playerBoundingBox.bottom - 50 > Math.abs(barriorBoundingBoxBottom.height - window.innerHeight) &&
          barriorBoundingBoxBottom.right > window.innerWidth - playerBoundingBox.left
        ) {
          handleCollision();
        }
      }
      
    }, 1000 / 30);

    return () => {
      document.removeEventListener('keydown', detectKeyDown);
      clearInterval(intervalID);
    };
  }, [position, barriorsBottom, barriorsTop, handleCollision, ducks, animationIndex, currentAnimation, onAnimationChange, isAnimating]);

  return (
    <img
      src={ducks[animationIndex - 1]}
      className='player'
      alt="duck"
      style={{
        top: `${position}px`,
        left: '10px',
        zIndex: 2,
      }}
    />
  );
}

export default Player;
