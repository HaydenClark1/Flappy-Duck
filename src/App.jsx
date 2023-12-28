import { useState } from 'react'
import './App.css'
import StartMenu from './components/StartMenu/StartMenu';
import Flight from './components/Flight/Flight';


function App (){
  const[mode, setMode] = useState('start');
  const startGame = () =>{
    setMode('flight');
  }
  const endGame =() => {
    setMode('defeat');
  }
  return (
  <div>
    {mode === 'start' && <StartMenu onStartGame={startGame}/>}
    {mode === 'flight' && <Flight/>}
    </div>
  )
}

export default App
