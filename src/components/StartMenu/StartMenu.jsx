
function StartMenu( {onStartGame}){
    return(
        <>
        <div className="flappy-duck">Flappy Duck</div>
        <button className="start-button" onClick={onStartGame}>Start Game</button>
        <h1>Press Enter to Fly</h1>
        </>
    )
}
export default StartMenu;