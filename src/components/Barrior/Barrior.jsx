import BarriorPic from '../images/barrior.png'
import { useState, useEffect } from 'react';
import '../Barrior/Barrior.css';
function Barrior({onUpdateBarriors, speed}){
  const windowHeight = window.innerHeight ;
  const [barriors, setBarriorArray] = useState([]);
  //FOR BOTTOM BARRIORS
        
  useEffect(() => {
      const updatePositions = () => {
        setBarriorArray((prevArray) =>
          prevArray.map((barrior) => ({
            ...barrior,
            position: barrior.position + 1, // Increment the position
          }))
          .filter((barrior) => barrior.position*10 <= window.innerWidth)
          .filter((barrior) => barrior.bottom < windowHeight)
          
        );
        
      };
  
      const intervalID = setInterval(updatePositions, 50); // Adjust the interval for smoother animation
  
      return () => {
        clearInterval(intervalID);
      };
    }, []); // Run once when the component mounts
//FOR TOP BARRIORS
const [barriorsTop, setBarriorArrayTop] = useState([]);

    useEffect(() =>{
      const intervalID = setInterval(()=>{
        var randomHeight = Math.floor(Math.random() * windowHeight/2);
            setBarriorArrayTop((prevArray)=> [...prevArray,
                  {id: Date.now(),
                    increment: prevArray.length + 1,
                    position:0,
                      right:0,
                      top:0,
                      height: randomHeight,
                      width: 100,
                    },
                  ]);
            //BOTTOM
            setBarriorArray((prevArray)=> [...prevArray,
              {id: Date.now(),
                increment: prevArray.length + 1,
                position: 0,
                right: 0,
                bottom: 0,
                height: windowHeight - 175 - randomHeight,
                width: 100,
              }
            ]);
          },3000);
          return () =>{
              clearInterval(intervalID);
          };
      },[]);
      
      useEffect(() => {
          const updatePositions = () => {
            setBarriorArrayTop((prevArray) =>
              prevArray.map((barrior) => ({
                ...barrior,
                position: barrior.position + 1, // Increment the position
              }))
              .filter((barrior) => barrior.position*10 <= window.innerWidth)
            
            );
            
          };
      
          const intervalID = setInterval(updatePositions, 50); // Adjust the interval for smoother animation
      
          return () => {
            clearInterval(intervalID);
          };
        }, [speed])

        useEffect(() => {
          onUpdateBarriors(barriors, barriorsTop);
        },[barriors,barriorsTop]);
    return(
        <>

       {barriorsTop.map((barrior) =>(
        <img key = {barrior.id}
         className='barrior-top'
         src={BarriorPic}
         alt={`BarriorTop ${barrior.increment}`} 
         style={{
                right: `${barrior.position * 10}px`,
                top: `${barrior.top}px`,
                height: `${barrior.height}px`,
                width: `${barrior.width}px`,
                zIndex: 3,
              }}
         />
       ))}
      
      
       {barriors.map((barrior) =>(
        <img key = {barrior.id}
         className='barrior'
         src={BarriorPic}
         alt={`Barrior ${barrior.increment}`} 
         style={{
                right: `${barrior.position * 10}px`,
                bottom: `${barrior.bottom}px`,
                height: `${barrior.height}px`,
                width: `${barrior.width}px`,
                zIndex: 3,
              }}
         />
       ))}
      
        </>
    );
    }
export default Barrior;