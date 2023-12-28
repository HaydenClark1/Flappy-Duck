
function StartMenu( {onStartGame}){
    return(
        <>
        <div className="flappy-duck">Flappy Duck</div>
        <button className="start-button" onClick={onStartGame}>Start Game</button>
        </>
    )
}
export default StartMenu;